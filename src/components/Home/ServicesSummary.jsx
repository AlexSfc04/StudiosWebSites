import { Link } from 'react-router-dom'
import './ServicesSummary.css'

function ServicesSummary() {
  const services = [
    {
      icon: '🎨',
      title: 'Diseño Web',
      description: 'Diseños modernos y responsivos que capturan la esencia de tu marca.',
    },
    {
      icon: '💻',
      title: 'Desarrollo',
      description: 'Desarrollo con las últimas tecnologías para sitios web rápidos y seguros.',
    },
    {
      icon: '📱',
      title: 'Marketing Digital',
      description: 'Estrategias efectivas para aumentar tu presencia online.',
    },
  ]

  return (
    <section className="services-summary-section section">
      <div className="container">
        <div className="section-title">
          <span className="badge">Nuestros Servicios</span>
          <h2>Todo lo que Necesitas para una Web Excepcional</h2>
          <p>
            Ofrecemos soluciones completas de diseño y desarrollo web 
            adaptadas a las necesidades de tu negocio.
          </p>
        </div>

        <div className="services-grid grid grid-3">
          {services.map((service, index) => (
            <div key={index} className="service-card card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <Link to="/servicios" className="service-link">
                Saber más →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSummary
