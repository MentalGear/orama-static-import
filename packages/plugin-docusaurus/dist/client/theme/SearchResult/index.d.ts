/// <reference types="react" resolution-mode="require"/>
import { Result } from '@orama/orama';
import { Position } from '@orama/plugin-match-highlight';
import { SectionSchema } from '../../../server/types.js';
type Hit = Result<SectionSchema> & {
    position: Position;
};
interface SearchResultProps {
    hit: Hit;
}
export declare function SearchResult({ hit }: SearchResultProps): JSX.Element;
export {};
