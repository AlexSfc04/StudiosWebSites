import { useRef } from 'react'
import AnimatedSection from '../AnimatedSection/AnimatedSection'
import './WhyUs.css'

function FeatureCard({ feature }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
  }

  return (
    <div
      ref={cardRef}
      className="feature-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="feature-icon">
        <img
          src={feature.iconUrl}
          alt={feature.iconAlt || feature.title}
          className="feature-icon-img"
          loading="lazy"
          decoding="async"
        />
      </div>
      <h3 className="feature-title">{feature.title}</h3>
      <p className="feature-description">{feature.description}</p>
    </div>
  )
}

function WhyUs() {
  const features = [
    {
      iconUrl: 'https://res.cloudinary.com/dzmgxz55b/image/upload/v1772700667/tiempo_vrohym.png',
      iconAlt: 'Icono de velocidad',
      title: 'Desarrollo rápido',
      description: 'Lanzamos tu proyecto en el menor tiempo posible.',
    },
    {
      iconUrl: 'https://res.cloudinary.com/dzmgxz55b/image/upload/v1772700667/soporte_eulvnj.png',
      iconAlt: 'Icono de soporte',
      title: 'Soporte real',
      description: 'Siempre disponibles para ayudarte cuando lo necesites.',
    },
    {
      iconUrl: 'https://res.cloudinary.com/dzmgxz55b/image/upload/v1772700667/optimizar_sg6rtd.png',
      iconAlt: 'Icono de optimización web',
      title: 'Optimización web',
      description: 'Diseños únicos adaptados a tu marca y objetivos.',
    },
    {
      iconUrl: 'https://res.cloudinary.com/dzmgxz55b/image/upload/v1772700667/dise%C3%B1o_ums47i.png',
      iconAlt: 'Icono de responsive',
      title: 'Diseño responsive',
      description: 'Tu web se verá perfecta en cualquier dispositivo.',
    },
  ]

  return (
    <section className="why-us-section">
      <div className="why-us-container">
        <AnimatedSection>
          <div className="why-us-header">
            <h2 className="why-us-title">¿Por qué elegirnos?</h2>
            <p className="why-us-subtitle">
              Combinamos creatividad, tecnología y dedicación para crear
              experiencias web excepcionales.
            </p>
          </div>
        </AnimatedSection>

        <div className="features-grid">
          {features.map((feature, index) => (
            <AnimatedSection key={index} delay={index * 0.1} direction="up">
              <FeatureCard feature={feature} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUs
