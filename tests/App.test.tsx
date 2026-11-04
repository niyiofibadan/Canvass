import { render, screen } from '@testing-library/react'
import App from '../src/App'

describe('App', () => {
  it('renders the canvas with company card, 3 frames and 8 pillars', () => {
    render(<App />)
    expect(screen.getByTestId('canvas')).toBeInTheDocument()
    expect(screen.getByText('Company Name')).toBeInTheDocument()
    expect(screen.getByText(/Financial Context/)).toBeInTheDocument()
    expect(screen.getByText(/Financial Goal/)).toBeInTheDocument()
    expect(screen.getByText(/Financial Strategy/)).toBeInTheDocument()
    expect(screen.getAllByTestId('pillar')).toHaveLength(8)
  })
})
