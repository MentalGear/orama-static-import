import type { AnyOrama, SearchParams } from '@orama/orama';
import type { AstroIntegration } from 'astro';
export declare const defaultSchema: {
    readonly path: "string";
    readonly title: "string";
    readonly h1: "string";
    readonly content: "string";
};
export type PageIndexSchema = typeof defaultSchema;
export interface OramaOptions {
    language: string;
    /**
     * Controls whether generatedFilePath is filter
     * using case sensitive or case insensitive comparison
     * @default false
     *
     */
    caseSensitive?: boolean;
    pathMatcher: RegExp;
    contentSelectors?: string[];
    searchOptions?: Omit<SearchParams<AnyOrama, any>, 'term'> | undefined;
}
export declare function createPlugin(options: Record<string, OramaOptions>): AstroIntegration;
export default createPlugin;
