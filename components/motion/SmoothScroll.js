"use client";

import { useEffect } from "react";
import { destroyLenis, startLenis } from "@/lib/motion/runtime";

/**
 * Mounted once in the root layout. Starts Lenis and marks the document as
 * motion-ready (which switches off the CSS reveal failsafe).
 * Follows the OS reduced-motion setting live.
 */
export default function SmoothScroll() {
    useEffect(() => {
        document.documentElement.classList.add("motion-ready");

        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const sync = () => (mq.matches ? destroyLenis() : startLenis());

        sync();
        mq.addEventListener("change", sync);

        return () => {
            mq.removeEventListener("change", sync);
            destroyLenis();
        };
    }, []);

    return null;
}
