import { render, screen, fireEvent } from '@testing-library/react'
import Chatbot from '../components/Chatbot/Chatbot'

// ← Añade este mock para que AnimatePresence no retenga el DOM
vi.mock('framer-motion', () => ({
  motion: {
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}))

describe('Chatbot', () => {
  test('muestra el botón de burbuja al inicio', () => {
    render(<Chatbot />)
    expect(screen.getByLabelText('Abrir chat')).toBeInTheDocument()
  })

  test('abre el chat al pulsar la burbuja', () => {
    render(<Chatbot />)
    fireEvent.click(screen.getByLabelText('Abrir chat'))
    expect(screen.getByText('StudiosWebSites')).toBeInTheDocument()
    expect(screen.getByText(/Hola! Soy el asistente/)).toBeInTheDocument()
  })

  test('cierra el chat al pulsar la X del header', () => {
    render(<Chatbot />)
    fireEvent.click(screen.getByLabelText('Abrir chat'))
    fireEvent.click(screen.getByText('✕'))
    expect(screen.queryByText('StudiosWebSites')).not.toBeInTheDocument()
  })

  test('no envía mensaje vacío', () => {
    render(<Chatbot />)
    fireEvent.click(screen.getByLabelText('Abrir chat'))
    const sendBtn = screen.getByText('➤')
    expect(sendBtn).toBeDisabled()
  })
})
