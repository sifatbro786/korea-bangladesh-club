"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { setScrollLock } from "@/lib/motion/runtime";
import Arrow from "@/components/ui/Arrow";

const SOLID_AFTER = 24; // px scrolled before the header gets a background
const HIDE_AFTER = 480; // px scrolled before hide-on-scroll-down kicks in
const DIRECTION_PX = 12; // continuous px in one direction before hiding/showing

function Wordmark({ logo, compact }) {
    return (
        <Link href="/" className="group flex items-center gap-4">
            {logo ? (
                <Image
                    src={logo.src}
                    alt=""
                    width={48}
                    height={48}
                    sizes="48px"
                    loading="eager"
                    className={`h-auto shrink-0 transition-[width] duration-500 ease-club ${compact ? "w-10" : "w-12"}`}
                />
            ) : null}
            <span className="font-display text-[1.75rem] leading-none tracking-[0.18em] text-heading">KBBCC</span>
            <span aria-hidden="true" className="hidden h-7 w-px bg-line xl:block" />
            <span className="hidden max-w-[13rem] text-[0.625rem] uppercase leading-snug tracking-[0.2em] text-muted xl:block">
                Korea Bangladesh Business &amp; Cultural Club
            </span>
            <span className="sr-only">, home</span>
        </Link>
    );
}

export default function HeaderClient({ items, cta, logo }) {
    const pathname = usePathname();
    const [solid, setSolid] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    // Scroll state: solid background + hide on scroll down, show on scroll up.
    // Direction uses hysteresis: smooth scroll (Lenis) eases out with 0–1px steps, and a
    // plain `y > lastY` check flipped hidden/visible on those frames (header "dropped" briefly).
    // Now the header only changes after DIRECTION_PX of continuous movement; a 0px frame
    // never changes state.
    useEffect(() => {
        let lastY = window.scrollY;
        let travel = 0; // signed px moved in the current direction
        let ticking = false;
        const update = () => {
            const y = window.scrollY;
            const delta = y - lastY;
            lastY = y;
            setSolid(y > SOLID_AFTER);

            if (y <= HIDE_AFTER) {
                travel = 0;
                setHidden(false);
            } else if (delta !== 0) {
                travel = Math.sign(delta) === Math.sign(travel) ? travel + delta : delta;
                if (travel > DIRECTION_PX) setHidden(true);
                else if (travel < -DIRECTION_PX) setHidden(false);
            }
            ticking = false;
        };
        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        };
        const first = requestAnimationFrame(update); // initial state (e.g. reload mid-page)
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            cancelAnimationFrame(first);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    // Mobile menu: lock scroll, Escape to close, move focus in and back out.
    useEffect(() => {
        if (!open) return;
        const html = document.documentElement;
        const trigger = buttonRef.current;
        html.classList.add("menu-open");
        setScrollLock(true);
        menuRef.current?.querySelector("a")?.focus();

        const onKey = (e) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("keydown", onKey);
            html.classList.remove("menu-open");
            setScrollLock(false);
            trigger?.focus();
        };
    }, [open]);

    const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);

    return (
        <>
            <header
                data-hidden={hidden && !open ? "true" : "false"}
                className={`site-header fixed inset-x-0 top-0 z-50 border-b ${
                    solid ? "h-16 border-line bg-bg/92" : "h-20 border-transparent bg-transparent"
                }`}
            >
                <div className="container-club flex h-full items-center justify-between gap-8">
                    <Wordmark logo={logo} compact={solid} />

                    <nav aria-label="Primary" className="hidden lg:block">
                        <ul className="flex items-center gap-9">
                            {items.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        aria-current={isActive(item.href) ? "page" : undefined}
                                        className={`text-[0.75rem] uppercase tracking-[0.2em] transition-colors duration-300 hover:text-accent ${
                                            isActive(item.href) ? "text-accent" : "text-heading/80"
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="flex items-center gap-6">
                        <Link
                            href={cta.href}
                            className="group hidden items-center gap-2 text-[0.75rem] uppercase tracking-[0.2em] text-accent sm:inline-flex"
                        >
                            <span className="link-line">{cta.label}</span>
                            <Arrow className="group-hover:translate-x-1" />
                        </Link>

                        <button
                            ref={buttonRef}
                            type="button"
                            onClick={() => setOpen((v) => !v)}
                            aria-expanded={open}
                            aria-controls="mobile-menu"
                            className="flex items-center gap-3 py-2 text-[0.75rem] uppercase tracking-[0.2em] text-heading lg:hidden"
                        >
                            <span>{open ? "Close" : "Menu"}</span>
                            <span aria-hidden="true" className="flex w-6 flex-col gap-[5px]">
                                <span className={`h-px w-full bg-current transition-transform duration-500 ease-club ${open ? "translate-y-[3px] rotate-45" : ""}`} />
                                <span className={`h-px w-full bg-current transition-transform duration-500 ease-club ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            <div
                id="mobile-menu"
                ref={menuRef}
                role="dialog"
                aria-modal="true"
                aria-label="Menu"
                data-open={open ? "true" : "false"}
                className="mobile-menu grain fixed inset-0 z-40 flex flex-col bg-bg pt-28 lg:hidden"
            >
                <nav aria-label="Mobile" className="container-club flex-1">
                    <ol className="border-t border-line">
                        {items.map((item, i) => (
                            <li key={item.href} className="border-b border-line">
                                <Link
                                    href={item.href}
                                    tabIndex={open ? 0 : -1}
                                    onClick={() => setOpen(false)}
                                    className="flex items-baseline justify-between py-5 text-heading transition-colors hover:text-accent"
                                >
                                    <span className="font-display text-display-sm">{item.label}</span>
                                    <span className="text-label tracking-label text-muted">0{i + 1}</span>
                                </Link>
                            </li>
                        ))}
                    </ol>
                    <Link
                        href={cta.href}
                        tabIndex={open ? 0 : -1}
                        onClick={() => setOpen(false)}
                        className="group mt-10 inline-flex items-center gap-3 text-sm uppercase tracking-[0.18em] text-accent"
                    >
                        <span className="link-line">{cta.label}</span>
                        <Arrow className="group-hover:translate-x-1" />
                    </Link>
                </nav>
                <p className="container-club pb-8 text-label uppercase tracking-label text-muted">
                    Uttar Badda, Dhaka
                </p>
            </div>
        </>
    );
}
