"use client";

import { useEffect } from "react";
import { markLoaderDone, prefersReducedMotion, setScrollLock } from "@/lib/motion/runtime";
import { LOADER_STORAGE_KEY } from "./loaderScript";

const MIN_MS = 4200; // brief: 4–5s first-visit hold
const MAX_MS = 6500; // hard cap — a slow network never traps the visitor
const MIN_MS_REDUCED = 700;
const EXIT_MS = 1100; // keep in sync with .loader exit transition in globals.css
const PRELOAD_VIEWPORTS = 2.5; // warm images within this many screens from the top

function waitForImages() {
    const limit = window.innerHeight * PRELOAD_VIEWPORTS;
    const images = [...document.querySelectorAll("img")].filter(
        (img) => !img.closest(".loader") && img.getBoundingClientRect().top < limit,
    );
    // next/image lazy-loads below the fold. Instead of touching the DOM (which would break
    // hydration of segments that are still streaming), warm the browser cache with an
    // off-DOM copy using the same srcset/sizes, so the browser picks the same candidate.
    return images.map((img) => {
        if (img.complete && img.naturalWidth > 0) return img.decode().catch(() => {});
        const warm = new Image();
        if (img.sizes) warm.sizes = img.sizes;
        if (img.srcset) warm.srcset = img.srcset;
        warm.src = img.currentSrc || img.src;
        return warm.decode().catch(() => {});
    });
}

export default function LoaderController() {
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
        const start = performance.now();

        let assetsDone = false;
        let loaded = 0;
        const tasks = [document.fonts?.ready ?? Promise.resolve(), ...waitForImages()];
        const total = tasks.length;
        for (const task of tasks) task.then(() => (loaded += 1));
        Promise.all(tasks).then(() => (assetsDone = true));

        let raf = 0;
        let exitTimer = 0;
        let finished = false;

        const finish = () => {
            if (finished) return;
            finished = true;
            loader?.style.setProperty("--p", "1");
            try {
                localStorage.setItem(LOADER_STORAGE_KEY, String(Date.now()));
            } catch {}
            html.setAttribute("data-loader", "leaving");
            setScrollLock(false);
            markLoaderDone();
            exitTimer = window.setTimeout(
                () => html.setAttribute("data-loader", "done"),
                reduced ? 0 : EXIT_MS,
            );
        };

        const tick = () => {
            const elapsed = performance.now() - start;
            // Progress never runs ahead of either time or assets.
            const p = Math.min(elapsed / minMs, (loaded + 1) / (total + 1), 1);
            loader?.style.setProperty("--p", p.toFixed(3));

            if ((elapsed >= minMs && assetsDone) || elapsed >= MAX_MS) {
                finish();
                return;
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(raf);
            window.clearTimeout(exitTimer);
            setScrollLock(false);
        };
    }, []);

    return null;
}
