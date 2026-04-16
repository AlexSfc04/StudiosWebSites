import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedSection from '../AnimatedSection/AnimatedSection'
import './Newsletter.css'

function Newsletter() {
  const [email, setEmail] = useState('')
  const [estado, setEstado] = useState('idle') // idle | loading | success | error | duplicate
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = async (e) => {
  e.preventDefault()
  setEstado('loading')

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/newsletter`, {  // ← URL completa
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
        <div className="newsletter-content">
          <AnimatedSection>
            <h2 className="newsletter-title">
              ¿Listo para llevar<br />
              tu negocio al<br />
              siguiente nivel?
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="newsletter-description">
              Suscríbete a nuestro newsletter y recibe consejos exclusivos
              sobre diseño y desarrollo web.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            {estado === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="newsletter-success"
              >
                <span>📩</span>
                <div>
                  <strong>¡Revisa tu email!</strong>
                  <p>Te hemos enviado un enlace de confirmación.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="newsletter-form">
                <input
                  type="email"
                  placeholder="Tu email aquí"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                  required
                  disabled={estado === 'loading'}
                />
                <button
                  type="submit"
                  className="newsletter-button"
                  disabled={estado === 'loading'}
                >
                  {estado === 'loading' ? 'Enviando...' : 'Suscribirse'}
                </button>

                {(estado === 'error' || estado === 'duplicate') && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="newsletter-error"
                  >
                    ⚠️ {mensaje}
                  </motion.p>
                )}
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
