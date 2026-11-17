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
let splitPromise = null;
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

/**
 * SplitText (free since gsap 3.13), loaded only when a split heading is on the page.
 * @returns {Promise<{ gsap: any, ScrollTrigger: any, SplitText: any }>}
 */
export function loadSplitText() {
    if (!splitPromise) {
        splitPromise = Promise.all([loadGsap(), import("gsap/SplitText")]).then(([mods, { SplitText }]) => {
            mods.gsap.registerPlugin(SplitText);
            return { ...mods, SplitText };
        });
    }
    return splitPromise;
}

let refreshRaf = 0;
/**
 * Components create ScrollTriggers independently (some with pins that add height).
 * Re-measure every trigger once, on the next frame after the latest one was created.
 */
export function scheduleScrollRefresh() {
    if (!gsapModules) return;
    cancelAnimationFrame(refreshRaf);
    refreshRaf = requestAnimationFrame(() => gsapModules?.ScrollTrigger.refresh());
}

let idleGate = null;
/**
 * Resolves after the initial loader is done (or skipped) AND the browser is idle.
 * GSAP/SplitText load behind this gate so they never compete with the LCP image or
 * hydration (Lighthouse TBT/LCP). All GSAP effects have CSS/static fallbacks meanwhile.
 */
export function afterLoaderIdle() {
    if (!idleGate) {
        idleGate = new Promise((resolve) => {
            onLoaderDone(() => {
                const ric = window.requestIdleCallback ?? ((cb) => window.setTimeout(cb, 200));
                ric(() => resolve(), { timeout: 1500 });
            });
        });
    }
    return idleGate;
}
