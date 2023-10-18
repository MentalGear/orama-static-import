import { create as createOramaDB, insert as insertIntoOramaDB, save as saveOramaDB } from '@orama/orama';
import { compile } from 'html-to-text';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
const isWindows = process.platform === 'win32';
const joinPath = (isWindows ? path.win32 : path).join;
export const defaultSchema = {
    path: 'string',
    title: 'string',
    h1: 'string',
    content: 'string'
};
const PKG_NAME = '@orama/plugin-astro';
const titleConverter = compile({
    baseElements: {
        selectors: [
            'title'
        ]
    }
});
const h1Converter = compile({
    baseElements: {
        selectors: [
            'h1'
        ]
    }
});
async function prepareOramaDb(dbConfig, pages, routes) {
    var _dbConfig_contentSelectors, _routes__distURL, _routes__distURL_pathname;
    const contentConverter = compile({
        baseElements: {
            selectors: ((_dbConfig_contentSelectors = dbConfig.contentSelectors) === null || _dbConfig_contentSelectors === void 0 ? void 0 : _dbConfig_contentSelectors.length) ? dbConfig.contentSelectors : [
                'body'
            ]
        }
    });
    // All routes are in the same folder, we can use the first one to get the basePath
    const baseUrl = (_routes__distURL = routes[0].distURL) === null || _routes__distURL === void 0 ? void 0 : (_routes__distURL_pathname = _routes__distURL.pathname) === null || _routes__distURL_pathname === void 0 ? void 0 : _routes__distURL_pathname.replace(/\/$/, '').split('dist/').at(0);
    const basePath = `${baseUrl}dist/`.slice(isWindows ? 1 : 0);
    const pathsToBeIndexed = pages.filter(({ pathname  })=>dbConfig.pathMatcher.test(pathname)).map(({ pathname  })=>{
        var _routes_find, _routes_find_distURL, _routes_find_distURL_pathname;
        // Some pages like 404 are generated as 404.html while others are usually pageName/index.html
        const matchingPathname = (_routes_find = routes.find((r)=>{
            var _r_distURL;
            return (_r_distURL = r.distURL) === null || _r_distURL === void 0 ? void 0 : _r_distURL.pathname.endsWith(pathname.replace(/\/$/, '') + '.html');
        })) === null || _routes_find === void 0 ? void 0 : (_routes_find_distURL = _routes_find.distURL) === null || _routes_find_distURL === void 0 ? void 0 : (_routes_find_distURL_pathname = _routes_find_distURL.pathname) === null || _routes_find_distURL_pathname === void 0 ? void 0 : _routes_find_distURL_pathname.slice(isWindows ? 1 : 0);
        return {
            pathname,
            generatedFilePath: matchingPathname ?? `${basePath}${pathname.replace(/\/+$/, '')}/index.html`
        };
    }).filter(({ generatedFilePath  })=>!!generatedFilePath);
    const oramaDB = await createOramaDB({
        schema: defaultSchema,
        ...dbConfig.language ? {
            language: dbConfig.language
        } : undefined
    });
    for (const { pathname , generatedFilePath  } of pathsToBeIndexed){
        const htmlContent = readFileSync(generatedFilePath, {
            encoding: 'utf8'
        });
        const title = titleConverter(htmlContent) ?? '';
        const h1 = h1Converter(htmlContent) ?? '';
        const content = contentConverter(htmlContent);
        await insertIntoOramaDB(oramaDB, {
            path: `/${pathname}`,
            title,
            h1,
            content
        }, dbConfig.language);
    }
    return oramaDB;
}
export function createPlugin(options) {
    let config;
    return {
        name: PKG_NAME,
        hooks: {
            'astro:config:done': function({ config: cfg  }) {
                config = cfg;
            },
            'astro:build:done': async function({ pages , routes  }) {
                const assetsDir = joinPath(config.outDir.pathname, 'assets').slice(isWindows ? 1 : 0);
                if (!existsSync(assetsDir)) {
                    mkdirSync(assetsDir);
                }
                for (const [dbName, dbConfig] of Object.entries(options)){
                    const namedDb = await prepareOramaDb(dbConfig, pages, routes);
                    writeFileSync(joinPath(assetsDir, `oramaDB_${dbName}.json`), JSON.stringify(await saveOramaDB(namedDb)), {
                        encoding: 'utf8'
                    });
                }
            }
        }
    };
}
export default createPlugin;

//# sourceMappingURL=index.js.map