import type { LoadContext, Plugin } from '@docusaurus/types';
import { PluginOptions } from './types.js';
export type { PluginData, PluginOptions, RawDataWithPositions, SectionSchema } from './types.js';
export type DocusaurusOramaPlugin = (docusaurusContext: LoadContext, options: PluginOptions) => Plugin;
export default function docusaurusOramaPlugin(...args: Parameters<DocusaurusOramaPlugin>): Promise<ReturnType<DocusaurusOramaPlugin>>;
