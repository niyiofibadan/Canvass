import { Plus } from 'lucide-react'
import { EditableText } from '../EditableText'
import { PillarSection } from './PillarSection'
import { addSection, updatePillar } from '../../store/mapOps'
import { useMapStore } from '../../store/useMapStore'
import type { Pillar as PillarT } from '../../types'

export function Pillar({ pillar }: { pillar: PillarT }) {
  const apply = useMapStore((s) => s.apply)
  return (
    <section
      data-testid="pillar"
      className="w-[232px] shrink-0 space-y-2 rounded border border-canvas-line bg-canvas-panel p-3"
    >
      <h3 className="flex gap-1 font-mono text-xs font-bold uppercase tracking-widest text-zinc-100">
        <span>{pillar.number}.</span>
        <EditableText
          value={pillar.title}
          label={`pillar ${pillar.number} title`}
          onCommit={(v) => apply((m) => updatePillar(m, pillar.id, { title: v }))}
        />
      </h3>
      <div className="rounded border border-canvas-accent/40 p-2 text-xs text-zinc-400">
        <div className="mb-1 font-mono text-[10px] uppercase text-zinc-600">Objective</div>
        <EditableText
          multiline
          value={pillar.objective}
          label={`pillar ${pillar.number} objective`}
          onCommit={(v) => apply((m) => updatePillar(m, pillar.id, { objective: v }))}
        />
      </div>
      {pillar.sections.map((s) => (
        <PillarSection key={s.id} pillarId={pillar.id} section={s} />
      ))}
      <button
        type="button"
        aria-label={`Add section to ${pillar.title}`}
        onClick={() => apply((m) => addSection(m, pillar.id))}
        className="flex items-center gap-1 font-mono text-[10px] uppercase text-zinc-500 hover:text-canvas-accent"
      >
        <Plus size={10} /> Section
      </button>
    </section>
  )
}
