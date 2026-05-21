import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('sollte die Navbar anzeigen', () => {
    render(<Navbar />)
    expect(document.querySelector('nav')).toBeInTheDocument()
  })
})
