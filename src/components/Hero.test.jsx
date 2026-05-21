import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Hero from './Hero'

describe('Hero', () => {
  it('sollte den Namen anzeigen', () => {
    render(<Hero />)
    expect(screen.getByText('Alper')).toBeInTheDocument()
    expect(screen.getByText('Caliskan')).toBeInTheDocument()
  })

  it('sollte die zwei Buttons anzeigen', () => {
    render(<Hero />)
    expect(screen.getByText('Projekte ansehen')).toBeInTheDocument()
    expect(screen.getByText('Kontakt aufnehmen')).toBeInTheDocument()
  })

  it('sollte die Beschreibung anzeigen', () => {
    render(<Hero />)
    expect(screen.getByText(/schnelle, skalierbare/i)).toBeInTheDocument()
  })
})
