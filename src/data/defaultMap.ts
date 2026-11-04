import type { MapData, Pillar, Section } from '../types'

const section = (id: string, title: string): Section => ({
  id,
  title,
  blocks: [{ id: `${id}-b1`, heading: 'Describe...', bullets: ['Describe...'] }],
  toolIds: [],
})

const pillar = (n: number, id: string, title: string, sections: string[]): Pillar => ({
  id,
  number: n,
  title,
  objective: 'Describe the objective...',
  sections: sections.map((s, i) => section(`${id}-s${i + 1}`, s)),
})

export function createDefaultMap(): MapData {
  return {
    frames: [
      { id: 'f1', number: 1, title: 'Financial Context', bullets: ['Describe...'] },
      { id: 'f2', number: 2, title: 'Financial Goal', bullets: ['Describe...'] },
      { id: 'f3', number: 3, title: 'Financial Strategy', bullets: ['Describe...'] },
    ],
    company: {
      name: 'Company Name',
      personInCharge: 'Person in charge',
      reportsTo: 'Reports to',
      directReports: [],
    },
    library: [
      { id: 'accounting', title: 'Accounting & Financial Reporting', toolIds: [] },
      { id: 'planning', title: 'Financial Planning', toolIds: [] },
      { id: 'banking', title: 'Banking, Treasury & Capital', toolIds: [] },
      { id: 'operations', title: 'Financial Operations', toolIds: [] },
      { id: 'tax', title: 'Tax, Risk & Compliance', toolIds: [] },
      { id: 'infrastructure', title: 'Financial Infrastructure', toolIds: [] },
    ],
    pillars: [
      pillar(1, 'p1', 'Financial Accounting', [
        'Chart of Accounts',
        'Transaction Recording',
        'Reconciliation',
        'Financial Statements',
        'Reporting & Distribution',
      ]),
      pillar(2, 'p2', 'Financial Planning', [
        'Budgeting',
        'Financial Modeling',
        'Forecasting',
        'Performance Review',
      ]),
      pillar(3, 'p3', 'Treasury & Cash Management', [
        'Cash Position & Liquidity',
        'Banking Relationships',
        'Payment Authorization',
        'Cash Flow Management',
        'Treasury Controls',
      ]),
      pillar(4, 'p4', 'Revenue & Receivables', [
        'Billing & Invoicing',
        'Collections',
        'Receivables Management',
      ]),
      pillar(5, 'p5', 'Expenses & Payables', [
        'Expense Management',
        'Supplier Invoicing',
        'Purchasing & Approval',
        'Payables Management',
        'Payables Reporting',
      ]),
      pillar(6, 'p6', 'Tax & Financial Compliance', [
        'Tax Obligations & Filing',
        'Corporate Tax',
        'Indirect Tax',
        'Regulatory & Statutory Compliance',
      ]),
      pillar(7, 'p7', 'Capital Structure', [
        'Ownership & Equity Structure',
        'Financing Arrangements',
        'Debt Financing',
        'Equity Financing',
        'Capital Structure Reporting',
      ]),
      pillar(8, 'p8', 'Capital Allocation', [
        'Investment Evaluation',
        'Resource Allocation',
        'Investment Monitoring',
        'Capital Prioritization',
        'Capital Allocation Governance',
      ]),
    ],
  }
}
