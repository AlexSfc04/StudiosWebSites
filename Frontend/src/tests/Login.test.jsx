import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import Login from '../pages/LoginPage'

// Mock del AuthContext
const mockLogin = vi.fn()
vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({ login: mockLogin })
}))

const renderLogin = () =>
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  )

describe('Login', () => {
  test('renderiza el formulario correctamente', () => {
    renderLogin()
    expect(screen.getByPlaceholderText('tu@email.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument()
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument()
  })

  test('muestra error si los campos están vacíos', async () => {
    renderLogin()
    fireEvent.click(screen.getByText('Iniciar sesión'))
    expect(await screen.findByText('Introduce los datos necesarios.')).toBeInTheDocument()
  })

  test('muestra error con credenciales incorrectas', async () => {
    mockLogin.mockResolvedValue({ success: false, message: 'Email o contraseña incorrectos.' })
    renderLogin()
    fireEvent.change(screen.getByPlaceholderText('tu@email.com'), { target: { value: 'mal@email.com' } })
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'wrongpass' } })
    fireEvent.click(screen.getByText('Iniciar sesión'))
    expect(await screen.findByText('Email o contraseña incorrectos.')).toBeInTheDocument()
  })

  test('navega a / con credenciales correctas', async () => {
    mockLogin.mockResolvedValue({ success: true, user: { name: 'Alex' } })
    renderLogin()
    fireEvent.change(screen.getByPlaceholderText('tu@email.com'), { target: { value: 'alex@test.com' } })
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: '123456' } })
    fireEvent.click(screen.getByText('Iniciar sesión'))
    await waitFor(() => expect(mockLogin).toHaveBeenCalledWith('alex@test.com', '123456'))
  })
})
