import type { AnyOrama } from '@orama/orama';
import type { afterInsert as esmAfterInsert, OramaWithHighlight, searchWithHighlight as esmSearchWithHighlight, saveWithHighlight as esmSaveWithHighlight, loadWithHighlight as esmLoadWithHighlight } from './index.js';
export interface OramaPluginMatchHighlight {
    afterInsert: typeof esmAfterInsert;
    searchWithHighlight: typeof esmSearchWithHighlight;
}
export type RequireCallback = (err: Error | undefined, orama?: OramaPluginMatchHighlight) => void;
export declare function afterInsert<T extends AnyOrama>(this: T | OramaWithHighlight<T>, ...args: Parameters<typeof esmAfterInsert>): ReturnType<typeof esmAfterInsert>;
export declare function searchWithHighlight(...args: Parameters<typeof esmSearchWithHighlight>): ReturnType<typeof esmSearchWithHighlight>;
export declare function saveWithHighlight(...args: Parameters<typeof esmSaveWithHighlight>): ReturnType<typeof esmSaveWithHighlight>;
export declare function loadWithHighlight(...args: Parameters<typeof esmLoadWithHighlight>): ReturnType<typeof esmLoadWithHighlight>;
export declare function requireOramaPluginMatchHighlight(callback: RequireCallback): void;
