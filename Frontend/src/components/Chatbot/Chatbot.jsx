import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Chatbot.css'

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
  }, [messages])

  const send = async () => {
  const text = input.trim()
  if (!text || loading) return

  const newMessages = [...messages, { from: 'user', text }]
  setMessages(newMessages)
  setInput('')
  setLoading(true)

  try {
    const res = await fetch('http://localhost:5000/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: text,
        history: newMessages.slice(1), // Excluye el saludo inicial del bot
      }),
    })
    const data = await res.json()
    setMessages(prev => [...prev, { from: 'bot', text: data.answer }])
  } catch {
    setMessages(prev => [...prev, { from: 'bot', text: '❌ Error al conectar.' }])
  } finally {
    setLoading(false)
  }
}


  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <div className="chatbot-wrapper">
      {/* ── Burbuja flotante ── */}
      <motion.button
        className="chatbot-bubble"
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Abrir chat"
      >
        {open ? '✕' : '💬'}
      </motion.button>

      {/* ── Ventana del chat ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-avatar">SWS</div>
              <div>
                <strong>StudiosWebSites</strong>
                <span className="chatbot-status">● En línea</span>
              </div>
            </div>

            {/* Mensajes */}
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

            {/* Input */}
            <div className="chatbot-input-wrap">
              <input
                className="chatbot-input"
                placeholder="Escribe tu mensaje..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                disabled={loading}
              />
              <button className="chatbot-send" onClick={send} disabled={loading || !input.trim()}>
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
