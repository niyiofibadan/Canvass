import { useEffect, useRef, useState } from 'react'

interface Props {
  value: string
  onCommit: (value: string) => void
  label: string
  multiline?: boolean
  className?: string
}

/** Click (or Enter on focus) to edit. Enter/blur commits, Escape cancels. */
export function EditableText({ value, onCommit, label, multiline, className = '' }: Props) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const ref = useRef<HTMLInputElement & HTMLTextAreaElement>(null)

  useEffect(() => {
    if (editing) ref.current?.select()
  }, [editing])

  const start = () => {
    setDraft(value)
    setEditing(true)
  }
  const commit = () => {
    setEditing(false)
    if (draft !== value) onCommit(draft)
  }

  if (!editing) {
    return (
      <span
        role="button"
        tabIndex={0}
        aria-label={`Edit ${label}`}
        onClick={start}
        onKeyDown={(e) => {
          if (e.key === 'Enter') start()
        }}
        className={`cursor-text rounded px-0.5 hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-canvas-accent ${className}`}
      >
        {value || <span className="text-zinc-600">Empty</span>}
      </span>
    )
  }

  const common = {
    ref,
    value: draft,
    'aria-label': label,
    autoFocus: true,
    onChange: (e: { target: { value: string } }) => setDraft(e.target.value),
    onBlur: commit,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setEditing(false)
      } else if (e.key === 'Enter' && !(multiline && e.shiftKey)) {
        e.preventDefault()
        commit()
      }
    },
    className: `w-full rounded border border-canvas-accent bg-canvas-bg px-1 text-inherit outline-none ${className}`,
  }
  return multiline ? <textarea rows={3} {...common} /> : <input {...common} />
}
