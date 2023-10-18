/// <reference types="react" resolution-mode="require"/>
import { TypedDocument } from '@orama/orama';
import type { SearchResultWithHighlight } from '@orama/plugin-match-highlight';
import { NextraOrama } from '../utils/index.js';
type HighlightedDocumentProps = {
    trim?: number;
    hit: SearchResultWithHighlight<TypedDocument<NextraOrama>>['hits'][0];
};
export declare function HighlightedDocument({ hit, trim }: HighlightedDocumentProps): JSX.Element;
export {};
