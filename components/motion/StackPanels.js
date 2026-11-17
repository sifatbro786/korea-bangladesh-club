"use client";

import { useRef } from "react";
import { useGsap } from "./useGsap";

/**
 * Full-screen panels that stack (CSS position: sticky does the stacking, so it works
 * without JS). GSAP adds depth: the panel underneath scales down and dims as the next
 * one slides over it.
 */
export default function StackPanels({ className = "", children }) {
    const ref = useRef(null);

    useGsap(ref, ({ gsap, reduce }) => {
        if (reduce) return;
        const panels = gsap.utils.toArray("[data-panel]", ref.current);
        panels.slice(0, -1).forEach((panel, i) => {
            const next = panels[i + 1];
            const inner = panel.querySelector("[data-panel-inner]");
            const dim = panel.querySelector("[data-panel-dim]");
            gsap.timeline({ scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true } })
                .to(inner, { scale: 0.9, yPercent: -4, ease: "none" }, 0)
                .to(dim, { opacity: 0.7, ease: "none" }, 0);
        });
    });

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
