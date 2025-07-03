import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Usuario from './usuario'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  }
}))

beforeEach(() => {
  vi.clearAllMocks()

  // Mock do localStorage
  global.localStorage = {
    getItem: vi.fn(() => 'fake-token'),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  }

  axios.get.mockResolvedValue({
    data: {
      nome: 'João',
      email: 'joao@email.com',
      cpf: '12345678700',
      telefone: '11999999999',
      senha: 'senha123',
    }
  })
})

describe('Usuario', () => {
  it('renderiza campos do usuário', async () => {
    render(
      <BrowserRouter>
        <Usuario />
      </BrowserRouter>
    )

    expect(await screen.findByText('Minha Conta')).toBeInTheDocument()
    expect(await screen.findByDisplayValue('João')).toBeInTheDocument()
    expect(await screen.findByDisplayValue('joao@email.com')).toBeInTheDocument()
  })
})
