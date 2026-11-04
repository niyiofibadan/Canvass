import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ToolIcon } from '../src/components/tools/ToolIcon'
import { TOOLS } from '../src/data/tools'

const tool = { id: 'x', name: 'Acme', category: 'accounting' as const, url: 'https://acme.example' }

describe('ToolIcon', () => {
  it('shows a link with the correct href on hover', async () => {
    const user = userEvent.setup()
    render(<ToolIcon tool={tool} />)
    expect(screen.queryByRole('link')).toBeNull()
    await user.hover(screen.getByRole('button', { name: 'Acme' }))
    const link = await screen.findByRole('link')
    expect(link).toHaveAttribute('href', 'https://acme.example')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('stays open when the pointer moves onto the link', async () => {
    const user = userEvent.setup()
    render(<ToolIcon tool={tool} />)
    await user.hover(screen.getByRole('button', { name: 'Acme' }))
    await user.hover(await screen.findByRole('link'))
    await new Promise((r) => setTimeout(r, 300))
    expect(screen.getByRole('link')).toBeInTheDocument()
  })

  it('opens on keyboard focus and closes on Escape', async () => {
    const user = userEvent.setup()
    render(<ToolIcon tool={tool} />)
    await user.tab()
    const btn = screen.getByRole('button', { name: 'Acme' })
    expect(btn).toHaveAttribute('aria-describedby')
    expect(screen.getByRole('link')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('link')).toBeNull()
  })
})

describe('seed tools', () => {
  it('has 230+ tools, each with an https url', () => {
    expect(TOOLS.length).toBeGreaterThanOrEqual(230)
    for (const t of TOOLS) expect(t.url).toMatch(/^https:\/\//)
    expect(new Set(TOOLS.map((t) => t.id)).size).toBe(TOOLS.length)
  })
})
