import { getDictionary } from "@/lib/i18n/server";

/** Small country marker for member listings: hairline lozenge + name. Navy for Korea, crimson for Bangladesh. */
export default async function Country({ code, className = "" }) {
    const t = (await getDictionary()).countries;
    const label = code === "kr" || code === "bd" ? t[code] : null;
    if (!label) return null;
    return (
        <span className={`inline-flex items-center gap-2 text-label uppercase tracking-label text-muted ${className}`}>
            <span
                aria-hidden="true"
                className={`size-1.5 rotate-45 border border-accent/60 ${code === "kr" ? "bg-navy" : "bg-crimson"}`}
            />
            <span className="sr-only">{t.from} </span>
            {label}
        </span>
    );
}
