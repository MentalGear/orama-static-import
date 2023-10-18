import type { LoadContext, Plugin } from '@docusaurus/types';
import type { DefaultSchemaElement, NodeContent, PopulateFnContext } from '@orama/plugin-parsedoc';
import { PluginOptions, SectionSchema } from './types.js';
export type { PluginData, PluginOptions, RawDataWithPositions, SectionSchema } from './types.js';
export declare function transformFn(node: NodeContent, context: PopulateFnContext): NodeContent;
export declare function defaultToSectionSchema(node: DefaultSchemaElement, pageRoute: string, sectionTitle: string, version: string): SectionSchema;
declare function docusaurusOramaPlugin(context: LoadContext, options: PluginOptions): Plugin;
export default docusaurusOramaPlugin;
