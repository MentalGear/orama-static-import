import { load, save, search } from '@orama/orama';
import { boundedLevenshtein } from '@orama/orama/internals';
export async function afterInsert(orama, id) {
    if (!('positions' in orama.data)) {
        Object.assign(orama.data, {
            positions: {}
        });
    }
    await recursivePositionInsertion(orama, await orama.documentsStore.get(orama.data.docs, id), id);
}
const wordRegEx = /[\p{L}0-9_'-]+/gimu;
async function recursivePositionInsertion(orama, doc, id, prefix = '', schema = orama.schema) {
    orama.data.positions[id] = Object.create(null);
    for (const key of Object.keys(doc)){
        const isNested = typeof doc[key] === 'object';
        const isSchemaNested = typeof schema[key] === 'object';
        const propName = `${prefix}${String(key)}`;
        if (isNested && key in schema && isSchemaNested) {
            recursivePositionInsertion(orama, doc[key], id, propName + '.', schema[key]);
        }
        if (!(typeof doc[key] === 'string' && key in schema && !isSchemaNested)) {
            continue;
        }
        orama.data.positions[id][propName] = Object.create(null);
        const text = doc[key];
        let regExResult;
        while((regExResult = wordRegEx.exec(text)) !== null){
            const word = regExResult[0].toLowerCase();
            const key = `${orama.tokenizer.language}:${word}`;
            let token;
            if (orama.tokenizer.normalizationCache.has(key)) {
                token = orama.tokenizer.normalizationCache.get(key);
            /* c8 ignore next 4 */ } else {
                [token] = await orama.tokenizer.tokenize(word);
                orama.tokenizer.normalizationCache.set(key, token);
            }
            if (!Array.isArray(orama.data.positions[id][propName][token])) {
                orama.data.positions[id][propName][token] = [];
            }
            const start = regExResult.index;
            const length = regExResult[0].length;
            orama.data.positions[id][propName][token].push({
                start,
                length
            });
        }
    }
}
export async function searchWithHighlight(orama, params, language) {
    const result = await search(orama, params, language);
    const queryTokens = await orama.tokenizer.tokenize(params.term ?? '', language);
    let hitsWithPosition = [];
    for (const hit of result.hits){
        const hitPositions = Object.entries(orama.data.positions[hit.id]);
        let hits = [];
        for (const [propName, tokens] of hitPositions){
            const matchWithSearchTokens = [];
            const tokenEntries = Object.entries(tokens);
            for (const tokenEntry of tokenEntries){
                const [token] = tokenEntry;
                for (const queryToken of queryTokens){
                    if (params.tolerance) {
                        const distance = await boundedLevenshtein(token, queryToken, params.tolerance);
                        if (distance.isBounded) {
                            matchWithSearchTokens.push(tokenEntry);
                            break;
                        }
                    } else if (token.startsWith(queryToken)) {
                        matchWithSearchTokens.push(tokenEntry);
                        break;
                    }
                }
            }
            hits.push([
                propName,
                Object.fromEntries(matchWithSearchTokens)
            ]);
        }
        hitsWithPosition.push(Object.assign(hit, {
            positions: Object.fromEntries(hits)
        }));
    }
    result.hits = hitsWithPosition;
    // @ts-ignore
    return result;
}
export async function saveWithHighlight(orama) {
    const data = await save(orama);
    return {
        ...data,
        positions: orama.data.positions
    };
}
export async function loadWithHighlight(orama, raw) {
    await load(orama, raw);
    orama.data.positions = raw.positions;
}

//# sourceMappingURL=index.js.map