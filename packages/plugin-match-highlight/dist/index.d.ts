import { AnyOrama, Language, RawData, Result, Results, SearchParams, TypedDocument } from '@orama/orama';
export interface Position {
    start: number;
    length: number;
}
export type OramaWithHighlight<T extends AnyOrama> = T & {
    data: {
        positions: Record<string, Record<string, Record<string, Position[]>>>;
    };
};
export type ResultWithPositions<ResultDocument> = Result<ResultDocument> & {
    positions: Record<string, Record<string, Position[]>>;
};
export type SearchResultWithHighlight<ResultDocument> = Omit<Results<ResultDocument>, 'hits'> & {
    hits: ResultWithPositions<ResultDocument>[];
};
export type RawDataWithPositions = RawData & {
    positions: Record<string, Record<string, Record<string, Position[]>>>;
};
export declare function afterInsert<T extends AnyOrama>(orama: T, id: string): Promise<void>;
export declare function searchWithHighlight<T extends AnyOrama, ResultDocument = TypedDocument<T>>(orama: T, params: SearchParams<T, ResultDocument>, language?: Language): Promise<SearchResultWithHighlight<ResultDocument>>;
export declare function saveWithHighlight<T extends AnyOrama>(orama: T): Promise<RawDataWithPositions>;
export declare function loadWithHighlight<T extends AnyOrama>(orama: T, raw: RawDataWithPositions): Promise<void>;
