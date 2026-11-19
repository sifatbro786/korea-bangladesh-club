"use client";

import NextLink from "next/link";
import { useParams, usePathname } from "next/navigation";
import { DEFAULT_LOCALE, hasLocale, localeOfPath, localizePath } from "@/lib/i18n/config";

/**
 * Drop-in for next/link: internal hrefs ("/about") get the current locale prefix ("/ko/about").
 * Content keeps locale-free hrefs, so the same documents serve every language.
 * Use `locale` to force a target language (the language switch).
 */
export default function LocaleLink({ href, locale, ...props }) {
    const params = useParams();
    const pathname = usePathname();
    // No route params on the global 404 → fall back to the URL prefix.
    const current = hasLocale(params?.locale) ? params.locale : (localeOfPath(pathname ?? "") ?? DEFAULT_LOCALE);
    return <NextLink href={localizePath(href, locale ?? current)} {...props} />;
}
