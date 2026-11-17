"use client";

import { useRef } from "react";
import { useGsap } from "./useGsap";

/**
 * Infinite marquee that reacts to scroll: faster with scroll speed, reversing with
 * scroll direction. Uses ScrollTrigger.observe (scroll deltas/velocity), NOT a
 * position-based ScrollTrigger — so it keeps working when the page grows after load
 * (pins, images). Falls back to the CSS animation (.marquee-track) until GSAP loads.
 */
export default function Marquee({ className = "", children }) {
    const ref = useRef(null);

    useGsap(ref, ({ gsap, ScrollTrigger, reduce }) => {
        if (reduce) return;
        const track = ref.current;
        track.style.animation = "none";
        const loop = gsap.to(track, { xPercent: -50, duration: 48, ease: "none", repeat: -1 });
        loop.totalTime(loop.duration() * 200); // room to play backwards

        let direction = 1;
        const observer = ScrollTrigger.observe({
            target: window,
            type: "scroll,wheel,touch",
            onChangeY(self) {
                if (self.deltaY) direction = self.deltaY > 0 ? 1 : -1;
                const boost = 1 + Math.min(Math.abs(self.velocityY) / 220, 7);
                gsap.to(loop, {
                    timeScale: direction * boost,
                    duration: 0.25,
                    overwrite: true,
                    onComplete: () => gsap.to(loop, { timeScale: direction, duration: 1.4 }),
                });
            },
        });

        return () => {
            observer.kill();
            track.style.animation = "";
        };
    });

    return (
        <div ref={ref} className={`marquee-track ${className}`}>
            {children}
        </div>
    );
}
