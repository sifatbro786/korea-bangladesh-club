import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Default social share image (pages can override with their own image).
export const alt = "KBBCC — Korea Bangladesh Business & Cultural Club";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Read once at module load (as in the Next docs) so the image is generated at build time.
const logo = await readFile(join(process.cwd(), "public/images/brand/logo.png"));
const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 56,
                    padding: "0 80px",
                    background: "radial-gradient(ellipse 70% 80% at 18% 70%, rgba(198,168,124,0.09), #0B0C0E 72%)",
                    color: "#F4F1EA",
                }}
            >
                <img src={logoSrc} width={240} height={240} alt="" />
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: 24, letterSpacing: 8, color: "#C6A87C", textTransform: "uppercase" }}>
                        A private members’ club in Dhaka
                    </div>
                    <div style={{ marginTop: 24, fontSize: 60, lineHeight: 1.08 }}>Korea Bangladesh</div>
                    <div style={{ fontSize: 60, lineHeight: 1.08 }}>Business &amp; Cultural Club</div>
                    <div style={{ marginTop: 28, width: 120, height: 1, background: "rgba(198,168,124,0.6)" }} />
                </div>
            </div>
        ),
        size,
    );
}
