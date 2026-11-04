import type { Frame as FrameT } from '../../types'

export function Frame({ frame }: { frame: FrameT }) {
  return (
    <section className="w-80 rounded border border-canvas-line bg-canvas-panel p-4">
      <h2 className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-zinc-300">
        {String(frame.number).padStart(2, '0')} {frame.title}
      </h2>
      <ul className="list-disc pl-4 text-sm text-zinc-400">
        {frame.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </section>
  )
}
