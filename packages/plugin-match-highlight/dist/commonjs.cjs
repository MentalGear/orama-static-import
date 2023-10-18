// @ts-expect-error Ignore broken resolution - This errors when using tsconfig.cjs.json
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
    afterInsert: ()=>afterInsert,
    searchWithHighlight: ()=>searchWithHighlight,
    saveWithHighlight: ()=>saveWithHighlight,
    loadWithHighlight: ()=>loadWithHighlight,
    requireOramaPluginMatchHighlight: ()=>requireOramaPluginMatchHighlight
});
let _esmAfterInsert;
let _esmSearchWithHighlight;
let _esmSaveWithHighlight;
let _esmLoadWithHighlight;
async function afterInsert(...args) {
    if (!_esmAfterInsert) {
        const imported = await import('./index.js');
        _esmAfterInsert = imported.afterInsert;
    }
    return _esmAfterInsert.apply(this, args);
}
async function searchWithHighlight(...args) {
    if (!_esmSearchWithHighlight) {
        const imported = await import('./index.js');
        _esmSearchWithHighlight = imported.searchWithHighlight;
    }
    return _esmSearchWithHighlight(...args);
}
async function saveWithHighlight(...args) {
    if (!_esmSaveWithHighlight) {
        const imported = await import('./index.js');
        _esmSaveWithHighlight = imported.saveWithHighlight;
    }
    return _esmSaveWithHighlight(...args);
}
async function loadWithHighlight(...args) {
    if (!_esmLoadWithHighlight) {
        const imported = await import('./index.js');
        _esmLoadWithHighlight = imported.loadWithHighlight;
    }
    return _esmLoadWithHighlight(...args);
}
function requireOramaPluginMatchHighlight(callback) {
    import('./index.js').then((loaded)=>setTimeout(()=>callback(undefined, loaded), 1)).catch((error)=>setTimeout(()=>callback(error), 1));
}

//# sourceMappingURL=commonjs.js.map