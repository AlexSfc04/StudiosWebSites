import { useState } from 'react'
import './Newsletter.css'

function Newsletter() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Email suscrito:', email)
    setEmail('')
  }

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <h2 className="newsletter-title">
            ¿Listo para Llevar<br />
            tu Negocio al<br />
            Siguiente Nivel?
          </h2>
          <p className="newsletter-description">
            Suscríbete a nuestro newsletter y recibe consejos exclusivos
            sobre diseño y desarrollo web.
          </p>

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
        </div>
      </div>
    </section>
  )
}

export default Newsletter
