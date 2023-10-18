import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
function codeTranslationLocalesToTry(locale) {
    const intlLocale = new Intl.Locale(locale);
    const maximizedLocale = intlLocale.maximize();
    return [
        locale,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        `${maximizedLocale.language}-${maximizedLocale.region}`,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        `${maximizedLocale.language}-${maximizedLocale.script}`,
        maximizedLocale.language
    ];
}
async function retrieveObjectContent(filePath) {
    const fileContent = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(fileContent);
}
export async function retrieveTranslationMessages(docusaurusContext) {
    const translationsDir = fileURLToPath(new URL('../translationMessages', import.meta.url));
    const localesToTry = codeTranslationLocalesToTry(docusaurusContext.i18n.currentLocale);
    const existingLocalePath = localesToTry.map((locale)=>path.join(translationsDir, `${locale}.json`)).find(fs.existsSync);
    return existingLocalePath ? retrieveObjectContent(existingLocalePath) : Promise.resolve({});
}

//# sourceMappingURL=translationMessages.js.map