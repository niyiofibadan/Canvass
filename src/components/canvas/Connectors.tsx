interface Props {
  from: { x: number; y: number }
  targets: { x: number; y: number }[]
  width: number
  height: number
}

/** Orthogonal elbow lines with arrowheads from the company node down to each pillar. */
export function Connectors({ from, targets, width, height }: Props) {
  return (
    <svg className="pointer-events-none absolute left-0 top-0" width={width} height={height}>
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="#7c9cff" />
        </marker>
      </defs>
      {targets.map((t, i) => {
        const midY = (from.y + t.y) / 2
        return (
          <path
            key={i}
            d={`M${from.x},${from.y} V${midY} H${t.x} V${t.y}`}
            fill="none"
            stroke="#7c9cff"
            strokeWidth={1.5}
            markerEnd="url(#arrow)"
          />
        )
      })}
    </svg>
  )
}
