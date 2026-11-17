/**
 * The join between the Seoul and Dhaka panes: a dashed flight-path arc with the distance at its apex,
 * instead of a divider line. Desktop only. The arc is drawn by CSS on intro (`.hero-route-draw`);
 * two points travel it in opposite directions (SMIL, started by HeroIntro via `#route-go`, never under
 * reduced motion). Purely decorative.
 */
const ARC = "M8 118 Q200 -18 392 118";

function Traveller({ reverse, delay }) {
    return (
        <circle r="2.5" className="fill-accent" opacity="0">
            <animateMotion
                begin={`route-go.begin+${delay}s`}
                dur="9s"
                repeatCount="indefinite"
                calcMode="linear"
                keyPoints={reverse ? "1;0;0" : "0;1;1"}
                keyTimes="0;0.34;1"
            >
                <mpath href="#hero-route-path" />
            </animateMotion>
            <animate
                attributeName="opacity"
                begin={`route-go.begin+${delay}s`}
                dur="9s"
                repeatCount="indefinite"
                values="0;1;1;0;0"
                keyTimes="0;0.04;0.3;0.34;1"
            />
        </circle>
    );
}

export default function HeroRoute({ label }) {
    return (
        <div aria-hidden="true" className="hero-route pointer-events-none absolute left-1/2 top-[22%] hidden w-[30vw] max-w-[30rem] -translate-x-1/2 md:block">
            <svg viewBox="0 0 400 130" className="block w-full overflow-visible text-accent" fill="none">
                <defs>
                    <path id="hero-route-path" d={ARC} />
                    <mask id="hero-route-reveal" maskUnits="userSpaceOnUse" x="-20" y="-40" width="440" height="200">
                        <path d={ARC} className="hero-route-draw" pathLength="1" stroke="white" strokeWidth="8" />
                    </mask>
                </defs>
                <set id="route-go" attributeName="visibility" to="visible" begin="indefinite" />
                <g mask="url(#hero-route-reveal)">
                    <path d={ARC} stroke="currentColor" strokeOpacity="0.85" strokeDasharray="2 7" vectorEffect="non-scaling-stroke" />
                    <circle cx="8" cy="118" r="3.5" stroke="currentColor" vectorEffect="non-scaling-stroke" />
                    <circle cx="392" cy="118" r="3.5" stroke="currentColor" vectorEffect="non-scaling-stroke" />
                </g>
                <Traveller delay={1.9} />
                <Traveller reverse delay={6.4} />
            </svg>
            <span className="hero-fade absolute left-1/2 top-[8%] -translate-x-1/2 whitespace-nowrap text-sm font-medium text-heading [text-shadow:0_1px_10px_rgb(11_12_14/0.75)]" style={{ "--d": "1.4s" }}>
                {label}
            </span>
        </div>
    );
}
