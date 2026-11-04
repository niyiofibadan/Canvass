import { Plus, X } from 'lucide-react'
import { EditableText } from './EditableText'

interface Props {
  bullets: string[]
  onChange: (bullets: string[]) => void
  label: string
}

export function BulletList({ bullets, onChange, label }: Props) {
  return (
    <div>
      <ul className="list-disc space-y-0.5 pl-4 text-sm text-zinc-400">
        {bullets.map((b, i) => (
          <li key={i} className="group">
            <span className="flex items-start gap-1">
              <EditableText
                value={b}
                label={`${label} bullet ${i + 1}`}
                className="flex-1"
                onCommit={(v) => onChange(bullets.map((x, j) => (j === i ? v : x)))}
              />
              <button
                type="button"
                aria-label={`Remove ${label} bullet ${i + 1}`}
                onClick={() => onChange(bullets.filter((_, j) => j !== i))}
                className="text-zinc-600 opacity-0 hover:text-red-400 focus:opacity-100 group-hover:opacity-100"
              >
                <X size={12} />
              </button>
            </span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        aria-label={`Add ${label} bullet`}
        onClick={() => onChange([...bullets, 'Describe...'])}
        className="mt-1 flex items-center gap-1 font-mono text-[10px] uppercase text-zinc-500 hover:text-canvas-accent"
      >
        <Plus size={10} /> Add
      </button>
    </div>
  )
}
