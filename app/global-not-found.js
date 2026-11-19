import { Suspense } from "react";
import { headers } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_HEADER, hasLocale } from "@/lib/i18n/config";
import NotFoundView from "@/components/page/NotFoundView";
import { fontVariables } from "./font-config";
import "./globals.css";

export const metadata = {
    title: "Page not found · 페이지를 찾을 수 없습니다 — KBBCC",
    robots: { index: false },
};

/** Language of the unmatched URL: proxy.js sets the header on /ko/... requests. */
async function LocalizedNotFound() {
    const value = (await headers()).get(LOCALE_HEADER);
    return <NotFoundView locale={hasLocale(value) ? value : DEFAULT_LOCALE} />;
}

/**
 * 404 for URLs that match no route. The root layout lives in app/[locale], so Next renders this
 * file on its own (experimental.globalNotFound): it must bring <html>, fonts and global CSS itself.
 * No root params here: the language comes from a request header (Suspense keeps the shell static;
 * English is the fallback). No loader / smooth scroll on purpose.
 */
export default function GlobalNotFound() {
    return (
        <html lang="en" className={`${fontVariables} antialiased`}>
            <body className="flex min-h-dvh flex-col">
                <Suspense fallback={<NotFoundView locale={DEFAULT_LOCALE} />}>
                    <LocalizedNotFound />
                </Suspense>
            </body>
        </html>
    );
}
