/// <reference types="react" resolution-mode="require"/>
export interface SearchBarFooterTranslations {
    selectText?: string;
    selectKeyAriaLabel?: string;
    navigateText?: string;
    navigateUpKeyAriaLabel?: string;
    navigateDownKeyAriaLabel?: string;
    closeText?: string;
    closeKeyAriaLabel?: string;
    searchByText?: string;
}
interface SearchBarFooterProps {
    translations?: SearchBarFooterTranslations;
}
export declare function SearchBarFooter({ translations }: SearchBarFooterProps): JSX.Element;
export {};
