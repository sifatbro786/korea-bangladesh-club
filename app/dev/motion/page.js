import { notFound } from "next/navigation";
import { getMedia } from "@/lib/content";
import MotionDemo from "./MotionDemo";

// Dev-only check for Lenis, anchor links, <Reveal> and lazy GSAP. 404 in production.
export const metadata = { title: "Motion preview", robots: { index: false } };

export default async function MotionPreviewPage() {
    if (process.env.NODE_ENV === "production") notFound();
    const image = await getMedia("dinner-roundtable-03");
    return <MotionDemo image={image} />;
}
