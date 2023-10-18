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
    formatElapsedTime: ()=>formatElapsedTime,
    getDocumentIndexId: ()=>getDocumentIndexId,
    getDocumentProperties: ()=>getDocumentProperties,
    validateSchema: ()=>validateSchema
});
const _defaultsJs = require("../../components/defaults.js");
async function formatElapsedTime(...args) {
    // if (!_esmFormatElapsedTime) {
    //   const imported = await import('../../components/defaults.js')
    //   _esmFormatElapsedTime = imported.formatElapsedTime
    // }
    return (0, _defaultsJs.formatElapsedTime)(...args);
}
async function getDocumentIndexId(...args) {
    // if (!_esmGetDocumentIndexId) {
    //   const imported = await import('../../components/defaults.js')
    //   _esmGetDocumentIndexId = imported.getDocumentIndexId
    // }
    return (0, _defaultsJs.getDocumentIndexId)(...args);
}
async function getDocumentProperties(...args) {
    // if (!_esmGetDocumentProperties) {
    //   const imported = await import('../../components/defaults.js')
    //   _esmGetDocumentProperties = imported.getDocumentProperties
    // }
    return (0, _defaultsJs.getDocumentProperties)(...args);
}
async function validateSchema(...args) {
    // if (!_esmValidateSchema) {
    //   const imported = await import('../../components/defaults.js')
    //   _esmValidateSchema = imported.validateSchema
    // }
    return (0, _defaultsJs.validateSchema)(...args);
}

//# sourceMappingURL=defaults.js.map