import { Download, Maximize, RotateCcw, Undo2, Upload } from 'lucide-react'
import { useRef, useState } from 'react'
import { exportMap, parseMap } from '../../lib/mapIO'
import { useMapStore } from '../../store/useMapStore'

const btn =
  'flex items-center gap-1 rounded border border-canvas-line bg-canvas-panel px-3 py-1 text-zinc-300 hover:border-canvas-accent disabled:opacity-40'

export function Toolbar({ onFit }: { onFit: () => void }) {
  const map = useMapStore((s) => s.map)
  const canUndo = useMapStore((s) => s.past.length > 0)
  const undo = useMapStore((s) => s.undo)
  const reset = useMapStore((s) => s.resetToDefault)
  const importMap = useMapStore((s) => s.importMap)
  const file = useRef<HTMLInputElement>(null)
  const [error, setError] = useState('')

  const download = () => {
    const url = URL.createObjectURL(new Blob([exportMap(map)], { type: 'application/json' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'canvass-map.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const onFile = async (f: File | undefined) => {
    if (!f) return
    try {
      importMap(parseMap(await f.text()))
      setError('')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Import failed')
    }
    if (file.current) file.current.value = ''
  }

  return (
    <div
      data-no-zoom="true"
      className="absolute right-4 top-4 z-40 flex items-center gap-2 font-mono text-xs"
    >
      {error && (
        <span role="alert" className="text-red-400">
          {error}
        </span>
      )}
      <button onClick={undo} disabled={!canUndo} className={btn}>
        <Undo2 size={12} /> Undo
      </button>
      <button onClick={onFit} className={btn}>
        <Maximize size={12} /> Fit
      </button>
      <button onClick={download} className={btn}>
        <Download size={12} /> Export
      </button>
      <button onClick={() => file.current?.click()} className={btn}>
        <Upload size={12} /> Import
      </button>
      <input
        ref={file}
        type="file"
        accept="application/json"
        aria-label="Import map JSON"
        className="hidden"
        onChange={(e) => onFile(e.target.files?.[0])}
      />
      <button onClick={reset} className={btn}>
        <RotateCcw size={12} /> Reset to default
      </button>
    </div>
  )
}
