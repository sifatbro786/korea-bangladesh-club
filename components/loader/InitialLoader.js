import Image from "next/image";
import { getSiteSettings } from "@/lib/content";
import LoaderController from "./LoaderController";

const WORD = "KBBCC".split("");

/**
 * First-visit loader. Server-rendered so it is on screen in the first paint;
 * the real page renders underneath at full opacity (LCP is not delayed).
 * Visibility is controlled by html[data-loader] — see loaderScript.js and globals.css.
 */
export default async function InitialLoader() {
    const site = await getSiteSettings();
    const logo = site.logo?.image;

    return (
        <div className="loader grain" aria-hidden="true">
            <div className="loader-inner">
                {logo ? (
                    <Image src={logo.src} alt="" width={112} height={112} sizes="112px" loading="eager" className="loader-logo mb-8 size-24 md:size-28" />
                ) : null}
                <p className="loader-kicker text-label uppercase tracking-label text-accent">
                    Korea &nbsp;·&nbsp; Bangladesh
                </p>

                <p className="loader-word font-display text-heading">
                    {WORD.map((letter, i) => (
                        <span key={i} style={{ "--i": i }}>
                            {letter}
                        </span>
                    ))}
                </p>

                <div className="loader-rule">
                    <span className="loader-rule-line loader-rule-line--left" />
                    <span className="loader-rule-dot" />
                    <span className="loader-rule-line loader-rule-line--right" />
                </div>

                <p className="loader-sub text-label uppercase tracking-label text-muted">
                    Business &amp; Cultural Club
                </p>
            </div>

            <p className="loader-meta loader-meta--left text-label uppercase tracking-label text-muted">
                Uttar Badda, Dhaka
            </p>
            <p className="loader-meta loader-meta--right text-label uppercase tracking-label text-muted">
                A private members&rsquo; club
            </p>

            <LoaderController />
        </div>
    );
}
