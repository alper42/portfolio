import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import About from './About'

describe('About', () => {
  it('sollte die Überschrift anzeigen', () => {
    render(<About />)
    expect(screen.getByText(/Ich entwickle Produkte/i)).toBeInTheDocument()
  })

  it('sollte den Abschnitt "Über mich" anzeigen', () => {
    render(<About />)
    expect(screen.getByText(/Über mich/i)).toBeInTheDocument()
  })

  it('sollte die Avatar-Initialen AC anzeigen', () => {
    render(<About />)
    expect(screen.getByText('AC')).toBeInTheDocument()
  })

  it('sollte die Technologie-Tags anzeigen', () => {
    render(<About />)
    expect(screen.getByText('Flutter')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getByText('Next.js')).toBeInTheDocument()
  })
})
