"use client";

import { useRef } from "react";
import ClubImage from "@/components/media/ClubImage";
import Reveal from "@/components/motion/Reveal";
import { useGsap } from "@/components/motion/useGsap";

export default function MotionDemo({ image }) {
    const scope = useRef(null);

    useGsap(scope, ({ gsap, reduce }) => {
        if (reduce) return;
        gsap.fromTo(
            "[data-demo-line]",
            { scaleX: 0 },
            {
                scaleX: 1,
                ease: "none",
                scrollTrigger: { trigger: "[data-demo-line]", start: "top 85%", end: "top 35%", scrub: true },
            },
        );
        gsap.fromTo(
            "[data-demo-parallax] img",
            { yPercent: -8 },
            {
                yPercent: 8,
                ease: "none",
                scrollTrigger: { trigger: "[data-demo-parallax]", start: "top bottom", end: "bottom top", scrub: true },
            },
        );
    });

    return (
        <main ref={scope} className="mx-auto w-full max-w-5xl px-6 py-16">
            <p className="text-label uppercase tracking-label text-accent">Dev · Motion</p>
            <h1 className="mt-4 text-display-md">Motion foundation</h1>
            <nav className="mt-8 flex gap-8 text-sm">
                <a className="text-heading underline decoration-line underline-offset-8 hover:decoration-accent" href="#reveal">Reveal</a>
                <a className="text-heading underline decoration-line underline-offset-8 hover:decoration-accent" href="#gsap">GSAP scrub</a>
            </nav>

            <section id="reveal" className="mt-[60vh] space-y-24">
                {["Business", "Culture", "Community"].map((word, i) => (
                    <Reveal key={word} delay={i * 80}>
                        <h2 className="text-display-sm">{word}</h2>
                        <p className="mt-3 max-w-[52ch]">
                            Library-free reveal: CSS transition, one shared IntersectionObserver.
                        </p>
                    </Reveal>
                ))}
            </section>

            <section id="gsap" className="mt-[60vh]">
                <p className="text-label uppercase tracking-label text-muted">GSAP (lazy-loaded) + Lenis on one ticker</p>
                <div data-demo-line className="mt-6 h-px origin-left bg-accent" />
                <div data-demo-parallax className="mt-16 aspect-[16/9] overflow-hidden">
                    <ClubImage media={image} sizes="(min-width: 1024px) 64rem, 100vw" imgClassName="scale-[1.18]" />
                </div>
            </section>

            <div className="h-[80vh]" />
        </main>
    );
}
