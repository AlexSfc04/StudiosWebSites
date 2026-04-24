import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Email, WarningAlt, SendAlt } from '@carbon/icons-react'
import AnimatedSection from '../AnimatedSection/AnimatedSection'
import './Newsletter.css'

const API_URL = import.meta.env.VITE_API_URL

function Newsletter() {
  const [email, setEmail] = useState('')
  const [estado, setEstado] = useState('idle') // idle | loading | success | duplicate | error
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEstado('loading')
    setMensaje('')

    try {
      const res = await fetch(`${API_URL}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.status === 409) {
        setEstado('duplicate')
        setMensaje(data.message)
      } else if (res.ok) {
        setEstado('success')
        setEmail('')
      } else {
        setEstado('error')
        setMensaje(data.message || 'Algo salió mal.')
      }
    } catch {
      setEstado('error')
      setMensaje('Error al conectar con el servidor.')
    }
  }

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">

        <AnimatedSection>
          <h2 className="newsletter-title">
            ¿Listo para llevar tu negocio<br />
            al siguiente nivel?
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <p className="newsletter-description">
            Suscríbete y recibe consejos exclusivos sobre diseño
            y desarrollo web directamente en tu bandeja de entrada.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.25}>
          <AnimatePresence mode="wait">

            {estado === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="newsletter-success"
              >
                <div className="newsletter-success__icon-wrap">
                  <Email size={28} />
                </div>
                <div className="newsletter-success__body">
                  <strong className="newsletter-success__title">
                    ¡Revisa tu email!
                  </strong>
                  <p className="newsletter-success__text">
                    Te hemos enviado un enlace de confirmación.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="newsletter-form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <div className="newsletter-form__row">
                  <input
                    type="email"
                    placeholder="Tu email aquí"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="newsletter-input"
                    required
                    disabled={estado === 'loading'}
                    aria-label="Dirección de email"
                  />
                  <button
                    type="submit"
                    className={`newsletter-button${estado === 'loading' ? ' newsletter-button--loading' : ''}`}
                    disabled={estado === 'loading'}
                  >
                    {estado === 'loading' ? (
                      <span className="newsletter-button__spinner" aria-hidden="true" />
                    ) : (
                      <SendAlt size={16} aria-hidden="true" />
                    )}
                    {estado === 'loading' ? 'Enviando…' : 'Suscribirse'}
                  </button>
                </div>

                <AnimatePresence>
                  {(estado === 'error' || estado === 'duplicate') && (
                    <motion.p
                      key="error"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="newsletter-error"
                      role="alert"
                    >
                      <WarningAlt size={14} aria-hidden="true" />
                      {mensaje}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.form>
            )}

          </AnimatePresence>
        </AnimatedSection>

      </div>
    </section>
  )
}

export default Newsletter