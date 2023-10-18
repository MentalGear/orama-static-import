import type { Orama } from '@orama/orama';
import type { SearchResultWithHighlight } from '@orama/plugin-match-highlight';
export type NextraOrama = Orama<typeof defaultSchema>;
type HighlightedHits = SearchResultWithHighlight<NextraOrama>['hits'];
export declare function groupDocumentsBy(arr: HighlightedHits, key: string): {};
declare const defaultSchema: {
    readonly id: "string";
    readonly title: "string";
    readonly url: "string";
    readonly content: "string";
};
export declare function createOramaIndex(basePath: any, locale: any): Promise<NextraOrama>;
export {};
