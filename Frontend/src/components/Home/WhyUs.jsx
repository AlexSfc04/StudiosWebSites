import AnimatedSection from '../AnimatedSection/AnimatedSection'
import './WhyUs.css'

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
              <div className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUs
