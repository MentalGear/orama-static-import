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
    getDefaultFileName: ()=>getDefaultFileName,
    persistToFile: ()=>persistToFile,
    restoreFromFile: ()=>restoreFromFile
});
const _serverJs = require("./server.js");
let _esmRestoreFromFile;
let _esmPersistToFile;
let _esmGetDefaultFileName;
_esmRestoreFromFile = _serverJs.restoreFromFile;
_esmPersistToFile = _serverJs.persistToFile;
_esmGetDefaultFileName = _serverJs.getDefaultFileName;
async function getDefaultFileName(...args) {
    if (!_esmGetDefaultFileName) {
        const imported = await import('./server.js');
        _esmGetDefaultFileName = imported.getDefaultFileName;
    }
    return _esmGetDefaultFileName(...args);
}
async function persistToFile(...args) {
    if (!_esmPersistToFile) {
        const imported = await import('./server.js');
        _esmPersistToFile = imported.persistToFile;
    }
    return _esmPersistToFile(...args);
}
async function restoreFromFile(...args) {
    if (!_esmRestoreFromFile) {
        const imported = await import('./server.js');
        _esmRestoreFromFile = imported.restoreFromFile;
    }
    return _esmRestoreFromFile(...args);
}

//# sourceMappingURL=server-commonjs.js.map