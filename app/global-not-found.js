import { DEFAULT_LOCALE } from "@/lib/i18n/config";
import NotFoundView from "@/components/page/NotFoundView";
import { fontVariables } from "./font-config";
import "./globals.css";

export const metadata = {
    title: "Page not found — KBBCC",
    robots: { index: false },
};

/**
 * 404 for URLs that match no route. The root layout lives in app/[locale], so Next renders this
 * file on its own (experimental.globalNotFound): it must bring <html>, fonts and global CSS itself.
 * No root params here → English chrome. No loader / smooth scroll on purpose.
 */
export default function GlobalNotFound() {
    return (
        <html lang="en" className={`${fontVariables} antialiased`}>
            <body className="flex min-h-dvh flex-col">
                <NotFoundView locale={DEFAULT_LOCALE} />
            </body>
        </html>
    );
}
