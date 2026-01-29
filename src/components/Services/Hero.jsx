import { Link } from 'react-router-dom'
import './Hero.css'

function Hero() {
  return (
    <section className="services-hero">
      <div className="services-hero-container">
        <h1 className="services-hero-title">
          Everything You Need for<br />
          Your Digital Presence
        </h1>
        <p className="services-hero-description">
          We offer comprehensive web design and development solutions 
          tailored to your business needs. From concept to launch, 
          we're with you every step of the way.
        </p>
        <Link to="/contacto" className="services-hero-btn">
          Get Started Now
        </Link>
      </div>
    </section>
  )
}

export default Hero
