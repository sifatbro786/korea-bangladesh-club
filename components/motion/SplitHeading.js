"use client";

import { useRef } from "react";
import { useGsap } from "./useGsap";

/**
 * Heading whose lines rise out of masks when scrolled into view (GSAP SplitText, lazy).
 * Server HTML is the plain heading, so no-JS / reduced motion / slow chunk = readable text.
 * Do not use for the page's LCP heading (h1 in the first viewport).
 */
export default function SplitHeading({ as: Tag = "h2", id, className = "", children }) {
    const ref = useRef(null);

    useGsap(
        ref,
        ({ gsap, SplitText, reduce }) => {
            if (reduce || !SplitText) return;
            const split = SplitText.create(ref.current, {
                type: "lines",
                mask: "lines",
                autoSplit: true,
                onSplit: (self) =>
                    gsap.from(self.lines, {
                        yPercent: 115,
                        duration: 1.25,
                        ease: "expo.out",
                        stagger: 0.09,
                        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
                    }),
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
