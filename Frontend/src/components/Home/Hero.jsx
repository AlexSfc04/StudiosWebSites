import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Typewriter from 'typewriter-effect'
import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      {/* Orbes animados de fondo */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      <div className="hero-container">
        <div className="hero-content">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="hero-title-purple">
              <Typewriter
                options={{
                  strings: ['Tu Negocio', 'Tu Marca', 'Tu Empresa', 'Tu Proyecto'],
                  autoStart: true,
                  loop: true,
                  delay: 80,
                  deleteSpeed: 50,
                }}
              />
            </span>
            <span className="hero-title-black">Merece una Web</span><br />
            <span className="hero-title-black">Excepcional</span>
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            Diseñamos y desarrollamos sitios web profesionales que ayudan
            a los negocios a crecer en el mundo digital.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
          >
            <Link to="/contacto" className="hero-btn">
              Empieza Ahora
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
