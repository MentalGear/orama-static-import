/// <reference types="react" resolution-mode="require"/>
export type OramaSearchProps = {
    limitResults: number;
    boost: {
        title: number;
        description: number;
        content: number;
    };
};
export declare function OramaSearch(props?: OramaSearchProps): JSX.Element | null;
