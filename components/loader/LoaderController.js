"use client";

import { useEffect, useLayoutEffect } from "react";
import { markLoaderDone, prefersReducedMotion, setScrollLock } from "@/lib/motion/runtime";
import { LOADER_STORAGE_KEY, readLoaderState } from "./loaderScript";

const MIN_MS = 4200; // brief: 4–5s first-visit hold
const MAX_MS = 6500; // hard cap — a slow network never traps the visitor
const MIN_MS_REDUCED = 700;
const EXIT_MS = 1100; // keep in sync with .loader exit transition in globals.css
const PRELOAD_VIEWPORTS = 2.5; // warm images within this many screens from the top

const decodeOrWarm = (img) => {
    if (img.complete && img.naturalWidth > 0) return img.decode().catch(() => {});
    // Off-DOM copy with the same srcset/sizes: warms the cache without touching
    // the DOM (mutating <img> breaks hydration of segments still streaming).
    const warm = new Image();
    if (img.sizes) warm.sizes = img.sizes;
    if (img.srcset) warm.srcset = img.srcset;
    warm.src = img.currentSrc || img.src;
    return warm.decode().catch(() => {});
};

/*
 * Performance notes (Lighthouse, 2026-11-17):
 * - No per-frame JS: the progress hairline is a single CSS transition (data-progress).
 * - Images are warmed in two stages — first the ones on screen (incl. the LCP image),
 *   then the rest — so off-screen images never compete with the LCP download.
 */
export default function LoaderController() {
    // Dev only: Strict Mode's remount resets <html> attributes. Re-apply before paint.
    useLayoutEffect(() => {
        const html = document.documentElement;
        if (!html.hasAttribute("data-loader")) html.setAttribute("data-loader", readLoaderState());
    }, []);

    useEffect(() => {
        const html = document.documentElement;
        if (html.getAttribute("data-loader") !== "active") {
            markLoaderDone();
            return;
        }

        setScrollLock(true);
        const loader = document.querySelector(".loader");
        const reduced = prefersReducedMotion();
        const minMs = reduced ? MIN_MS_REDUCED : MIN_MS;
        let cancelled = false;
        let exitTimer = 0;

        loader?.style.setProperty("--loader-ms", `${minMs}ms`);
        loader?.setAttribute("data-progress", "run");

        const vh = window.innerHeight;
        const imgs = [...document.querySelectorAll("img")].filter((img) => !img.closest(".loader"));
        const tops = imgs.map((img) => img.getBoundingClientRect().top); // one layout read
        const onScreen = imgs.filter((_, i) => tops[i] < vh);
        const nearby = imgs.filter((_, i) => tops[i] >= vh && tops[i] < vh * PRELOAD_VIEWPORTS);

        const assets = Promise.all([document.fonts?.ready ?? Promise.resolve(), ...onScreen.map(decodeOrWarm)]).then(() =>
            Promise.all(nearby.map(decodeOrWarm)),
        );
        const minHold = new Promise((r) => setTimeout(r, minMs));
        const cap = new Promise((r) => setTimeout(r, MAX_MS));

        Promise.race([Promise.all([assets, minHold]), cap]).then(() => {
            if (cancelled) return;
            loader?.setAttribute("data-progress", "done");
            try {
                localStorage.setItem(LOADER_STORAGE_KEY, String(Date.now()));
            } catch {}
            html.setAttribute("data-loader", "leaving");
            setScrollLock(false);
            markLoaderDone();
            exitTimer = window.setTimeout(() => html.setAttribute("data-loader", "done"), reduced ? 0 : EXIT_MS);
        });

        return () => {
            cancelled = true;
            window.clearTimeout(exitTimer);
            setScrollLock(false);
        };
    }, []);

    return null;
}
