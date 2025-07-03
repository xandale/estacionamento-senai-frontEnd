import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Cadastro from './cadastro'

describe('Cadastro', () => {
  it('renderiza o formulário corretamente', () => {
    render(
      <BrowserRouter>
        <Cadastro />
      </BrowserRouter>
    )

    expect(screen.getByText('Cadastro')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Digite seu nome')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Digite seu CPF')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Digite seu telefone')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Digite seu email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Digite sua senha')).toBeInTheDocument()
  })

  it('digita no campo de nome e verifica o valor', () => {
    render(
      <BrowserRouter>
        <Cadastro />
      </BrowserRouter>
    )

    const nomeInput = screen.getByPlaceholderText('Digite seu nome')
    fireEvent.change(nomeInput, { target: { value: 'João' } })
    expect(nomeInput.value).toBe('João')
  })
})
