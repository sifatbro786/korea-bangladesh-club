/** Hairline arrow. direction: "right" (→) or "out" (↗, external). */
export default function Arrow({ direction = "right", className = "" }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className={`inline-block size-[0.85em] shrink-0 transition-transform duration-500 ease-club ${className}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
        >
            {direction === "out" ? (
                <path d="M4 12 12 4M5.5 4H12v6.5" />
            ) : (
                <path d="M1.5 8h13M9.5 3l5 5-5 5" />
            )}
        </svg>
    );
}
