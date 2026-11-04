import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../src/App'
import { useMapStore } from '../src/store/useMapStore'

describe('inline editing and add/remove UI', () => {
  it('edits the company name and persists it to the store', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Edit company name' }))
    const input = screen.getByRole('textbox', { name: 'company name' })
    await user.clear(input)
    await user.type(input, 'Acme Corp{Enter}')
    expect(screen.getByText('Acme Corp')).toBeInTheDocument()
    expect(useMapStore.getState().map.company.name).toBe('Acme Corp')
  })

  it('Escape cancels an edit', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Edit company name' }))
    await user.type(screen.getByRole('textbox', { name: 'company name' }), 'zzz{Escape}')
    expect(useMapStore.getState().map.company.name).toBe('Company Name')
  })

  it('edits a pillar objective', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Edit pillar 1 objective' }))
    const box = screen.getByRole('textbox', { name: 'pillar 1 objective' })
    await user.clear(box)
    await user.type(box, 'Close the books fast{Enter}')
    expect(useMapStore.getState().map.pillars[0].objective).toBe('Close the books fast')
  })

  it('adds and removes frame bullets', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Add frame 1 bullet' }))
    expect(useMapStore.getState().map.frames[0].bullets).toHaveLength(2)
    await user.click(screen.getByRole('button', { name: 'Remove frame 1 bullet 2' }))
    expect(useMapStore.getState().map.frames[0].bullets).toHaveLength(1)
  })

  it('adds and removes a pillar section, and undo restores it', async () => {
    const user = userEvent.setup()
    render(<App />)
    const before = useMapStore.getState().map.pillars[1].sections.length
    await user.click(screen.getByRole('button', { name: 'Add section to Financial Planning' }))
    expect(useMapStore.getState().map.pillars[1].sections).toHaveLength(before + 1)
    await user.click(screen.getByRole('button', { name: 'Remove section New section' }))
    expect(useMapStore.getState().map.pillars[1].sections).toHaveLength(before)
    await user.click(screen.getByRole('button', { name: /Undo/ }))
    expect(useMapStore.getState().map.pillars[1].sections).toHaveLength(before + 1)
  })

  it('Reset to default restores the default map', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Add frame 1 bullet' }))
    await user.click(screen.getByRole('button', { name: /Reset to default/ }))
    expect(useMapStore.getState().map.frames[0].bullets).toHaveLength(1)
  })

  it('adds a tool to a pillar section via the picker', async () => {
    const user = userEvent.setup()
    render(<App />)
    const pillar = screen.getAllByTestId('pillar')[0]
    await user.click(within(pillar).getByRole('button', { name: 'Add tool to Chart of Accounts' }))
    await user.type(screen.getByRole('textbox', { name: 'Search tools' }), 'xero')
    await user.click(screen.getByRole('button', { name: 'Add Xero' }))
    expect(useMapStore.getState().map.pillars[0].sections[0].toolIds).toContain('xero')
  })
})
