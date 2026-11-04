import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ToolPicker } from '../src/components/tools/ToolPicker'
import { useState } from 'react'
import { TOOLS } from '../src/data/tools'
import App from '../src/App'
import { useMapStore } from '../src/store/useMapStore'

function Harness({ category }: { category?: 'tax' | '' }) {
  const [sel, setSel] = useState<string[]>([])
  return (
    <ToolPicker
      category={category}
      selected={sel}
      onAdd={(id) => setSel((s) => [...s, id])}
      onRemove={(id) => setSel((s) => s.filter((x) => x !== id))}
    />
  )
}

describe('ToolPicker', () => {
  it('filters by search text', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.type(screen.getByRole('textbox', { name: 'Search tools' }), 'quickbooks')
    expect(screen.getByRole('button', { name: 'Add QuickBooks Online' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Add Xero' })).toBeNull()
  })

  it('filters by category', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.selectOptions(screen.getByRole('combobox', { name: 'Filter by category' }), 'tax')
    const taxNames = TOOLS.filter((t) => t.category === 'tax').map((t) => t.name)
    expect(screen.getByRole('button', { name: `Add ${taxNames[0]}` })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Add QuickBooks Online' })).toBeNull()
  })

  it('toggles a tool between Add and Remove', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.type(screen.getByRole('textbox', { name: 'Search tools' }), 'xero')
    await user.click(screen.getByRole('button', { name: 'Add Xero' }))
    await user.click(screen.getByRole('button', { name: 'Remove Xero' }))
    expect(screen.getByRole('button', { name: 'Add Xero' })).toBeInTheDocument()
  })

  it('shows hover link popover for icons inside the picker', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.type(screen.getByRole('textbox', { name: 'Search tools' }), 'xero')
    await user.hover(screen.getByRole('button', { name: 'Xero' }))
    expect(await screen.findByRole('link')).toHaveAttribute('href', 'https://xero.com')
  })
})

describe('library groups', () => {
  it('adds then removes a tool in a library group, keeping the hover link', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(
      screen.getByRole('button', { name: 'Add tool to Accounting & Financial Reporting' }),
    )
    await user.type(screen.getByRole('textbox', { name: 'Search tools' }), 'xero')
    await user.click(screen.getByRole('button', { name: 'Add Xero' }))
    expect(useMapStore.getState().map.library[0].toolIds).toEqual(['xero'])
    await user.click(screen.getByRole('button', { name: 'Remove Xero' }))
    expect(useMapStore.getState().map.library[0].toolIds).toEqual([])
  })
})
