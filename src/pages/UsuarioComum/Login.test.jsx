import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Login from './login'

vi.mock('axios', () => ({
  default: {
    post: vi.fn(() => Promise.resolve({ data: { token: 'fake-token' } })),
  }
}))

vi.mock('jwt-decode', () => ({
  jwtDecode: () => ({ isAdmin: false }),
}))

describe('Login', () => {
  it('renderiza o formulário de login', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    expect(screen.getByText('Login')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Digite seu e-mail')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Digite sua senha')).toBeInTheDocument()
  })

  it('permite digitar email e senha', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    const emailInput = screen.getByPlaceholderText('Digite seu e-mail')
    const senhaInput = screen.getByPlaceholderText('Digite sua senha')

    fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } })
    fireEvent.change(senhaInput, { target: { value: '123456' } })

    expect(emailInput.value).toBe('teste@teste.com')
    expect(senhaInput.value).toBe('123456')
  })
})
