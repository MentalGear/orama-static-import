"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    defaultHtmlSchema: ()=>defaultHtmlSchema,
    populateFromGlob: ()=>populateFromGlob,
    populate: ()=>populate,
    requireOramaPluginParseDoc: ()=>requireOramaPluginParseDoc
});
const defaultHtmlSchema = {
    type: 'string',
    content: 'string',
    path: 'string'
};
let _esmPopulateFromGlob;
let _esmPopulate;
async function populateFromGlob(...args) {
    if (!_esmPopulateFromGlob) {
        const imported = await import('./index.js');
        _esmPopulateFromGlob = imported.populateFromGlob;
    }
    return _esmPopulateFromGlob(...args);
}
async function populate(...args) {
    if (!_esmPopulate) {
        const imported = await import('./index.js');
        _esmPopulate = imported.populate;
    }
    return _esmPopulate(...args);
}
function requireOramaPluginParseDoc(callback) {
    import('./index.js').then((loaded)=>setTimeout(()=>callback(undefined, loaded), 1)).catch((error)=>setTimeout(()=>callback(error), 1));
}

//# sourceMappingURL=commonjs.js.map