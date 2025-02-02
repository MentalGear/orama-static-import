declare const errors: {
    NO_LANGUAGE_WITH_CUSTOM_TOKENIZER: string;
    LANGUAGE_NOT_SUPPORTED: string;
    INVALID_STEMMER_FUNCTION_TYPE: string;
    MISSING_STEMMER: string;
    CUSTOM_STOP_WORDS_MUST_BE_FUNCTION_OR_ARRAY: string;
    UNSUPPORTED_COMPONENT: string;
    COMPONENT_MUST_BE_FUNCTION: string;
    COMPONENT_MUST_BE_FUNCTION_OR_ARRAY_FUNCTIONS: string;
    INVALID_SCHEMA_TYPE: string;
    DOCUMENT_ID_MUST_BE_STRING: string;
    DOCUMENT_ALREADY_EXISTS: string;
    DOCUMENT_DOES_NOT_EXIST: string;
    MISSING_DOCUMENT_PROPERTY: string;
    INVALID_DOCUMENT_PROPERTY: string;
    UNKNOWN_INDEX: string;
    INVALID_BOOST_VALUE: string;
    INVALID_FILTER_OPERATION: string;
    SCHEMA_VALIDATION_FAILURE: string;
    INVALID_SORT_SCHEMA_TYPE: string;
    CANNOT_SORT_BY_ARRAY: string;
    UNABLE_TO_SORT_ON_UNKNOWN_FIELD: string;
    SORT_DISABLED: string;
    UNKNOWN_GROUP_BY_PROPERTY: string;
    INVALID_GROUP_BY_PROPERTY: string;
    UNKNOWN_FILTER_PROPERTY: string;
    INVALID_VECTOR_SIZE: string;
    INVALID_VECTOR_VALUE: string;
    INVALID_INPUT_VECTOR: string;
    WRONG_SEARCH_PROPERTY_TYPE: string;
    FACET_NOT_SUPPORTED: string;
    INVALID_DISTANCE_SUFFIX: string;
};
export type ErrorCode = keyof typeof errors;
export interface OramaError extends Error {
    code: string;
}
export declare function createError(code: ErrorCode, ...args: Array<string | number>): OramaError;
export {};
