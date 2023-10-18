import type { AnyOrama } from '@orama/orama';
export declare function getOramaDB<T extends AnyOrama>(dbName: string): Promise<T>;
export { search } from '@orama/orama';
