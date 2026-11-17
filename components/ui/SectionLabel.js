/** Small tracked-caps section label: "01 — The Club". */
export default function SectionLabel({ as: Tag = "p", index, children, tone = "accent", className = "" }) {
    const color = tone === "light" ? "text-heading/70" : "text-accent";
    return (
        <Tag className={`flex items-center gap-4 font-sans text-label font-normal uppercase tracking-label ${color} ${className}`}>
            {index ? <span>{index}</span> : null}
            <span aria-hidden="true" className="h-px w-10 bg-current opacity-40" />
            <span>{children}</span>
        </Tag>
    );
}
