import type { Company } from '../../types'

export function CompanyCard({ company }: { company: Company }) {
  return (
    <section className="w-72 rounded border border-canvas-accent bg-canvas-panel p-4 text-center">
      <h1 className="font-mono text-lg font-bold uppercase tracking-widest text-zinc-100">
        {company.name}
      </h1>
      <p className="mt-1 text-xs text-zinc-400">{company.personInCharge}</p>
      <p className="text-xs text-zinc-500">{company.reportsTo}</p>
    </section>
  )
}
