import AnimatedSection from '../AnimatedSection/AnimatedSection'
import './WhyUs.css'
import { useRef } from 'react'

function WhyUs() {
  const features = [
    {
      icon: '⚡',
      title: 'Desarrollo Rápido',
      description: 'Lanzamos tu proyecto en el menor tiempo posible.',
    },
    {
      icon: '💬',
      title: 'Soporte Real',
      description: 'Siempre disponibles para ayudarte cuando lo necesites.',
    },
    {
      icon: '🌐',
      title: 'Optimización Web',
      description: 'Diseños únicos adaptados a tu marca y objetivos.',
    },
    {
      icon: '📱',
      title: 'Diseño Responsive',
      description: 'Tu web se verá perfecta en cualquier dispositivo.',
    },
  ]

  return (
    <section className="why-us-section">
      <div className="why-us-container">
        <AnimatedSection>
          <div className="why-us-header">
            <h2 className="why-us-title">¿Por Qué Elegirnos?</h2>
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
function FeatureCard({ feature }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
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
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
  }

  return (
    <div
      ref={cardRef}
      className="feature-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="feature-icon">{feature.icon}</div>
      <h3 className="feature-title">{feature.title}</h3>
      <p className="feature-description">{feature.description}</p>
    </div>
  )
}


export default WhyUs
