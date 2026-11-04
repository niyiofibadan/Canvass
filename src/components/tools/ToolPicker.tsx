import { useState } from 'react'
import { CATEGORY_LABELS, searchTools } from '../../data/tools'
import type { ToolCategoryId } from '../../types'
import { ToolIcon } from './ToolIcon'

interface Props {
  /** Initial category filter ('' = all). */
  category?: ToolCategoryId | ''
  selected: string[]
  onAdd: (toolId: string) => void
  onRemove: (toolId: string) => void
  onClose?: () => void
}

const LIMIT = 50

export function ToolPicker({ category = '', selected, onAdd, onRemove, onClose }: Props) {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState<ToolCategoryId | ''>(category)
  const all = searchTools(q, cat || undefined)
  const results = all.slice(0, LIMIT)

  return (
    <div
      data-no-zoom="true"
      role="dialog"
      aria-label="Tool picker"
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose?.()
      }}
      className="w-72 rounded border border-canvas-line bg-canvas-panel p-2 shadow-xl"
    >
      <input
        autoFocus
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search tools..."
        aria-label="Search tools"
        className="mb-2 w-full rounded bg-canvas-bg px-2 py-1 font-mono text-xs text-zinc-200"
      />
      <select
        value={cat}
        onChange={(e) => setCat(e.target.value as ToolCategoryId | '')}
        aria-label="Filter by category"
        className="mb-2 w-full rounded bg-canvas-bg px-2 py-1 font-mono text-xs text-zinc-300"
      >
        <option value="">All categories</option>
        {(Object.keys(CATEGORY_LABELS) as ToolCategoryId[]).map((id) => (
          <option key={id} value={id}>
            {CATEGORY_LABELS[id]}
          </option>
        ))}
      </select>
      <ul className="max-h-56 space-y-1 overflow-auto">
        {results.map((t) => {
          const isSel = selected.includes(t.id)
          return (
            <li key={t.id} className="flex items-center gap-2 text-xs text-zinc-300">
              <ToolIcon tool={t} />
              <span className="flex-1 truncate">{t.name}</span>
              <button
                type="button"
                aria-label={`${isSel ? 'Remove' : 'Add'} ${t.name}`}
                onClick={() => (isSel ? onRemove(t.id) : onAdd(t.id))}
                className={`rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase ${
                  isSel ? 'border-red-400/50 text-red-400' : 'border-canvas-line text-canvas-accent'
                }`}
              >
                {isSel ? 'Remove' : 'Add'}
              </button>
            </li>
          )
        })}
        {results.length === 0 && <li className="text-xs text-zinc-500">No tools found</li>}
      </ul>
      <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-zinc-500">
        <span>
          {results.length} of {all.length}
        </span>
        {onClose && (
          <button type="button" onClick={onClose} className="uppercase hover:text-zinc-300">
            Close
          </button>
        )}
      </div>
    </div>
  )
}
