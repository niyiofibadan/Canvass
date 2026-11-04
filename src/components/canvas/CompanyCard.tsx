import { EditableText } from '../EditableText'
import { BulletList } from '../BulletList'
import { updateCompany } from '../../store/mapOps'
import { useMapStore } from '../../store/useMapStore'
import type { Company } from '../../types'

export function CompanyCard({ company }: { company: Company }) {
  const apply = useMapStore((s) => s.apply)
  return (
    <section className="w-80 rounded border border-canvas-accent bg-canvas-panel p-4">
      <h1 className="text-center font-mono text-lg font-bold uppercase tracking-widest text-zinc-100">
        <EditableText
          value={company.name}
          label="company name"
          onCommit={(v) => apply((m) => updateCompany(m, { name: v }))}
        />
      </h1>
      <dl className="mt-3 space-y-1 text-xs text-zinc-400">
        <div className="flex gap-2">
          <dt className="w-24 shrink-0 font-mono uppercase text-zinc-600">In charge</dt>
          <dd className="flex-1">
            <EditableText
              value={company.personInCharge}
              label="person in charge"
              onCommit={(v) => apply((m) => updateCompany(m, { personInCharge: v }))}
            />
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-24 shrink-0 font-mono uppercase text-zinc-600">Reports to</dt>
          <dd className="flex-1">
            <EditableText
              value={company.reportsTo}
              label="reports to"
              onCommit={(v) => apply((m) => updateCompany(m, { reportsTo: v }))}
            />
          </dd>
        </div>
        <div>
          <dt className="font-mono uppercase text-zinc-600">Direct reports</dt>
          <dd>
            <BulletList
              label="direct reports"
              bullets={company.directReports}
              onChange={(directReports) => apply((m) => updateCompany(m, { directReports }))}
            />
          </dd>
        </div>
      </dl>
    </section>
  )
}
