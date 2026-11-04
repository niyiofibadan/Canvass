import { Plus, Trash2 } from 'lucide-react'
import { BulletList } from '../BulletList'
import { EditableText } from '../EditableText'
import { ToolAdder } from '../tools/ToolAdder'
import { ToolGrid } from '../tools/ToolGrid'
import {
  addBlock,
  addSectionTool,
  removeBlock,
  removeSection,
  removeSectionTool,
  updateBlock,
  updateSection,
} from '../../store/mapOps'
import { useMapStore } from '../../store/useMapStore'
import type { Section } from '../../types'

export function PillarSection({ pillarId, section }: { pillarId: string; section: Section }) {
  const apply = useMapStore((s) => s.apply)
  const sid = section.id
  return (
    <div data-testid="section" className="rounded border border-canvas-line/70 bg-canvas-bg/40 p-2">
      <div className="mb-1 flex items-start justify-between gap-1">
        <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-300">
          <EditableText
            value={section.title}
            label={`section title ${section.title}`}
            onCommit={(v) => apply((m) => updateSection(m, pillarId, sid, { title: v }))}
          />
        </h4>
        <button
          type="button"
          aria-label={`Remove section ${section.title}`}
          onClick={() => apply((m) => removeSection(m, pillarId, sid))}
          className="text-zinc-600 hover:text-red-400"
        >
          <Trash2 size={12} />
        </button>
      </div>
      <div className="space-y-2">
        {section.blocks.map((b) => (
          <div key={b.id}>
            <div className="flex items-start justify-between gap-1 text-xs font-semibold text-zinc-200">
              <EditableText
                value={b.heading}
                label={`block heading ${b.heading}`}
                onCommit={(v) => apply((m) => updateBlock(m, pillarId, sid, b.id, { heading: v }))}
              />
              <button
                type="button"
                aria-label={`Remove block ${b.heading}`}
                onClick={() => apply((m) => removeBlock(m, pillarId, sid, b.id))}
                className="text-zinc-600 hover:text-red-400"
              >
                <Trash2 size={11} />
              </button>
            </div>
            <BulletList
              label={`${section.title} ${b.heading}`}
              bullets={b.bullets}
              onChange={(bullets) => apply((m) => updateBlock(m, pillarId, sid, b.id, { bullets }))}
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        aria-label={`Add block to ${section.title}`}
        onClick={() => apply((m) => addBlock(m, pillarId, sid))}
        className="mt-1 flex items-center gap-1 font-mono text-[10px] uppercase text-zinc-500 hover:text-canvas-accent"
      >
        <Plus size={10} /> Block
      </button>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <ToolGrid
          toolIds={section.toolIds}
          onRemove={(t) => apply((m) => removeSectionTool(m, pillarId, sid, t))}
        />
        <ToolAdder
          label={section.title}
          selected={section.toolIds}
          onAdd={(t) => apply((m) => addSectionTool(m, pillarId, sid, t))}
          onRemove={(t) => apply((m) => removeSectionTool(m, pillarId, sid, t))}
        />
      </div>
    </div>
  )
}
