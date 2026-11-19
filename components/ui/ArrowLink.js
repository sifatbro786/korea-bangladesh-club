import Link from "@/components/i18n/LocaleLink";
import Arrow from "./Arrow";
import { getDictionary } from "@/lib/i18n/server";

/**
 * Text link with hairline underline and arrow — the site's only CTA style
 * (no pill buttons). External links open in a new tab.
 */
export default async function ArrowLink({ href, children, external = false, className = "" }) {
    const classes = `group inline-flex items-center gap-3 text-sm uppercase tracking-[0.18em] text-heading hover:text-accent ${className}`;
    const inner = (
        <>
            <span className="link-line">{children}</span>
            <Arrow
                direction={external ? "out" : "right"}
                className={external ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5" : "group-hover:translate-x-1"}
            />
        </>
    );

    if (external) {
        const dict = await getDictionary();
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
                {inner}
                <span className="sr-only"> {dict.a11y.newTab}</span>
            </a>
        );
    }
    if (href.startsWith("#")) {
        return (
            <a href={href} className={classes}>
                {inner}
            </a>
        );
    }
    return (
        <Link href={href} className={classes}>
            {inner}
        </Link>
    );
}
