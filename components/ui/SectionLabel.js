/**
 * Eyebrow above a section title: sentence case, no numbering, no wide tracking —
 * led by a tiny hairline lattice lozenge (changhoji motif) instead of a dash.
 * Style lives in the `eyebrow` utility (globals.css) so kickers elsewhere match.
 */
export default function SectionLabel({ as: Tag = "p", children, tone = "accent", className = "" }) {
    const color = tone === "light" ? "text-heading/80" : "text-accent";
    return (
        <Tag className={`eyebrow flex items-center gap-2.5 ${color} ${className}`}>
            <svg aria-hidden="true" viewBox="0 0 12 12" className="size-[0.7em] shrink-0" fill="none" stroke="currentColor">
                <path d="M6 .75 11.25 6 6 11.25.75 6Z" vectorEffect="non-scaling-stroke" />
                <path d="M6 3.75 8.25 6 6 8.25 3.75 6Z" vectorEffect="non-scaling-stroke" />
            </svg>
            <span>{children}</span>
        </Tag>
    );
}
