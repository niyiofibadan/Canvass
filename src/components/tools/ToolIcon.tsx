import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { initials } from '../../data/tools'
import type { Tool } from '../../types'

const CLOSE_DELAY_MS = 150

interface Props {
  tool: Tool
  onRemove?: () => void
}

/**
 * Tool logo (or initials fallback) with an accessible hover/focus popover showing the
 * tool name and a link to its official website. The popover shares one hover zone with
 * the icon, and closing is delayed slightly so the pointer can travel onto the link.
 */
export function ToolIcon({ tool, onRemove }: Props) {
  const [open, setOpen] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const popId = useId()

  const clear = () => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = null
  }
  const show = useCallback(() => {
    clear()
    setOpen(true)
  }, [])
  const hideSoon = useCallback(() => {
    clear()
    timer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS)
  }, [])
  useEffect(() => clear, [])

  return (
    <span
      className="relative inline-block"
      onMouseEnter={show}
      onMouseLeave={hideSoon}
      onFocus={show}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) hideSoon()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          clear()
          setOpen(false)
        }
      }}
    >
      <button
        type="button"
        aria-label={tool.name}
        aria-describedby={open ? popId : undefined}
        className="flex h-8 w-8 items-center justify-center overflow-hidden rounded bg-canvas-line font-mono text-[10px] font-bold text-zinc-200 hover:ring-1 hover:ring-canvas-accent focus:outline-none focus:ring-2 focus:ring-canvas-accent"
      >
        {tool.logo ? (
          <img src={tool.logo} alt="" className="h-full w-full object-contain" />
        ) : (
          initials(tool.name)
        )}
      </button>
      {open && (
        <span
          role="tooltip"
          id={popId}
          className="absolute left-1/2 top-full z-50 w-max -translate-x-1/2 pt-1"
        >
          <span className="flex flex-col gap-1 rounded border border-canvas-line bg-canvas-panel p-2 text-xs shadow-lg">
            <span className="font-semibold text-zinc-100">{tool.name}</span>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-canvas-accent underline"
            >
              Official website
            </a>
            {onRemove && (
              <button type="button" onClick={onRemove} className="text-left text-red-400">
                Remove
              </button>
            )}
          </span>
        </span>
      )}
    </span>
  )
}
