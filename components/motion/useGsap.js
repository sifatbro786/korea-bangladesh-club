"use client";

import { useEffect, useEffectEvent } from "react";
import { afterLoaderIdle, loadGsap, loadSplitText, scheduleScrollRefresh } from "@/lib/motion/runtime";

/**
 * Run GSAP code scoped to a container, loading GSAP lazily on first use.
 * Everything created inside `setup` is reverted on unmount (gsap.matchMedia context),
 * and re-run when a media condition flips (e.g. resizing across a breakpoint).
 *
 * `setup` receives { gsap, ScrollTrigger, reduce, conditions }.
 *  - reduce: user prefers reduced motion → set final states only, no scroll-driven tweens.
 *  - conditions: booleans for any extra media queries passed as the third argument,
 *    e.g. useGsap(ref, fn, { desktop: "(min-width: 1024px)" }) → conditions.desktop.
 *
 * @param {React.RefObject<HTMLElement>} scopeRef
 * @param {(api: { gsap: any, ScrollTrigger: any, reduce: boolean, conditions: Record<string, boolean> }) => void | (() => void)} setup
 * @param {Record<string, string>} [extraConditions]
 * @param {{ split?: boolean }} [options]  split: also load SplitText (passed as api.SplitText)
 */
export function useGsap(scopeRef, setup, extraConditions, options) {
    const run = useEffectEvent((api) => setup(api));
    const getExtra = useEffectEvent(() => extraConditions ?? {});
    const wantsSplit = useEffectEvent(() => Boolean(options?.split));

    useEffect(() => {
        let mm = null;
        let cancelled = false;

        afterLoaderIdle()
            .then(() => (wantsSplit() ? loadSplitText() : loadGsap()))
            .then(({ gsap, ScrollTrigger, SplitText }) => {
            if (cancelled || !scopeRef.current) return;
            mm = gsap.matchMedia(scopeRef.current);
            mm.add(
                {
                    ...getExtra(),
                    motion: "(prefers-reduced-motion: no-preference)",
                    reduce: "(prefers-reduced-motion: reduce)",
                },
                (ctx) =>
                    run({
                        gsap,
                        ScrollTrigger,
                        SplitText,
                        reduce: Boolean(ctx.conditions.reduce),
                        conditions: ctx.conditions,
                    }),
            );
            scheduleScrollRefresh();
        });

        return () => {
            cancelled = true;
            if (mm) {
                mm.revert();
                scheduleScrollRefresh();
            }
        };
    }, [scopeRef]);
}
