import AnimatedSection from '../AnimatedSection/AnimatedSection'
import './Services.css'
import { CheckmarkFilled } from '@carbon/icons-react'

function Services() {
  const services = [
    { name: 'Diseño profesional'},
    { name: 'Funcionalidad'},
    { name: 'Identidad de marca'},
    { name: 'Contenido SEO'},
  ]

  return (
    <section className="services-section">
      <div className="services-container">
        <AnimatedSection>
          <div className="services-header">
            <h2 className="services-title">Nuestros servicios</h2>
            <p className="services-subtitle">
              Ofrecemos soluciones completas para tu presencia digital.
            </p>
          </div>
        </AnimatedSection>

        <div className="services-list">
          {services.map((service, index) => (
            <AnimatedSection key={index} delay={index * 0.1} direction="left">
              <div className="service-item">
                <div className="service-check">
                  <CheckmarkFilled size={20} />
                </div>
                <span className="service-name">{service.name}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
