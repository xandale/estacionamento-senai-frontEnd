// vitest.setup.js
// vitest.setup.js
import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock parcial do react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    BrowserRouter: actual.BrowserRouter,
    useNavigate: vi.fn()
  }
})

// Mock básico de localStorage
global.localStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
}
