import { create, insertMultiple, save } from '@orama/orama';
import { afterInsert as highlightAfterInsert } from '@orama/plugin-match-highlight';
import { defaultHtmlSchema, populate } from '@orama/plugin-parsedoc';
import * as githubSlugger from 'github-slugger';
import { cp, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { gzip as gzipCB } from 'node:zlib';
import { retrieveTranslationMessages } from './translationMessages.js';
import { INDEX_FILE, PLUGIN_NAME, schema } from './types.js';
const gzip = promisify(gzipCB);
function indexPath(outDir, version) {
    return resolve(outDir, INDEX_FILE.replace('@VERSION@', version));
}
export function transformFn(node, context) {
    let raw;
    switch(node.tag){
        case 'strong':
        case 'a':
        case 'time':
        case 'code':
        case 'span':
        case 'small':
        case 'b':
        case 'p':
        case 'ul':
            raw = `<p>${node.content}</p>`;
            break;
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
            var _node_properties;
            context.lastLink = ((_node_properties = node.properties) === null || _node_properties === void 0 ? void 0 : _node_properties.id) ?? githubSlugger.slug(node.content);
            break;
    }
    const transformed = {
        ...node,
        additionalProperties: {
            hash: context.lastLink
        }
    };
    if (raw) {
        transformed.raw = raw;
    }
    return transformed;
}
export function defaultToSectionSchema(node, pageRoute, sectionTitle, version) {
    const { content , type , properties  } = node;
    if (!sectionTitle) {
        sectionTitle = (pageRoute.split('/').pop() ?? '').replace(/(-)+/g, ' ').split(' ').map((word)=>word && `${word[0].toUpperCase()}${word.substring(1)}`).join(' ');
    }
    return {
        pageRoute,
        hash: (properties === null || properties === void 0 ? void 0 : properties.hash) ?? '',
        sectionTitle: pageRoute ? sectionTitle : 'Home',
        sectionContent: content,
        type,
        version
    };
}
function isIndexable(doc) {
    return !!doc.sectionContent && !!doc.sectionTitle && doc.type !== 'script' && !doc.pageRoute.startsWith('/blogs/tags/');
}
async function generateDocument(siteDir, { title , version , permalink , source  }) {
    // Parse the document
    const data = await readFile(source.replace('@site', siteDir));
    const fileType = source.split('.').at(-1);
    const db = await create({
        schema: defaultHtmlSchema
    });
    await populate(db, data, fileType, {
        transformFn
    });
    // Convert all the documents to a
    const sections = Object.values(db.data.docs.docs).map((node)=>{
        return defaultToSectionSchema(node, permalink.slice(1), title, version);
    }).filter(isIndexable);
    for (const section of sections){
        if (!section.pageRoute.startsWith('/')) {
            section.pageRoute = '/' + section.pageRoute;
        }
        if (section.hash) {
            section.pageRoute += `#${section.hash}`;
        }
    }
    return sections;
}
async function buildDevSearchData(siteDir, outDir, allContent, version) {
    var _allContent_docusaurusplugincontentdocs, _allContent_docusaurusplugincontentdocs_default, _allContent_docusaurusplugincontentdocs_default_loadedVersions, _allContent_docusaurusplugincontentblog, _allContent_docusaurusplugincontentblog_default, _allContent_docusaurusplugincontentblog_default_blogPosts, _allContent_docusaurusplugincontentpages;
    const loadedVersion = (_allContent_docusaurusplugincontentdocs = allContent['docusaurus-plugin-content-docs']) === null || _allContent_docusaurusplugincontentdocs === void 0 ? void 0 : (_allContent_docusaurusplugincontentdocs_default = _allContent_docusaurusplugincontentdocs.default) === null || _allContent_docusaurusplugincontentdocs_default === void 0 ? void 0 : (_allContent_docusaurusplugincontentdocs_default_loadedVersions = _allContent_docusaurusplugincontentdocs_default.loadedVersions) === null || _allContent_docusaurusplugincontentdocs_default_loadedVersions === void 0 ? void 0 : _allContent_docusaurusplugincontentdocs_default_loadedVersions.find((v)=>v.versionName === version);
    const docs = (loadedVersion === null || loadedVersion === void 0 ? void 0 : loadedVersion.docs) ?? [];
    const blogs = ((_allContent_docusaurusplugincontentblog = allContent['docusaurus-plugin-content-blog']) === null || _allContent_docusaurusplugincontentblog === void 0 ? void 0 : (_allContent_docusaurusplugincontentblog_default = _allContent_docusaurusplugincontentblog.default) === null || _allContent_docusaurusplugincontentblog_default === void 0 ? void 0 : (_allContent_docusaurusplugincontentblog_default_blogPosts = _allContent_docusaurusplugincontentblog_default.blogPosts) === null || _allContent_docusaurusplugincontentblog_default_blogPosts === void 0 ? void 0 : _allContent_docusaurusplugincontentblog_default_blogPosts.map(({ metadata  })=>metadata)) ?? [];
    const pages = ((_allContent_docusaurusplugincontentpages = allContent['docusaurus-plugin-content-pages']) === null || _allContent_docusaurusplugincontentpages === void 0 ? void 0 : _allContent_docusaurusplugincontentpages.default) ?? [];
    const generator = generateDocument.bind(null, siteDir);
    // Gather all pages we want to index
    const documents = [
        ...await Promise.all(docs.map(generator)),
        ...await Promise.all(blogs.map(generator)),
        ...await Promise.all(pages.map(generator))
    ].flat();
    // Create the Orama database and then serialize it
    const _db = await create({
        schema,
        components: {
            afterInsert: [
                highlightAfterInsert
            ]
        }
    });
    const db = _db;
    await insertMultiple(db, documents);
    const serialized = await save(db);
    serialized.positions = db.data.positions;
    await writeFile(indexPath(outDir, version), await gzip(JSON.stringify(serialized)));
}
function getThemePath() {
    return fileURLToPath(new URL('../client/theme', import.meta.url));
}
function docusaurusOramaPlugin(context, options) {
    let versions = [];
    return {
        name: PLUGIN_NAME,
        getThemePath,
        getPathsToWatch () {
            return [
                getThemePath()
            ];
        },
        getDefaultCodeTranslationMessages: async ()=>{
            return retrieveTranslationMessages(context);
        },
        getClientModules () {
            return [
                resolve(getThemePath(), 'SearchBar/style.css'),
                resolve(getThemePath(), 'SearchBarFooter/style.css')
            ];
        },
        configureWebpack () {
            return {
                resolve: {
                    alias: {
                        'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
                        'react/jsx-runtime': 'react/jsx-runtime.js'
                    }
                }
            };
        },
        async contentLoaded ({ actions , allContent  }) {
            var _ref, _allContent_docusaurusplugincontentdocs;
            const isDevelopment = process.env.NODE_ENV === 'development';
            const loadedVersions = (_ref = (_allContent_docusaurusplugincontentdocs = allContent['docusaurus-plugin-content-docs']) === null || _allContent_docusaurusplugincontentdocs === void 0 ? void 0 : _allContent_docusaurusplugincontentdocs.default) === null || _ref === void 0 ? void 0 : _ref.loadedVersions;
            versions = loadedVersions.map((v)=>v.versionName);
            // Build all versions
            await Promise.all(versions.map((version)=>buildDevSearchData(context.siteDir, context.generatedFilesDir, allContent, version)));
            for (const name of versions){
                await buildDevSearchData(context.siteDir, context.generatedFilesDir, allContent, name);
            }
            if (isDevelopment) {
                actions.setGlobalData({
                    searchData: Object.fromEntries(await Promise.all(versions.map(async (version)=>{
                        return [
                            version,
                            await readFile(indexPath(context.generatedFilesDir, version))
                        ];
                    })))
                });
            } else {
                actions.setGlobalData({
                    searchData: {}
                });
            }
        },
        async postBuild ({ outDir  }) {
            await Promise.all(versions.map(async (version)=>{
                return cp(indexPath(context.generatedFilesDir, version), indexPath(outDir, version));
            }));
        }
    };
}
export default docusaurusOramaPlugin;

//# sourceMappingURL=index.js.map