import { BulletList } from '../BulletList'
import { EditableText } from '../EditableText'
import { updateFrame } from '../../store/mapOps'
import { useMapStore } from '../../store/useMapStore'
import type { Frame as FrameT } from '../../types'

export function Frame({ frame }: { frame: FrameT }) {
  const apply = useMapStore((s) => s.apply)
  return (
    <section
      data-testid="frame"
      className="w-96 rounded border border-canvas-line bg-canvas-panel p-4"
    >
      <h2 className="mb-2 flex gap-2 font-mono text-xs font-bold uppercase tracking-widest text-zinc-300">
        <span>{String(frame.number).padStart(2, '0')}</span>
        <EditableText
          value={frame.title}
          label={`frame ${frame.number} title`}
          onCommit={(v) => apply((m) => updateFrame(m, frame.id, { title: v }))}
        />
      </h2>
      <BulletList
        label={`frame ${frame.number}`}
        bullets={frame.bullets}
        onChange={(bullets) => apply((m) => updateFrame(m, frame.id, { bullets }))}
      />
    </section>
  )
}
