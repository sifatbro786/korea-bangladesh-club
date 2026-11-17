"use client";

import { useEffect, useEffectEvent } from "react";
import { loadGsap } from "@/lib/motion/runtime";

/**
 * Run GSAP code scoped to a container, loading GSAP lazily on first use.
 * Everything created inside `setup` is reverted on unmount (gsap.matchMedia context).
 *
 * `setup` receives { gsap, ScrollTrigger, reduce }. When `reduce` is true the user prefers
 * reduced motion: set final states only, no scroll-driven tweens.
 *
 * @param {React.RefObject<HTMLElement>} scopeRef
 * @param {(api: { gsap: any, ScrollTrigger: any, reduce: boolean }) => void | (() => void)} setup
 */
export function useGsap(scopeRef, setup) {
    const run = useEffectEvent((api) => setup(api));

    useEffect(() => {
        let mm = null;
        let cancelled = false;

        loadGsap().then(({ gsap, ScrollTrigger }) => {
            if (cancelled || !scopeRef.current) return;
            mm = gsap.matchMedia(scopeRef.current);
            mm.add(
                {
                    motion: "(prefers-reduced-motion: no-preference)",
                    reduce: "(prefers-reduced-motion: reduce)",
                },
                (ctx) => run({ gsap, ScrollTrigger, reduce: Boolean(ctx.conditions.reduce) }),
            );
        });

        return () => {
            cancelled = true;
            mm?.revert();
        };
    }, [scopeRef]);
}
