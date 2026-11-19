"use client";

import NextLink from "next/link";
import { useParams } from "next/navigation";
import { DEFAULT_LOCALE, hasLocale, localizePath } from "@/lib/i18n/config";

/**
 * Drop-in for next/link: internal hrefs ("/about") get the current locale prefix ("/ko/about").
 * Content keeps locale-free hrefs, so the same documents serve every language.
 * Use `locale` to force a target language (the language switch).
 */
export default function LocaleLink({ href, locale, ...props }) {
    const params = useParams();
    const current = hasLocale(params?.locale) ? params.locale : DEFAULT_LOCALE;
    return <NextLink href={localizePath(href, locale ?? current)} {...props} />;
}
