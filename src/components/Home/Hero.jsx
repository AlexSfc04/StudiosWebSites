import { Link } from 'react-router-dom'
import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-title-purple">Your Business</span><br />
            <span className="hero-title-black">Deserves an Web</span><br />
            <span className="hero-title-black">Exceptional</span>
          </h1>
          <p className="hero-description">
            We design and develop professional websites that help 
            businesses grow in the digital world.
          </p>
          <Link to="/contacto" className="hero-btn">
            Get Started Now
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
