"use client";

import { useEffect, useRef } from "react";
import { onLoaderDone } from "@/lib/motion/runtime";
import { useGsap } from "@/components/motion/useGsap";

// Cursor split: viewport % where Seoul ends and Dhaka begins. Hovering a city opens it up.
const SPLIT_MIN = 30;
const SPLIT_MAX = 70;
const SPLIT_REST = 50;
const EASE = 0.08; // per-frame approach factor
const SPLIT_QUERY = "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/**
 * 1) Starts the hero's CSS intro once the initial loader starts leaving (or is skipped).
 * 2) Desktop + fine pointer: eases `--split` towards the cursor (rAF runs only while moving).
 * 3) Scroll-out: the photos sink slightly and the copy lifts away (desktop).
 */
export default function HeroIntro({ targetId }) {
    const scope = useRef(null);

    useEffect(() => {
        scope.current = document.getElementById(targetId);
        return onLoaderDone(() => scope.current?.setAttribute("data-intro", "play"));
    }, [targetId]);

    useEffect(() => {
        const hero = document.getElementById(targetId);
        if (!hero) return;
        const mq = window.matchMedia(SPLIT_QUERY);
        let current = SPLIT_REST;
        let target = SPLIT_REST;
        let raf = 0;
        let active = false;

        const write = (v) => hero.style.setProperty("--split", `${v.toFixed(2)}%`);
        const tick = () => {
            current += (target - current) * EASE;
            if (Math.abs(target - current) < 0.05) {
                current = target;
                raf = 0;
            } else {
                raf = requestAnimationFrame(tick);
            }
            write(current);
        };
        const goTo = (value) => {
            target = value;
            if (!raf) raf = requestAnimationFrame(tick);
        };
        const onMove = (e) => {
            const rect = hero.getBoundingClientRect();
            const x = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
            goTo(SPLIT_MAX - x * (SPLIT_MAX - SPLIT_MIN));
        };
        const onLeave = () => goTo(SPLIT_REST);

        const enable = () => {
            if (active) return;
            active = true;
            hero.addEventListener("pointermove", onMove, { passive: true });
            hero.addEventListener("pointerleave", onLeave);
        };
        const disable = () => {
            if (!active) return;
            active = false;
            hero.removeEventListener("pointermove", onMove);
            hero.removeEventListener("pointerleave", onLeave);
            cancelAnimationFrame(raf);
            raf = 0;
            current = target = SPLIT_REST;
            hero.style.removeProperty("--split");
        };
        const sync = () => (mq.matches ? enable() : disable());

        sync();
        mq.addEventListener("change", sync);
        return () => {
            mq.removeEventListener("change", sync);
            disable();
        };
    }, [targetId]);

    useGsap(
        scope,
        ({ gsap, reduce, conditions }) => {
            if (reduce || !conditions.desktop) return;
            const hero = scope.current;
            const st = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
            gsap.timeline({ scrollTrigger: st })
                .to(hero.querySelectorAll(".hero-pane"), { yPercent: 8, ease: "none" }, 0)
                .to(hero.querySelector(".hero-content"), { yPercent: -18, opacity: 0.15, ease: "none" }, 0);
        },
        { desktop: "(min-width: 768px)" },
    );

    return null;
}
