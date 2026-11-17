/** Hairline – circle – hairline divider (nakshi/dancheong-derived identity ornament). */
export default function Ornament({ className = "", align = "center" }) {
    const left = align === "start" ? "w-6" : "flex-1";
    return (
        <span aria-hidden="true" className={`flex items-center gap-3 text-accent ${className}`}>
            <span className={`h-px ${left} bg-line`} />
            <span className="size-[5px] rounded-full border border-current" />
            <span className="h-px flex-1 bg-line" />
        </span>
    );
}
