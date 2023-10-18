import { Result } from '@orama/orama';
import type { Position } from '@orama/plugin-match-highlight';
import type { AnyDocument, RawData } from '@orama/orama';
interface DocsVersion {
    name: string;
    path: string;
}
export interface SectionSchema extends AnyDocument {
    type: string;
    sectionContent: string;
    pageRoute: string;
    sectionTitle: string;
    version: string;
    hash: string;
}
export type RawDataWithPositions = RawData & {
    positions: Record<string, Record<string, Record<string, Position[]>>>;
};
export interface PluginOptions {
}
export interface PluginData {
    searchData: Record<string, {
        data: ArrayBuffer;
    }>;
    versions: DocsVersion[];
}
export type Hit = Result<SectionSchema> & {
    position: Position;
};
export declare const PLUGIN_NAME = "@orama/plugin-docusaurus";
export declare const INDEX_FILE = "orama-search-index-@VERSION@.json.gz";
export declare const schema: {
    pageRoute: "string";
    sectionTitle: "string";
    sectionContent: "string";
    type: "string";
    version: "string";
};
export {};
