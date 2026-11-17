/**
 * Inline script that runs during HTML parsing (before first paint) without React's
 * "Encountered a script tag" dev warning.
 * Server renders type="text/javascript" (executes); the client renders "text/plain"
 * (React does not warn, nothing re-runs). suppressHydrationWarning covers the mismatch.
 * Pattern from Next's "Preventing flash before hydration" guide.
 */
export default function InlineScript({ html }) {
    return (
        <script
            type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
