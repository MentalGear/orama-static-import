// import type { create as esmCreate } from '../methods/create.js'
// import type { count as esmCount, getByID as esmGetByID } from '../methods/docs.js'
// import type { insert as esmInsert, insertMultiple as esminsertMultiple } from '../methods/insert.js'
// import type { remove as esmRemove, removeMultiple as esmRemoveMultiple } from '../methods/remove.js'
// import type { search as esmSearch } from '../methods/search.js'
// import type { searchVector as esmSearchVector } from '../methods/search-vector.js'
// import type { load as esmLoad, save as esmSave } from '../methods/serialization.js'
// import type { update as esmUpdate, updateMultiple as esmUpdateMultiple } from '../methods/update.js'
// let _esmCount: typeof esmCount
// let _esmCreate: typeof esmCreate
// let _esmGetByID: typeof esmGetByID
// let _esmInsert: typeof esmInsert
// let _esmInsertMultiple: typeof esminsertMultiple
// let _esmLoad: typeof esmLoad
// let _esmRemove: typeof esmRemove
// let _esmRemoveMultiple: typeof esmRemoveMultiple
// let _esmSave: typeof esmSave
// let _esmSearch: typeof esmSearch
// let _esmUpdate: typeof esmUpdate
// let _esmUpdateMultiple: typeof esmUpdateMultiple
// let _esmSearchVector: typeof esmSearchVector
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
    count: ()=>count,
    create: ()=>create,
    getByID: ()=>getByID,
    insert: ()=>insert,
    insertMultiple: ()=>insertMultiple,
    load: ()=>load,
    remove: ()=>remove,
    removeMultiple: ()=>removeMultiple,
    save: ()=>save,
    search: ()=>search,
    update: ()=>update,
    updateMultiple: ()=>updateMultiple,
    searchVector: ()=>searchVector,
    components: ()=>_defaultsCjs,
    internals: ()=>_internalsCjs
});
const _createJs = require("../methods/create.js");
const _docsJs = require("../methods/docs.js");
const _insertJs = require("../methods/insert.js");
const _removeJs = require("../methods/remove.js");
const _searchJs = require("../methods/search.js");
const _searchVectorJs = require("../methods/search-vector.js");
const _serializationJs = require("../methods/serialization.js");
const _updateJs = require("../methods/update.js");
const _defaultsCjs = /*#__PURE__*/ _interopRequireWildcard(require("./components/defaults.cjs"));
const _internalsCjs = /*#__PURE__*/ _interopRequireWildcard(require("./internals.cjs"));
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
let _esmCount = _docsJs.count;
let _esmCreate = _createJs.create;
let _esmGetByID = _docsJs.getByID;
let _esmInsert = _insertJs.insert;
let _esmInsertMultiple = _insertJs.insertMultiple;
let _esmLoad = _serializationJs.load;
let _esmRemove = _removeJs.remove;
let _esmRemoveMultiple = _removeJs.removeMultiple;
let _esmSave = _serializationJs.save;
let _esmSearch = _searchJs.search;
let _esmUpdate = _updateJs.update;
let _esmUpdateMultiple = _updateJs.updateMultiple;
let _esmSearchVector = _searchVectorJs.searchVector;
async function count(...args) {
    if (!_esmCount) {
        const imported = await import('../methods/docs.js');
        _esmCount = imported.count;
    }
    return _esmCount(...args);
}
async function create(...args) {
    if (!_esmCreate) {
        const imported = await import('../methods/create.js');
        _esmCreate = imported.create;
    }
    return _esmCreate(...args);
}
async function getByID(...args) {
    if (!_esmGetByID) {
        const imported = await import('../methods/docs.js');
        _esmGetByID = imported.getByID;
    }
    return _esmGetByID(...args);
}
async function insert(...args) {
    if (!_esmInsert) {
        const imported = await import('../methods/insert.js');
        _esmInsert = imported.insert;
    }
    return _esmInsert(...args);
}
async function insertMultiple(...args) {
    if (!_esmInsertMultiple) {
        const imported = await import('../methods/insert.js');
        _esmInsertMultiple = imported.insertMultiple;
    }
    return _esmInsertMultiple(...args);
}
async function load(...args) {
    if (!_esmLoad) {
        const imported = await import('../methods/serialization.js');
        _esmLoad = imported.load;
    }
    return _esmLoad(...args);
}
async function remove(...args) {
    if (!_esmRemove) {
        const imported = await import('../methods/remove.js');
        _esmRemove = imported.remove;
    }
    return _esmRemove(...args);
}
async function removeMultiple(...args) {
    if (!_esmRemoveMultiple) {
        const imported = await import('../methods/remove.js');
        _esmRemoveMultiple = imported.removeMultiple;
    }
    return _esmRemoveMultiple(...args);
}
async function save(...args) {
    if (!_esmSave) {
        const imported = await import('../methods/serialization.js');
        _esmSave = imported.save;
    }
    return _esmSave(...args);
}
async function search(...args) {
    if (!_esmSearch) {
        const imported = await import('../methods/search.js');
        _esmSearch = imported.search;
    }
    return _esmSearch(...args);
}
async function update(...args) {
    if (!_esmUpdate) {
        const imported = await import('../methods/update.js');
        _esmUpdate = imported.update;
    }
    return _esmUpdate(...args);
}
async function updateMultiple(...args) {
    if (!_esmUpdateMultiple) {
        const imported = await import('../methods/update.js');
        _esmUpdateMultiple = imported.updateMultiple;
    }
    return _esmUpdateMultiple(...args);
}
async function searchVector(...args) {
    if (!_esmSearchVector) {
        const imported = await import('../methods/search-vector.js');
        _esmSearchVector = imported.searchVector;
    }
    return _esmSearchVector(...args);
}

//# sourceMappingURL=index.js.map