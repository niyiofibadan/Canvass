import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { fitToScreen, zoomAt, type Viewport } from '../../lib/viewport'
import { useMapStore } from '../../store/useMapStore'
import { Frame } from '../frames/Frame'
import { Pillar } from '../pillars/Pillar'
import { LibraryGroup } from '../tools/LibraryGroup'
import { CompanyCard } from './CompanyCard'
import { Connectors } from './Connectors'
import { Toolbar } from './Toolbar'

const WORLD_W = 2000
const WORLD_H = 2200
const PILLAR_W = 232
const PILLAR_GAP = 16
const PILLAR_Y = 900
const COMPANY = { x: WORLD_W / 2, y: 640 }

export function Canvas() {
  const map = useMapStore((s) => s.map)
  const ref = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; y: number } | null>(null)
  const [view, setView] = useState<Viewport>({ x: 0, y: 0, scale: 1 })

  const fit = useCallback(() => {
    const el = ref.current
    if (!el) return
    setView(
      fitToScreen(
        { width: WORLD_W, height: 1650 },
        { width: el.clientWidth, height: el.clientHeight },
      ),
    )
  }, [])
  useLayoutEffect(fit, [fit])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if ((e.target as HTMLElement).closest('[data-no-zoom]')) return
      e.preventDefault()
      const r = el.getBoundingClientRect()
      setView((v) => zoomAt(v, e.clientX - r.left, e.clientY - r.top, Math.exp(-e.deltaY * 0.001)))
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  const rowW = map.pillars.length * PILLAR_W + (map.pillars.length - 1) * PILLAR_GAP
  const rowX = (WORLD_W - rowW) / 2
  const targets = map.pillars.map((_, i) => ({
    x: rowX + i * (PILLAR_W + PILLAR_GAP) + PILLAR_W / 2,
    y: PILLAR_Y,
  }))
  const half = Math.ceil(map.library.length / 2)

  return (
    <div
      ref={ref}
      data-testid="canvas"
      className="relative h-screen w-screen cursor-grab overflow-hidden bg-canvas-bg active:cursor-grabbing"
      onPointerDown={(e) => {
        const t = e.target as HTMLElement
        if (t !== e.currentTarget && !t.dataset.world) return
        drag.current = { x: e.clientX, y: e.clientY }
        e.currentTarget.setPointerCapture?.(e.pointerId)
      }}
      onPointerMove={(e) => {
        if (!drag.current) return
        const dx = e.clientX - drag.current.x
        const dy = e.clientY - drag.current.y
        drag.current = { x: e.clientX, y: e.clientY }
        setView((v) => ({ ...v, x: v.x + dx, y: v.y + dy }))
      }}
      onPointerUp={() => (drag.current = null)}
    >
      <div
        data-world="true"
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: WORLD_W,
          height: WORLD_H,
          transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
        }}
      >
        <Connectors
          from={{ x: COMPANY.x, y: COMPANY.y - 50 }}
          targets={targets}
          width={WORLD_W}
          height={WORLD_H}
        />
        <div className="absolute left-0 top-8 flex w-full justify-center gap-6">
          {map.frames.map((f) => (
            <Frame key={f.id} frame={f} />
          ))}
        </div>
        <div className="absolute left-6 top-72 flex flex-col gap-3">
          {map.library.slice(0, half).map((g) => (
            <LibraryGroup key={g.id} group={g} />
          ))}
        </div>
        <div className="absolute right-6 top-72 flex flex-col gap-3">
          {map.library.slice(half).map((g) => (
            <LibraryGroup key={g.id} group={g} />
          ))}
        </div>
        <div
          className="absolute -translate-x-1/2"
          style={{ left: COMPANY.x, top: COMPANY.y - 160 }}
        >
          <CompanyCard company={map.company} />
        </div>
        <div className="absolute flex items-start gap-4" style={{ left: rowX, top: PILLAR_Y }}>
          {map.pillars.map((p) => (
            <Pillar key={p.id} pillar={p} />
          ))}
        </div>
      </div>
      <Toolbar onFit={fit} />
    </div>
  )
}
