/// <reference types="node" />
import { AnyDocument, AnyOrama } from '@orama/orama';
import { Properties } from 'hast';
export type MergeStrategy = 'merge' | 'split' | 'both';
export declare const defaultHtmlSchema: {
    readonly type: "string";
    readonly content: "string";
    readonly path: "string";
};
export interface DefaultSchemaElement extends AnyDocument {
    type: string;
    content: string;
    path: string;
    properties?: Properties;
}
export type PopulateFnContext = Record<string, any>;
interface PopulateFromGlobOptions {
    transformFn?: TransformFn;
    mergeStrategy?: MergeStrategy;
    context?: PopulateFnContext;
}
type PopulateOptions = PopulateFromGlobOptions & {
    basePath?: string;
};
type FileType = 'html' | 'md';
export declare function populateFromGlob<T extends AnyOrama>(db: T, pattern: string, options?: PopulateFromGlobOptions): Promise<void>;
export declare const parseFile: (data: Buffer | string, fileType: FileType, options?: PopulateOptions) => Promise<DefaultSchemaElement[]>;
export declare function populate<T extends AnyOrama>(db: T, data: Buffer | string, fileType: FileType, options?: PopulateOptions): Promise<string[]>;
export interface NodeContent {
    tag: string;
    raw: string;
    content: string;
    properties?: Properties;
    additionalProperties?: Properties;
}
export type TransformFn = (node: NodeContent, context: PopulateFnContext) => NodeContent;
export {};
