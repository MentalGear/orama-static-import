"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>docusaurusOramaPlugin
});
let _esmDocusaurusOramaPlugin;
// eslint-disable-next-line no-new-func, @typescript-eslint/no-implied-eval
const importDynamic = new Function('modulePath', 'return import(modulePath)');
async function docusaurusOramaPlugin(...args) {
    if (!_esmDocusaurusOramaPlugin) {
        const imported = await importDynamic('./index.js');
        _esmDocusaurusOramaPlugin = imported.default;
    }
    return _esmDocusaurusOramaPlugin(...args);
}

//# sourceMappingURL=commonjs.js.map