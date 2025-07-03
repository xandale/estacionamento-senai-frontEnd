import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Veiculos from './veiculo'
import axios from 'axios'

// Mock do react-router-dom (parcial)
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn(),
  }
})

// Mock do axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
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

  // Resposta mockada da API de veículos
  axios.get.mockResolvedValue({
    data: [
      {
        id_veiculo: 1,
        placa: 'ABC-1234',
        modelo: 'Civic',
        cor: 'Prata',
        tipo_veiculo: 'Carro',
      },
    ],
  })
})

describe('Veiculos', () => {
  it('renderiza formulário de cadastro e lista veículos', async () => {
    render(
      <BrowserRouter>
        <Veiculos />
      </BrowserRouter>
    )

    expect(await screen.findByText('Cadastrar Novo Veículo')).toBeInTheDocument()
    expect(await screen.findByText('Veículos')).toBeInTheDocument()
    expect(await screen.findByText('ABC-1234')).toBeInTheDocument()
    expect(await screen.findByText('Civic')).toBeInTheDocument()  })

  it('preenche o campo de placa', async () => {
    render(
      <BrowserRouter>
        <Veiculos />
      </BrowserRouter>
    )

    const placaInput = screen.getByPlaceholderText('Placa')

    // Use `act` para garantir que o estado seja atualizado corretamente
    await act(() => {
      fireEvent.change(placaInput, { target: { value: 'abc1234' } })
    })

    // Corrigido para o valor com hífen (como a máscara está fazendo)
    expect(placaInput.value.toUpperCase()).toBe('ABC-1234')
  })
})
