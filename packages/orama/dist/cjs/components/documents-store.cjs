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
    create: ()=>create,
    get: ()=>get,
    getMultiple: ()=>getMultiple,
    store: ()=>store,
    remove: ()=>remove,
    count: ()=>count,
    load: ()=>load,
    save: ()=>save,
    createDocumentsStore: ()=>createDocumentsStore
});
const _documentsStoreJs = require("../../components/documents-store.js");
async function create(...args) {
    // if (!_esmCreate) {
    //   const imported = await import('../../components/documents-store.js')
    //   _esmCreate = imported.create
    // }
    return (0, _documentsStoreJs.create)(...args);
}
async function get(...args) {
    // if (!_esmGet) {
    //   const imported = await import('../../components/documents-store.js')
    //   _esmGet = imported.get
    // }
    return (0, _documentsStoreJs.get)(...args);
}
async function getMultiple(...args) {
    // if (!_esmGetMultiple) {
    //   const imported = await import('../../components/documents-store.js')
    //   _esmGetMultiple = imported.getMultiple
    // }
    return (0, _documentsStoreJs.getMultiple)(...args);
}
async function store(...args) {
    // if (!_esmStore) {
    //   const imported = await import('../../components/documents-store.js')
    //   _esmStore = imported.store
    // }
    return (0, _documentsStoreJs.store)(...args);
}
async function remove(...args) {
    // if (!_esmRemove) {
    //   const imported = await import('../../components/documents-store.js')
    //   _esmRemove = imported.remove
    // }
    return (0, _documentsStoreJs.remove)(...args);
}
async function count(...args) {
    // if (!_esmCount) {
    //   const imported = await import('../../components/documents-store.js')
    //   _esmCount = imported.count
    // }
    return (0, _documentsStoreJs.count)(...args);
}
async function load(...args) {
    // if (!_esmLoad) {
    //   const imported = await import('../../components/documents-store.js')
    //   _esmLoad = imported.load
    // }
    return (0, _documentsStoreJs.load)(...args);
}
async function save(...args) {
    // if (!_esmSave) {
    //   const imported = await import('../../components/documents-store.js')
    //   _esmSave = imported.save
    // }
    return (0, _documentsStoreJs.save)(...args);
}
async function createDocumentsStore(...args) {
    // if (!_esmCreateDocumentsStore) {
    //   const imported = await import('../../components/documents-store.js')
    //   _esmCreateDocumentsStore = imported.createDocumentsStore
    // }
    return (0, _documentsStoreJs.createDocumentsStore)(...args);
}

//# sourceMappingURL=documents-store.js.map