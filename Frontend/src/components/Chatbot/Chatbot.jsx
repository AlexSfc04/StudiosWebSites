import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Chatbot.css'
import { Close } from '@carbon/icons-react'
const API_URL = import.meta.env.VITE_API_URL

function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: '👋 ¡Hola! Soy el asistente de StudiosWebSites. ¿En qué puedo ayudarte?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return

    const newMessages = [...messages, { from: 'user', text }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/chatbot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: newMessages.slice(1),
        }),
      })

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }

      const data = await res.json()

      setMessages(prev => [
        ...prev,
        { from: 'bot', text: data.answer || 'No he podido responder ahora mismo.' }
      ])
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { from: 'bot', text: '❌ Error al conectar con el servidor.' }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="chatbot-wrapper">
      {!open && (
        <motion.button
          className="chatbot-bubble"
          onClick={() => setOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Abrir chat"
        >
          <img
            src="https://res.cloudinary.com/dzmgxz55b/image/upload/v1775727259/icon_chatbot_twfh2z.png"
            alt="Chatbot"
          />
        </motion.button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            <div className="chatbot-header">
              <div className="chatbot-avatar">
                <img
                  src="https://res.cloudinary.com/dzmgxz55b/image/upload/v1775727259/icon_chatbot_twfh2z.png"
                  alt="SWS"
                />
              </div>

              <div style={{ flex: 1 }}>
                <strong>StudiosWebSites</strong>
                <span className="chatbot-status">● En línea</span>
              </div>

              <button
                className="chatbot-close"
                onClick={() => setOpen(false)}
                aria-label="Cerrar chat"
              >
                <Close size={20} />
              </button>
            </div>

            <div className="chatbot-messages">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`chatbot-msg ${msg.from}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {msg.text}
                </motion.div>
              ))}

              {loading && (
                <div className="chatbot-msg bot chatbot-typing">
                  <span /><span /><span />
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            <div className="chatbot-input-wrap">
              <input
                className="chatbot-input"
                placeholder="Escribe tu mensaje..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                disabled={loading}
              />
              <button
                className="chatbot-send"
                onClick={send}
                disabled={loading || !input.trim()}
              >
                ➤
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Chatbot