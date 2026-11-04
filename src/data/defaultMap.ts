import type { MapData, Pillar, Section } from '../types'

const section = (id: string, title: string): Section => ({
  id,
  title,
  blocks: [{ id: `${id}-b1`, heading: 'Describe...', bullets: ['Describe...'] }],
  toolIds: [],
})

const pillar = (
  n: number,
  id: string,
  title: string,
  objective: string,
  sections: string[],
): Pillar => ({
  id,
  number: n,
  title,
  objective,
  sections: sections.map((s, i) => section(`${id}-s${i + 1}`, s)),
})

export function createDefaultMap(): MapData {
  return {
    frames: [
      {
        id: 'f1',
        number: 1,
        title: 'Financial Context',
        bullets: [
          'Annual revenue: $8.4M CAD',
          'Revenue growth: 22% YoY',
          'Operating margin: 18% ($1.51M)',
          'Business model: B2B professional services, monthly retainers, project-based engagements, consulting',
          'Revenue mix: 65% retainers / 30% projects / 5% consulting',
          'Cash reserves: $1.1M (approximately 3 months of operating expenses)',
          'Financial challenges:',
          '– Inconsistent margins across client accounts',
          '– Revenue concentration among top five clients',
          '– Limited visibility into future staffing costs',
          '– Delayed collections on project-based invoices',
        ],
      },
      {
        id: 'f2',
        number: 2,
        title: 'Financial Goal',
        bullets: [
          'Revenue target: $12M CAD annually within 24 months',
          'Operating margin: increase from 18% to 23%',
          'Cash reserves: maintain a minimum of 4 months of operating expenses',
          'Recurring revenue: increase retainer revenue from 65% to 75%',
          'Receivables: reduce average collection period to 30 days or less',
          'Financial predictability:',
          '– Monthly rolling 12-month forecasts',
          '– Revenue forecast variance within ±5%',
          '– Monthly financial close completed within 10 business days',
        ],
      },
      {
        id: 'f3',
        number: 3,
        title: 'Financial Strategy',
        bullets: [
          'Prioritize recurring contracts to improve revenue stability and forecasting accuracy',
          'Introduce client-level profitability reviews to identify underperforming engagements and adjust pricing',
          'Implement quarterly resource planning to align hiring decisions with projected client demand',
          'Strengthen receivables management:',
          '– Standardize 30-day payment terms',
          '– Review outstanding invoices weekly',
          '– Escalate balances exceeding 45 days',
          'Establish monthly FP&A reviews to compare actual performance against budgets and forecasts',
          'Maintain disciplined capital allocation:',
          '– Prioritize investments with measurable returns',
          '– Require financial justification for major expenditures',
          '– Preserve the minimum cash reserve before discretionary distributions',
        ],
      },
    ],
    company: {
      name: 'Mercer Advisory Group Inc.',
      personInCharge: 'Sarah Mitchell, Finance Manager',
      reportsTo: 'Daniel Mercer, Founder & CEO',
      directReports: ['James Wilson, Senior Accountant', 'Emily Carter, Bookkeeper'],
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
      pillar(
        1,
        'p1',
        'Financial Accounting',
        'Maintain accurate, complete and timely financial records. Produce reliable statements that clients, leadership and advisors can trust.',
        [
          'Chart of Accounts',
          'Transaction Recording',
          'Reconciliation',
          'Financial Statements',
          'Reporting & Distribution',
        ],
      ),
      pillar(
        2,
        'p2',
        'Financial Planning',
        'Plan and forecast with a rolling 12-month view. Compare actual results against budgets to guide staffing and pricing decisions.',
        ['Budgeting', 'Financial Modeling', 'Forecasting', 'Performance Review'],
      ),
      pillar(
        3,
        'p3',
        'Treasury & Cash Management',
        'Keep sufficient liquidity to meet obligations and fund growth. Maintain clear visibility of cash position and tight payment controls.',
        [
          'Cash Position & Liquidity',
          'Banking Relationships',
          'Payment Authorization',
          'Cash Flow Management',
          'Treasury Controls',
        ],
      ),
      pillar(
        4,
        'p4',
        'Revenue & Receivables',
        'Invoice accurately and on time across retainers and projects. Collect faster and keep outstanding balances under control.',
        ['Billing & Invoicing', 'Collections', 'Receivables Management'],
      ),
      pillar(
        5,
        'p5',
        'Expenses & Payables',
        'Control spending through clear approvals and accurate supplier records. Pay suppliers on time while protecting cash.',
        [
          'Expense Management',
          'Supplier Invoicing',
          'Purchasing & Approval',
          'Payables Management',
          'Payables Reporting',
        ],
      ),
      pillar(
        6,
        'p6',
        'Tax & Financial Compliance',
        'Maintain compliance with all applicable tax and financial regulations. Ensure accurate, timely filings and remittances. Minimize tax exposure, penalties, and compliance risks. Maintain audit-ready records and clear accountability.',
        [
          'Tax Obligations & Filing',
          'Corporate Tax',
          'Indirect Tax',
          'Regulatory & Statutory Compliance',
        ],
      ),
      pillar(
        7,
        'p7',
        'Capital Structure',
        'Maintain a sound mix of ownership and financing that supports growth. Keep obligations and equity arrangements clearly documented.',
        [
          'Ownership & Equity Structure',
          'Financing Arrangements',
          'Debt Financing',
          'Equity Financing',
          'Capital Structure Reporting',
        ],
      ),
      pillar(
        8,
        'p8',
        'Capital Allocation',
        'Direct capital to the investments with the strongest measurable returns. Require clear justification and ongoing review of major spend.',
        [
          'Investment Evaluation',
          'Resource Allocation',
          'Investment Monitoring',
          'Capital Prioritization',
          'Capital Allocation Governance',
        ],
      ),
    ],
  }
}
