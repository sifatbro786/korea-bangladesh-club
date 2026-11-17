"use client";

import { useRef } from "react";
import { useGsap } from "@/components/motion/useGsap";

/**
 * Desktop + motion: the section pins and the track scrolls horizontally with the page.
 * Mobile / reduced motion: a native, swipeable scroll-snap row (no GSAP work at all).
 */
export default function MomentsTrack({ children, header }) {
    const scope = useRef(null);

    useGsap(
        scope,
        ({ gsap, reduce, conditions }) => {
            if (reduce || !conditions.desktop) return;
            const section = scope.current;
            const track = section.querySelector("[data-track]");
            const distance = () => track.scrollWidth - track.clientWidth;

            gsap.set(track, { overflow: "visible" });
            gsap.to(track, {
                x: () => -distance(),
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${distance()}`,
                    pin: true,
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                },
            });
        },
        { desktop: "(min-width: 1024px)" },
    );

    return (
        <div ref={scope} className="flex min-h-[100svh] flex-col justify-center py-24">
            {header}
            <div
                data-track
                role="region"
                aria-label="Moments — scroll sideways to see more photographs"
                tabIndex={0}
                className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-[clamp(1.25rem,4vw,3.5rem)] pb-4 [scrollbar-width:none] md:gap-10 [&::-webkit-scrollbar]:hidden"
            >
                {children}
            </div>
        </div>
    );
}
