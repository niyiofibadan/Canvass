import { useState } from 'react'
import { searchTools } from '../../data/tools'
import type { ToolCategoryId } from '../../types'
import { ToolIcon } from './ToolIcon'

interface Props {
  category?: ToolCategoryId
  onPick: (toolId: string) => void
}

export function ToolPicker({ category, onPick }: Props) {
  const [q, setQ] = useState('')
  const results = searchTools(q, category).slice(0, 60)
  return (
    <div className="w-64 rounded border border-canvas-line bg-canvas-panel p-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search tools..."
        aria-label="Search tools"
        className="mb-2 w-full rounded bg-canvas-bg px-2 py-1 font-mono text-xs text-zinc-200"
      />
      <div className="flex max-h-48 flex-wrap gap-1.5 overflow-auto">
        {results.map((t) => (
          <span key={t.id} onDoubleClick={() => onPick(t.id)} title="Double-click to add">
            <ToolIcon tool={t} />
          </span>
        ))}
      </div>
    </div>
  )
}
