import type { LibraryGroup as Group } from '../../types'
import { useMapStore } from '../../store/useMapStore'
import { addLibraryTool, removeLibraryTool } from '../../store/mapOps'
import { ToolAdder } from './ToolAdder'
import { ToolGrid } from './ToolGrid'

export function LibraryGroup({ group }: { group: Group }) {
  const apply = useMapStore((s) => s.apply)
  return (
    <section
      data-testid="library-group"
      aria-label={group.title}
      className="w-72 rounded border border-canvas-line bg-canvas-panel p-3"
    >
      <h3 className="mb-2 font-mono text-[11px] font-bold uppercase tracking-widest text-zinc-300">
        {group.title}
      </h3>
      <div className="flex flex-wrap gap-1.5">
        <ToolGrid
          toolIds={group.toolIds}
          onRemove={(t) => apply((m) => removeLibraryTool(m, group.id, t))}
        />
        <ToolAdder
          label={group.title}
          category={group.id}
          selected={group.toolIds}
          onAdd={(t) => apply((m) => addLibraryTool(m, group.id, t))}
          onRemove={(t) => apply((m) => removeLibraryTool(m, group.id, t))}
        />
      </div>
    </section>
  )
}
