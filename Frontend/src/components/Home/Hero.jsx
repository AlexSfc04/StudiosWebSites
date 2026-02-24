import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="hero-title-purple">Tu Negocio</span><br />
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
