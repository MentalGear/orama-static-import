import { insertMultiple } from '@orama/orama';
import glob from 'glob';
import { fromHtml } from 'hast-util-from-html';
import { fromString } from 'hast-util-from-string';
import { toHtml } from 'hast-util-to-html';
import { toString } from 'hast-util-to-string';
import { readFile } from 'node:fs/promises';
import { promisify } from 'node:util';
import { rehype } from 'rehype';
import rehypeDocument from 'rehype-document';
import rehypePresetMinify from 'rehype-preset-minify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
export const defaultHtmlSchema = {
    type: 'string',
    content: 'string',
    path: 'string'
};
const asyncGlob = promisify(glob);
export async function populateFromGlob(db, pattern, options) {
    const files = await asyncGlob(pattern);
    await Promise.all(files.map(async (filename)=>populateFromFile(db, filename, options)));
}
async function populateFromFile(db, filename, options) {
    const data = await readFile(filename);
    const fileType = filename.slice(filename.lastIndexOf('.') + 1);
    return populate(db, data, fileType, {
        ...options,
        basePath: `${filename}/`
    });
}
export const parseFile = async (data, fileType, options)=>{
    const records = [];
    switch(fileType){
        case 'md':
            // eslint-disable-next-line no-case-declarations
            const tree = unified().use(remarkParse).parse(data);
            await unified().use(remarkRehype).use(rehypeDocument).use(rehypePresetMinify).use(rehypeOrama, records, options).run(tree);
            break;
        case 'html':
            await rehype().use(rehypePresetMinify).use(rehypeOrama, records, options).process(data);
            break;
        /* c8 ignore start */ default:
            return fileType;
    }
    return records;
};
export async function populate(db, data, fileType, options) {
    return insertMultiple(db, await parseFile(data, fileType, options));
}
function rehypeOrama(records, options) {
    if (!options) {
        options = {};
    }
    return (tree)=>{
        tree.children.forEach((child, i)=>{
            visitChildren(child, tree, `${(options === null || options === void 0 /* c8 ignore next */  ? void 0 : options.basePath) ?? ''}root[${i}]`, records, options, structuredClone((options === null || options === void 0 ? void 0 : options.context) ?? {}));
        });
    };
}
function visitChildren(node, parent, path, records, options, context) {
    if (node.type === 'text') {
        addRecords(node.value, parent.tagName, path, parent.properties, records, options.mergeStrategy ?? 'merge');
        return;
    }
    if (!('tagName' in node)) return;
    const transformedNode = typeof (options === null || options === void 0 ? void 0 : options.transformFn) === 'function' ? applyTransform(node, options.transformFn, context) : node;
    transformedNode.children.forEach((child, i)=>{
        visitChildren(child, transformedNode, `${path}.${transformedNode.tagName}[${i}]`, records, options, context);
    });
}
function applyTransform(node, transformFn, context) {
    const preparedNode = prepareNode(node);
    const transformedNode = transformFn(preparedNode, context);
    return applyChanges(node, transformedNode);
}
function prepareNode(node) {
    const tag = node.tagName;
    const content = toString(node);
    const raw = toHtml(node);
    const properties = node.properties;
    return {
        tag,
        content,
        raw,
        properties
    };
}
function applyChanges(node, transformedNode) {
    let changed = node;
    if (toHtml(node) !== transformedNode.raw) {
        changed = fromHtml(transformedNode.raw, {
            fragment: true
        }).children[0];
    } else {
        node.tagName = transformedNode.tag;
        if (toString(node) !== transformedNode.content) {
            changed = fromString(node, transformedNode.content);
        }
    }
    changed.properties = {
        ...changed.properties,
        ...transformedNode.additionalProperties
    };
    return changed;
}
function addRecords(content, type, path, properties, records, mergeStrategy) {
    const parentPath = path.substring(0, path.lastIndexOf('.'));
    const newRecord = {
        type,
        content,
        path: parentPath,
        properties
    };
    switch(mergeStrategy){
        case 'merge':
            if (!isRecordMergeable(parentPath, type, records)) {
                records.push(newRecord);
                return;
            }
            addContentToLastRecord(records, content, properties);
            return;
        case 'split':
            records.push(newRecord);
            return;
        case 'both':
            if (!isRecordMergeable(parentPath, type, records)) {
                records.push(newRecord, {
                    ...newRecord
                });
                return;
            }
            records.splice(records.length - 1, 0, newRecord);
            addContentToLastRecord(records, content, properties);
    }
}
function isRecordMergeable(path, tag, records) {
    if (!records.length) return false;
    const lastRecord = records[records.length - 1];
    const parentPath = pathWithoutLastIndex(path);
    const lastPath = pathWithoutLastIndex(lastRecord.path);
    return parentPath === lastPath && tag === lastRecord.type;
}
function pathWithoutLastIndex(path) {
    const lastBracket = path.lastIndexOf('[');
    return path.slice(0, lastBracket);
}
function addContentToLastRecord(records, content, properties) {
    const lastRecord = records[records.length - 1];
    lastRecord.content += ` ${content}`;
    lastRecord.properties = {
        ...properties,
        ...lastRecord.properties
    };
}

//# sourceMappingURL=index.js.map