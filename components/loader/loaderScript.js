/**
 * Inline <head> script — runs before first paint so the server-rendered loader never
 * flashes on repeat visits.
 *
 *   html[data-loader="active"]  → show loader (first visit, or last one older than the TTL)
 *   html[data-loader="skip"]    → seen recently (or storage blocked)
 *   no attribute (no JS)        → loader stays hidden; site is fully usable
 *
 * localStorage (not sessionStorage) so opening a link in a new tab does not replay it.
 * `?loader` in the URL forces it again (handy for testing).
 * Phase 2 CSP: allow this script by its sha256 hash (it is static).
 */
export const LOADER_STORAGE_KEY = "kbbcc:loader-seen";
export const LOADER_TTL_MS = 12 * 60 * 60 * 1000; // replay after 12 hours

export const loaderScript = `(function(){var d=document.documentElement,k="${LOADER_STORAGE_KEY}";try{if(/[?&]loader\\b/.test(location.search))localStorage.removeItem(k);var t=+localStorage.getItem(k)||0;d.setAttribute("data-loader",Date.now()-t<${LOADER_TTL_MS}?"skip":"active")}catch(e){d.setAttribute("data-loader","skip")}})();`;
