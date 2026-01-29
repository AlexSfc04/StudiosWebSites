import { Link } from 'react-router-dom'
import './CTA.css'

function CTA() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">
            ¿Listo para Empezar tu Proyecto?
          </h2>
          <p className="cta-description">
            Hablemos de tu idea y creemos algo increíble juntos. 
            Contáctanos hoy mismo para una consulta gratuita.
          </p>
          <Link to="/contacto" className="btn btn-primary">
            Contacta Ahora
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CTA
