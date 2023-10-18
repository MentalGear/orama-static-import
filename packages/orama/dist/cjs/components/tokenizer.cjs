"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createTokenizer", {
    enumerable: true,
    get: ()=>createTokenizer
});
const _indexJs = require("../../components/tokenizer/index.js");
let _esmCreateTokenizer;
_esmCreateTokenizer = _indexJs.createTokenizer;
async function createTokenizer(...args) {
    if (!_esmCreateTokenizer) {
        const imported = await import('../../components/tokenizer/index.js');
        _esmCreateTokenizer = imported.createTokenizer;
    }
    return _esmCreateTokenizer(...args);
}

//# sourceMappingURL=tokenizer.js.map