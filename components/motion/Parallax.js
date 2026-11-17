"use client";

import { useRef } from "react";
import { useGsap } from "./useGsap";

/**
 * Slow vertical parallax of the <img> inside. The image is pre-scaled so its edges
 * never show. Reduced motion → static. GSAP loads lazily on first use.
 */
export default function Parallax({ amount = 10, className = "", children }) {
    const ref = useRef(null);

    useGsap(ref, ({ gsap, reduce }) => {
        if (reduce) return;
        const img = ref.current.querySelector("img");
        if (!img) return;
        gsap.set(img, { scale: 1 + (amount * 2.2) / 100 });
        gsap.fromTo(
            img,
            { yPercent: -amount },
            {
                yPercent: amount,
                ease: "none",
                scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
            },
        );
    });

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            {children}
        </div>
    );
}
