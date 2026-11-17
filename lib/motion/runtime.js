import Lenis from "lenis";

/**
 * Motion runtime (client only).
 *
 * - Lenis starts immediately on first client render (unless reduced motion), driven by
 *   its own rAF loop.
 * - GSAP + ScrollTrigger are NOT in the initial bundle. `loadGsap()` dynamic-imports them
 *   the first time a component needs them; at that point Lenis is handed over to
 *   `gsap.ticker` so smooth scroll and scroll-driven tweens run on one clock.
 */

let lenis = null;
let rafId = 0;
let gsapModules = null;
let gsapPromise = null;
let scrollLocked = false;
let loaderDone = false;
const loaderListeners = new Set();

export function prefersReducedMotion() {
    return (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
}

function ownLoop(time) {
    lenis?.raf(time);
    rafId = requestAnimationFrame(ownLoop);
}

function gsapTick(time) {
    lenis?.raf(time * 1000);
}

function attachLenisToGsap() {
    if (!lenis || !gsapModules) return;
    const { gsap, ScrollTrigger } = gsapModules;
    cancelAnimationFrame(rafId);
    rafId = 0;
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.remove(gsapTick);
    gsap.ticker.add(gsapTick);
    gsap.ticker.lagSmoothing(0);
}

export function startLenis() {
    if (lenis || prefersReducedMotion()) return lenis;

    lenis = new Lenis({
        anchors: true, // in-page #anchor links scroll smoothly
        stopInertiaOnNavigate: true, // no leftover momentum after clicking an internal link
    });

    if (gsapModules) attachLenisToGsap();
    else rafId = requestAnimationFrame(ownLoop);

    if (scrollLocked) lenis.stop();

    return lenis;
}

export function destroyLenis() {
    cancelAnimationFrame(rafId);
    rafId = 0;
    gsapModules?.gsap.ticker.remove(gsapTick);
    lenis?.destroy();
    lenis = null;
}

export function getLenis() {
    return lenis;
}

/** @returns {Promise<{ gsap: typeof import("gsap").gsap, ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger }>} */
export function loadGsap() {
    if (!gsapPromise) {
        gsapPromise = Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
            ([{ gsap }, { ScrollTrigger }]) => {
                gsap.registerPlugin(ScrollTrigger);
                gsapModules = { gsap, ScrollTrigger };
                attachLenisToGsap();
                // Web fonts change line heights → recompute trigger positions once they land.
                document.fonts?.ready.then(() => ScrollTrigger.refresh());
                return gsapModules;
            },
        );
    }
    return gsapPromise;
}

/** Lock/unlock smooth scroll (used by the initial loader). Native scroll is locked via CSS. */
export function setScrollLock(locked) {
    scrollLocked = locked;
    if (!lenis) return;
    if (locked) lenis.stop();
    else lenis.start();
}

/**
 * Subscribe to "the initial loader has started leaving" (or was skipped).
 * Use it to start hero intro animations. Fires immediately if already done.
 * @param {() => void} callback
 * @returns {() => void} unsubscribe
 */
export function onLoaderDone(callback) {
    if (loaderDone) {
        callback();
        return () => {};
    }
    loaderListeners.add(callback);
    return () => loaderListeners.delete(callback);
}

export function markLoaderDone() {
    if (loaderDone) return;
    loaderDone = true;
    for (const callback of loaderListeners) callback();
    loaderListeners.clear();
}
