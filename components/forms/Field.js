/** Shared form primitives (membership application, contact). Theme-aware via tokens. */

export function Field({ id, label, error, required, hint, children, className = "" }) {
    return (
        <div className={className}>
            <label id={`${id}-label`} htmlFor={id} className="block text-label uppercase tracking-label text-muted">
                {label}
                {required ? <span className="text-accent"> *</span> : null}
            </label>
            {children}
            {hint && !error ? (
                <p id={`${id}-hint`} className="mt-2 text-sm text-muted">
                    {hint}
                </p>
            ) : null}
            {error ? (
                <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-danger">
                    {error}
                </p>
            ) : null}
        </div>
    );
}

export const inputClass =
    "mt-3 block w-full border-0 border-b border-line bg-transparent px-0 py-3 text-heading placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-danger";
