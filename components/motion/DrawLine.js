"use client";

import { useRef } from "react";
import { useGsap } from "./useGsap";

/**
 * A hairline that draws itself as its container scrolls through the viewport.
 * axis="x" draws left→right, axis="y" top→bottom. Fully drawn without JS / reduced motion.
 */
export default function DrawLine({ axis = "x", trigger, className = "" }) {
    const ref = useRef(null);

    useGsap(ref, ({ gsap, reduce }) => {
        if (reduce) return;
        const prop = axis === "x" ? "scaleX" : "scaleY";
        gsap.fromTo(
            ref.current,
            { [prop]: 0 },
            {
                [prop]: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: trigger ? ref.current.closest(trigger) : ref.current,
                    start: "top 75%",
                    end: "bottom 60%",
                    scrub: true,
                },
            },
        );
    });

    return (
        <span
            ref={ref}
            aria-hidden="true"
            className={`block bg-accent ${axis === "x" ? "h-px w-full origin-left" : "h-full w-px origin-top"} ${className}`}
        />
    );
}
