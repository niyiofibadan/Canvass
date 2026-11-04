import type { Pillar } from '../../types'

export function PillarHeader({ pillar }: { pillar: Pillar }) {
  return (
    <section
      data-testid="pillar"
      className="w-56 rounded border border-canvas-line bg-canvas-panel p-3"
    >
      <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-200">
        {pillar.number}. {pillar.title}
      </h3>
      <p className="mt-2 text-xs text-zinc-500">{pillar.objective}</p>
    </section>
  )
}
