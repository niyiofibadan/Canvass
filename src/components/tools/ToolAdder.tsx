import { Plus } from 'lucide-react'
import { useState } from 'react'
import type { ToolCategoryId } from '../../types'
import { ToolPicker } from './ToolPicker'

interface Props {
  label: string
  category?: ToolCategoryId | ''
  selected: string[]
  onAdd: (toolId: string) => void
  onRemove: (toolId: string) => void
}

export function ToolAdder({ label, category, selected, onAdd, onRemove }: Props) {
  const [open, setOpen] = useState(false)
  return (
    <span className="relative inline-block">
      <button
        type="button"
        aria-label={`Add tool to ${label}`}
        onClick={() => setOpen((o) => !o)}
        className="flex h-8 w-8 items-center justify-center rounded border border-dashed border-canvas-line text-zinc-500 hover:border-canvas-accent hover:text-canvas-accent"
      >
        <Plus size={14} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1">
          <ToolPicker
            category={category}
            selected={selected}
            onAdd={onAdd}
            onRemove={onRemove}
            onClose={() => setOpen(false)}
          />
        </div>
      )}
    </span>
  )
}
