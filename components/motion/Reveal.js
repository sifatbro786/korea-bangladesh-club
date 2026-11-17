"use client";

import { useEffect, useRef } from "react";

// One IntersectionObserver shared by every <Reveal> on the page.
let observer = null;

function getObserver() {
    if (!observer) {
        observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        entry.target.setAttribute("data-revealed", "");
                        observer.unobserve(entry.target);
                    }
                }
            },
            { rootMargin: "0px 0px -12% 0px" },
        );
    }
    return observer;
}

/**
 * Library-free scroll reveal (CSS transition + IntersectionObserver).
 * Styles live in globals.css under [data-reveal].
 * variant="clip": image curtain (clip-path from the bottom + slow zoom-out) instead of fade-up.
 *
 * Never wrap the LCP element (hero heading / hero image) — hidden content
 * delays Largest Contentful Paint.
 */
export default function Reveal({ as: Tag = "div", variant, delay = 0, className, style, children, ...rest }) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = getObserver();
        io.observe(el);
        return () => io.unobserve(el);
    }, []);

    return (
        <Tag
            ref={ref}
            data-reveal={variant ?? ""}
            className={className}
            style={delay ? { ...style, "--reveal-delay": `${delay}ms` } : style}
            {...rest}
        >
            {children}
        </Tag>
    );
}
