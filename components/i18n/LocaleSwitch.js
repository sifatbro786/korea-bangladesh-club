"use client";

import { useParams, usePathname } from "next/navigation";
import {
    DEFAULT_LOCALE,
    LOCALES,
    LOCALE_COOKIE,
    LOCALE_COOKIE_MAX_AGE,
    LOCALE_META,
    hasLocale,
    localizePath,
    stripLocale,
} from "@/lib/i18n/config";

function remember(locale) {
    document.cookie = `${LOCALE_COOKIE}=${locale}; Path=/; Max-Age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax`;
}

/**
 * Language switch: plain links to the same page in the other language (works without JS; crawlable).
 * Clicking stores the choice in a cookie so proxy.js opens the site in that language next time.
 * Full document navigation on purpose — <html lang> and the root layout change with the locale.
 *
 * variant "bar": compact "EN / KO" for the header · "menu": full language names for the mobile menu.
 */
export default function LocaleSwitch({ label, variant = "bar", className = "" }) {
    const params = useParams();
    const pathname = usePathname() ?? "/";
    const current = hasLocale(params?.locale) ? params.locale : DEFAULT_LOCALE;
    const bare = stripLocale(pathname);

    return (
        <nav aria-label={label} className={className}>
            <ul className={`flex items-center ${variant === "menu" ? "gap-8" : "gap-1"}`}>
                {LOCALES.map((l, i) => {
                    const meta = LOCALE_META[l];
                    const active = l === current;
                    return (
                        <li key={l} className="flex items-center gap-1">
                            {variant === "bar" && i > 0 ? (
                                <span aria-hidden="true" className="text-heading/30">
                                    /
                                </span>
                            ) : null}
                            <a
                                href={localizePath(bare, l)}
                                hrefLang={meta.htmlLang}
                                lang={meta.htmlLang}
                                aria-current={active ? "true" : undefined}
                                onClick={() => remember(l)}
                                className={`px-1 py-2 transition-colors duration-300 ${
                                    active ? "text-accent" : "text-heading/60 hover:text-heading"
                                } ${variant === "menu" ? "text-sm tracking-[0.06em]" : "text-[0.75rem] tracking-[0.14em] xl:tracking-[0.2em]"}`}
                            >
                                {variant === "menu" ? meta.name : <abbr title={meta.name} className="no-underline">{meta.short}</abbr>}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
