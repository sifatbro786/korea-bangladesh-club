import { locale as rootLocale } from "next/root-params";
import { DEFAULT_LOCALE, LOCALES, LOCALE_META, hasLocale, localizePath } from "./config";
import en from "./dictionaries/en";
import ko from "./dictionaries/ko";

/**
 * Current locale from the `[locale]` root segment (next/root-params — no prop drilling).
 * Server Components / server utilities only; NOT route handlers (sitemap/robots pass a locale explicitly).
 * @returns {Promise<"en" | "ko">}
 */
export async function getLocale() {
    const value = await rootLocale();
    return hasLocale(value) ? value : DEFAULT_LOCALE;
}

const DICTIONARIES = { en, ko };

/** UI strings (buttons, labels, aria text). Missing Korean keys fall back to English. */
export async function getDictionary(locale) {
    locale ??= await getLocale();
    return deepMerge(en, DICTIONARIES[locale] ?? {});
}

/**
 * `alternates` metadata for a page: canonical for the current locale + hreflang for every locale.
 * @param {string} path unprefixed path, e.g. "/about"
 */
export async function localeAlternates(path) {
    const locale = await getLocale();
    return {
        canonical: localizePath(path, locale),
        languages: {
            ...Object.fromEntries(LOCALES.map((l) => [LOCALE_META[l].htmlLang, localizePath(path, l)])),
            "x-default": localizePath(path, DEFAULT_LOCALE),
        },
    };
}

/**
 * Deep merge for localized content: `override` wins where it has a value; arrays merge by index
 * (so a translated list keeps media ids/hrefs it doesn't repeat); `undefined`/`null` keeps the base.
 */
export function deepMerge(base, override) {
    if (override === undefined || override === null) return base;
    if (Array.isArray(base) && Array.isArray(override)) {
        return base.map((item, i) => deepMerge(item, override[i]));
    }
    if (isPlainObject(base) && isPlainObject(override)) {
        const out = { ...base };
        for (const [key, value] of Object.entries(override)) out[key] = deepMerge(base[key], value);
        return out;
    }
    return override;
}

const isPlainObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
