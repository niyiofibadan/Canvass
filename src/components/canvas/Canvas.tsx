import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { fitToScreen, zoomAt, type Viewport } from '../../lib/viewport'
import { useMapStore } from '../../store/useMapStore'
import { Frame } from '../frames/Frame'
import { PillarHeader } from '../pillars/PillarHeader'
import { CompanyCard } from './CompanyCard'
import { Connectors } from './Connectors'

const WORLD_W = 2000
const WORLD_H = 900
const PILLAR_W = 224
const PILLAR_GAP = 16
const PILLAR_Y = 600
const COMPANY = { x: WORLD_W / 2, y: 400 }

export function Canvas() {
  const map = useMapStore((s) => s.map)
  const reset = useMapStore((s) => s.resetToDefault)
  const ref = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; y: number } | null>(null)
  const [view, setView] = useState<Viewport>({ x: 0, y: 0, scale: 1 })

  const fit = useCallback(() => {
    const el = ref.current
    if (!el) return
    setView(
      fitToScreen(
        { width: WORLD_W, height: WORLD_H },
        { width: el.clientWidth, height: el.clientHeight },
      ),
    )
  }, [])
  useLayoutEffect(fit, [fit])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
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

  return (
    <div
      ref={ref}
      data-testid="canvas"
      className="relative h-screen w-screen cursor-grab overflow-hidden bg-canvas-bg active:cursor-grabbing"
      onPointerDown={(e) => {
        if (e.target !== e.currentTarget && !(e.target as HTMLElement).dataset.world) return
        drag.current = { x: e.clientX, y: e.clientY }
        e.currentTarget.setPointerCapture(e.pointerId)
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
        <Connectors from={COMPANY} targets={targets} width={WORLD_W} height={WORLD_H} />
        <div className="absolute left-0 top-8 flex w-full justify-center gap-6">
          {map.frames.map((f) => (
            <Frame key={f.id} frame={f} />
          ))}
        </div>
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: COMPANY.x, top: COMPANY.y - 60 }}
        >
          <CompanyCard company={map.company} />
        </div>
        <div className="absolute flex gap-4" style={{ left: rowX, top: PILLAR_Y }}>
          {map.pillars.map((p) => (
            <PillarHeader key={p.id} pillar={p} />
          ))}
        </div>
      </div>
      <div className="absolute right-4 top-4 flex gap-2 font-mono text-xs">
        <button
          onClick={fit}
          className="rounded border border-canvas-line bg-canvas-panel px-3 py-1 text-zinc-300"
        >
          Fit
        </button>
        <button
          onClick={reset}
          className="rounded border border-canvas-line bg-canvas-panel px-3 py-1 text-zinc-300"
        >
          Reset to default
        </button>
      </div>
    </div>
  )
}
