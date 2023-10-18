import type { populate as esmPopulate, populateFromGlob as esmPopulateFromGlob } from './index.js';
export declare const defaultHtmlSchema: {
    type: string;
    content: string;
    path: string;
};
export interface OramaPluginParseDoc {
    populateFromGlob: typeof esmPopulateFromGlob;
    populate: typeof esmPopulate;
    defaultHtmlSchema: typeof defaultHtmlSchema;
}
export type RequireCallback = (err: Error | undefined, orama?: OramaPluginParseDoc) => void;
export declare function populateFromGlob(...args: Parameters<typeof esmPopulateFromGlob>): ReturnType<typeof esmPopulateFromGlob>;
export declare function populate(...args: Parameters<typeof esmPopulate>): ReturnType<typeof esmPopulate>;
export declare function requireOramaPluginParseDoc(callback: RequireCallback): void;
