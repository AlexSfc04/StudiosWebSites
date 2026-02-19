import { Link } from 'react-router-dom'
import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-title-purple">Tu Negocio</span><br />
            <span className="hero-title-black">Merece una Web</span><br />
            <span className="hero-title-black">Excepcional</span>
          </h1>
          <p className="hero-description">
            Diseñamos y desarrollamos sitios web profesionales que ayudan
            a los negocios a crecer en el mundo digital.
          </p>
          <Link to="/contacto" className="hero-btn">
            Empieza Ahora
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
