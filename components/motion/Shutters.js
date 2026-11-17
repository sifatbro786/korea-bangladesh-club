"use client";

import { useRef } from "react";
import { useGsap } from "./useGsap";

/**
 * Two hanji-lattice shutters part as the frame scrolls into view, revealing the image
 * (a nod to the changhoji window). Shutters are display:none until GSAP runs, so without
 * JS or with reduced motion the image is simply visible.
 */
export default function Shutters({ className = "", children }) {
    const ref = useRef(null);

    useGsap(ref, ({ gsap, reduce }) => {
        if (reduce) return;
        const [left, right] = ref.current.querySelectorAll("[data-shutter]");
        const img = ref.current.querySelector("img");
        gsap.set([left, right], { display: "block" });
        gsap.timeline({
            scrollTrigger: { trigger: ref.current, start: "top 78%", end: "center 45%", scrub: 0.8 },
        })
            .fromTo(left, { xPercent: 0 }, { xPercent: -101, ease: "power2.inOut" }, 0)
            .fromTo(right, { xPercent: 0 }, { xPercent: 101, ease: "power2.inOut" }, 0)
            .fromTo(img, { scale: 1.2 }, { scale: 1, ease: "none" }, 0);
    });

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            {children}
            <span data-shutter aria-hidden="true" className="hanji-shutter left-0 border-r" />
            <span data-shutter aria-hidden="true" className="hanji-shutter right-0 border-l" />
        </div>
    );
}
