import './Services.css'

function Services() {
  const services = [
    { name: 'Diseño Profesional', icon: '✓' },
    { name: 'Funcionalidad', icon: '✓' },
    { name: 'Identidad de Marca', icon: '✓' },
    { name: 'Contenido SEO', icon: '✓' },
  ]

  return (
    <section className="services-section">
      <div className="services-container">
        <div className="services-header">
          <h2 className="services-title">Nuestros Servicios</h2>
          <p className="services-subtitle">
            Ofrecemos soluciones completas para tu presencia digital.
          </p>
        </div>

        <div className="services-list">
          {services.map((service, index) => (
            <div key={index} className="service-item">
              <div className="service-check">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="9" stroke="#10b981" strokeWidth="2"/>
                  <path d="M6 10L9 13L14 7" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="service-name">{service.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
