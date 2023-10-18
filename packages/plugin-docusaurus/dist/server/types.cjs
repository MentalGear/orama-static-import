"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.INDEX_FILE = exports.PLUGIN_NAME = void 0;
exports.PLUGIN_NAME = '@orama/plugin-docusaurus';
exports.INDEX_FILE = 'orama-search-index-@VERSION@.json.gz';
exports.schema = {
    pageRoute: 'string',
    sectionTitle: 'string',
    sectionContent: 'string',
    type: 'string',
    version: 'string'
};
