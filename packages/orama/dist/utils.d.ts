import type { AnyDocument, GeosearchDistanceUnit, SearchableValue, TokenScore } from './types.js';
export declare const isServer: boolean;
/**
 * This value can be increased up to 100_000
 * But i don't know if this value change from nodejs to nodejs
 * So I will keep a safer value here.
 */
export declare const MAX_ARGUMENT_FOR_STACK = 65535;
/**
 * This method is needed to used because of issues like: https://github.com/oramasearch/orama/issues/301
 * that issue is caused because the array that is pushed is huge (>100k)
 *
 * @example
 * ```ts
 * safeArrayPush(myArray, [1, 2])
 * ```
 */
export declare function safeArrayPush<T>(arr: T[], newArr: T[]): void;
export declare function sprintf(template: string, ...args: Array<string | number>): string;
export declare function formatBytes(bytes: number, decimals?: number): Promise<string>;
export declare function formatNanoseconds(value: number | bigint): Promise<string>;
export declare function getNanosecondsTime(): Promise<bigint>;
export declare function uniqueId(): Promise<string>;
export declare function getOwnProperty<T = unknown>(object: Record<string, T>, property: string): T | undefined;
export declare function getTokenFrequency(token: string, tokens: string[]): number;
export declare function insertSortedValue(arr: TokenScore[], el: TokenScore, compareFn?: typeof sortTokenScorePredicate): TokenScore[];
export declare function sortTokenScorePredicate(a: TokenScore, b: TokenScore): number;
export declare function intersect<T>(arrays: Array<readonly T[]>): T[];
export declare function getDocumentProperties(doc: AnyDocument, paths: string[]): Promise<Record<string, SearchableValue>>;
export declare function getNested<T = SearchableValue>(obj: object, path: string): Promise<T | undefined>;
export declare function flattenObject(obj: object, prefix?: string): AnyDocument;
export declare function convertDistanceToMeters(distance: number, unit: GeosearchDistanceUnit): number;
