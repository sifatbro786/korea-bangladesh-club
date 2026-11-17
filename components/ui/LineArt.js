/**
 * Decorative hairline line-art (identity layer). Position it with `className`
 * (absolute + size + opacity). Strokes stay 1px at any size.
 *  - "ring":    concentric rings + tick marks, after the ring of the club emblem
 *  - "lattice": changhoji window lattice (nested frames, grid, central lozenge)
 */
export default function LineArt({ variant = "ring", className = "" }) {
    const common = {
        "aria-hidden": true,
        focusable: "false",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1,
        vectorEffect: "non-scaling-stroke",
        className: `pointer-events-none ${className}`,
    };

    if (variant === "lattice") {
        const grid = [];
        for (let i = 1; i < 8; i++) {
            const p = 40 + i * 40;
            grid.push(<line key={`v${i}`} x1={p} y1="40" x2={p} y2="360" vectorEffect="non-scaling-stroke" />);
            grid.push(<line key={`h${i}`} x1="40" y1={p} x2="360" y2={p} vectorEffect="non-scaling-stroke" />);
        }
        return (
            <svg viewBox="0 0 400 400" {...common}>
                <rect x="1" y="1" width="398" height="398" vectorEffect="non-scaling-stroke" />
                <rect x="20" y="20" width="360" height="360" vectorEffect="non-scaling-stroke" />
                <rect x="40" y="40" width="320" height="320" vectorEffect="non-scaling-stroke" />
                {grid}
                <path d="M200 120 280 200 200 280 120 200Z" vectorEffect="non-scaling-stroke" />
                <path d="M200 150 250 200 200 250 150 200Z" vectorEffect="non-scaling-stroke" />
                {[
                    [20, 20],
                    [380, 20],
                    [20, 380],
                    [380, 380],
                ].map(([x, y]) => (
                    <rect key={`${x}-${y}`} x={x - 8} y={y - 8} width="16" height="16" vectorEffect="non-scaling-stroke" />
                ))}
            </svg>
        );
    }

    const ticks = [];
    for (let i = 0; i < 72; i++) {
        const a = (i / 72) * Math.PI * 2;
        const r1 = i % 6 === 0 ? 168 : 174;
        ticks.push(
            <line
                key={i}
                x1={(200 + Math.cos(a) * r1).toFixed(2)}
                y1={(200 + Math.sin(a) * r1).toFixed(2)}
                x2={(200 + Math.cos(a) * 182).toFixed(2)}
                y2={(200 + Math.sin(a) * 182).toFixed(2)}
                vectorEffect="non-scaling-stroke"
            />,
        );
    }
    return (
        <svg viewBox="0 0 400 400" {...common}>
            <circle cx="200" cy="200" r="198" vectorEffect="non-scaling-stroke" />
            <circle cx="200" cy="200" r="186" vectorEffect="non-scaling-stroke" />
            {ticks}
            <circle cx="200" cy="200" r="140" vectorEffect="non-scaling-stroke" />
            <circle cx="200" cy="200" r="70" vectorEffect="non-scaling-stroke" />
            <line x1="0" y1="200" x2="400" y2="200" vectorEffect="non-scaling-stroke" />
            <line x1="200" y1="0" x2="200" y2="400" vectorEffect="non-scaling-stroke" />
        </svg>
    );
}
