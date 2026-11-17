/** Canonical origin. Set SITE_URL in the deployment environment (e.g. https://kbbcc.org). */
export const SITE_URL = (process.env.SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

/** @param {string} path */
export const absoluteUrl = (path = "/") => new URL(path, `${SITE_URL}/`).toString();
