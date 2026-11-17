"use client";

import { useRef } from "react";
import { useGsap } from "./useGsap";

/**
 * Words brighten one by one as the reader scrolls through the block (scroll-scrubbed).
 * Text is fully readable without JS; the dim state only exists while GSAP drives it.
 */
export default function ScrubText({ as: Tag = "h2", id, className = "", children }) {
    const ref = useRef(null);

    useGsap(
        ref,
        ({ gsap, SplitText, reduce }) => {
            if (reduce || !SplitText) return;
            const split = SplitText.create(ref.current, {
                type: "words",
                autoSplit: true,
                onSplit: (self) =>
                    gsap.fromTo(
                        self.words,
                        { opacity: 0.16 },
                        {
                            opacity: 1,
                            ease: "none",
                            stagger: 0.08,
                            scrollTrigger: { trigger: ref.current, start: "top 82%", end: "bottom 42%", scrub: true },
                        },
                    ),
            });
            return () => split.revert();
        },
        undefined,
        { split: true },
    );

    return (
        <Tag ref={ref} id={id} className={className}>
            {children}
        </Tag>
    );
}
