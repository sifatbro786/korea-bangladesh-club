const COUNTRY = { kr: "Korea", bd: "Bangladesh" };

/** Small country marker for member listings: hairline lozenge + name. Navy for Korea, crimson for Bangladesh. */
export default function Country({ code, className = "" }) {
    const label = COUNTRY[code];
    if (!label) return null;
    return (
        <span className={`inline-flex items-center gap-2 text-label uppercase tracking-label text-muted ${className}`}>
            <span
                aria-hidden="true"
                className={`size-1.5 rotate-45 border border-accent/60 ${code === "kr" ? "bg-navy" : "bg-crimson"}`}
            />
            <span className="sr-only">From </span>
            {label}
        </span>
    );
}
