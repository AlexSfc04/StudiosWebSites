import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedSection from '../AnimatedSection/AnimatedSection'
import './Newsletter.css'

function Newsletter() {
  const [email, setEmail] = useState('')
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setEnviado(true)
    setEmail('')
  }

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <AnimatedSection>
            <h2 className="newsletter-title">
              ¿Listo para Llevar<br />
              tu Negocio al<br />
              Siguiente Nivel?
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="newsletter-description">
              Suscríbete a nuestro newsletter y recibe consejos exclusivos
              sobre diseño y desarrollo web.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            {enviado ? (
              <motion.p
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="newsletter-success"
              >
                ✅ ¡Suscrito correctamente!
              </motion.p>
            ) : (
              <form onSubmit={handleSubmit} className="newsletter-form">
                <input
                  type="email"
                  placeholder="Tu email aquí"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-button">
                  Suscribirse
                </button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
