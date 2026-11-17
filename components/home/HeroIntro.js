"use client";

import { useEffect, useRef } from "react";
import { onLoaderDone } from "@/lib/motion/runtime";
import { useGsap } from "@/components/motion/useGsap";

/**
 * 1) Starts the hero's CSS intro once the initial loader starts leaving (or is skipped).
 * 2) Scroll-out: the Seoul and Dhaka panes drift apart and the copy lifts away (desktop).
 */
export default function HeroIntro({ targetId }) {
    const scope = useRef(null);

    useEffect(() => {
        scope.current = document.getElementById(targetId);
        return onLoaderDone(() => scope.current?.setAttribute("data-intro", "play"));
    }, [targetId]);

    useGsap(
        scope,
        ({ gsap, reduce, conditions }) => {
            if (reduce || !conditions.desktop) return;
            const hero = scope.current;
            const [left, right] = hero.querySelectorAll(".hero-pane");
            const st = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
            gsap.timeline({ scrollTrigger: st })
                .to(left, { xPercent: -7, ease: "none" }, 0)
                .to(right, { xPercent: 7, ease: "none" }, 0)
                .to(hero.querySelector(".hero-content"), { yPercent: -18, opacity: 0.15, ease: "none" }, 0);
        },
        { desktop: "(min-width: 768px)" },
    );

    return null;
}
