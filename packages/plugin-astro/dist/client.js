import { create as createOramaDB, load as loadOramaDB } from '@orama/orama';
const dbs = {};
export async function getOramaDB(dbName) {
    if (dbName in dbs) {
        return dbs[dbName];
    }
    const db = await createOramaDB({
        schema: {
            _: 'string'
        }
    });
    const dbResponse = await fetch(`/assets/oramaDB_${dbName}.json`);
    const dbData = await dbResponse.json();
    await loadOramaDB(db, dbData);
    dbs[dbName] = db;
    return db;
}
export { search } from '@orama/orama';

//# sourceMappingURL=client.js.map