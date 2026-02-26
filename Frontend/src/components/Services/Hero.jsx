import { Link } from 'react-router-dom'
import './Hero.css'

function Hero() {
  return (
    <section className="services-hero">
      <div className="services-hero-container">
        <h1 className="services-hero-title">
          Todo lo que necesitas para<br />
          tu presencia digital
        </h1>
        <p className="services-hero-description">
          Ofrecemos soluciones completas de diseño y desarrollo web
          adaptadas a las necesidades de tu negocio. Desde el concepto
          hasta el lanzamiento, estamos contigo en cada paso.
        </p>
        <Link to="/contacto" className="services-hero-btn">
          Empieza ahora
        </Link>
      </div>
    </section>
  )
}

export default Hero
