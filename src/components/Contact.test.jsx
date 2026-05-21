import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Contact from './Contact'

describe('Contact', () => {
  it('sollte das Kontaktformular anzeigen', () => {
    render(<Contact />)
    expect(screen.getByPlaceholderText('Dein Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('deine@email.de')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Erzähl mir/i)).toBeInTheDocument()
  })

  it('sollte den Senden-Button anzeigen', () => {
    render(<Contact />)
    expect(screen.getByText('Nachricht senden')).toBeInTheDocument()
  })

  it('sollte Eingaben im Formular speichern', () => {
    render(<Contact />)
    const nameInput = screen.getByPlaceholderText('Dein Name')
    fireEvent.change(nameInput, { target: { name: 'name', value: 'Max Mustermann' } })
    expect(nameInput.value).toBe('Max Mustermann')
  })

  it('sollte Erfolgsmeldung nach dem Senden anzeigen', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve({ success: true }) })
    )
    render(<Contact />)
    fireEvent.change(screen.getByPlaceholderText('Dein Name'), {
      target: { name: 'name', value: 'Max' }
    })
    fireEvent.change(screen.getByPlaceholderText('deine@email.de'), {
      target: { name: 'email', value: 'max@test.de' }
    })
    fireEvent.change(screen.getByPlaceholderText(/Erzähl mir/i), {
      target: { name: 'message', value: 'Hallo!' }
    })
    fireEvent.click(screen.getByText('Nachricht senden'))
    await waitFor(() => {
      expect(screen.getByText('Nachricht erhalten!')).toBeInTheDocument()
    })
  })

  it('sollte Fehlermeldung bei Fehler anzeigen', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Netzwerkfehler')))
    render(<Contact />)
    fireEvent.change(screen.getByPlaceholderText('Dein Name'), {
      target: { name: 'name', value: 'Max' }
    })
    fireEvent.change(screen.getByPlaceholderText('deine@email.de'), {
      target: { name: 'email', value: 'max@test.de' }
    })
    fireEvent.change(screen.getByPlaceholderText(/Erzähl mir/i), {
      target: { name: 'message', value: 'Hallo!' }
    })
    fireEvent.click(screen.getByText('Nachricht senden'))
    await waitFor(() => {
      expect(screen.getByText(/Fehler beim Senden/i)).toBeInTheDocument()
    })
  })
})