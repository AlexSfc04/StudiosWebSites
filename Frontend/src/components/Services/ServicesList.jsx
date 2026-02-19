import './ServicesList.css'

function ServicesList() {
  const services = [
    {
      title: 'Diseño Web Profesional',
      description: 'Diseños modernos y atractivos que capturan la esencia de tu marca.',
      features: [
        'Diseño responsive',
        'UI/UX personalizado',
        'Integración de marca',
        'Maquetación optimizada'
      ]
    },
    {
      title: 'Optimización SEO',
      description: 'Mejora tu visibilidad en buscadores y atrae más clientes.',
      features: [
        'Investigación de palabras clave',
        'Optimización on-page',
        'SEO técnico',
        'Seguimiento de rendimiento'
      ]
    },
    {
      title: 'Desarrollo E-commerce',
      description: 'Tiendas online completas listas para vender y hacer crecer tu negocio.',
      features: [
        'Integración de pagos',
        'Gestión de inventario',
        'Carrito de compra',
        'Seguimiento de pedidos'
      ]
    },
    {
      title: 'Panel de Administración',
      description: 'Sistemas de gestión completos para las operaciones de tu negocio.',
      features: [
        'Analíticas del dashboard',
        'Gestión de usuarios',
        'Administración de contenido',
        'Herramientas de reportes'
      ]
    },
    {
      title: 'Mantenimiento y Soporte',
      description: 'Soporte continuo para mantener tu web funcionando sin problemas.',
      features: [
        'Actualizaciones periódicas',
        'Corrección de errores',
        'Parches de seguridad',
        'Soporte técnico 24/7'
      ]
    },
    {
      title: 'Seguridad Web',
      description: 'Protege tu web y los datos de tus clientes con medidas de seguridad avanzadas.',
      features: [
        'Certificados SSL',
        'Protección con firewall',
        'Copias de seguridad',
        'Monitorización de seguridad'
      ]
    },
    {
      title: 'Optimización de Rendimiento',
      description: 'Velocidad de carga rápida y rendimiento óptimo para una mejor experiencia.',
      features: [
        'Optimización de velocidad',
        'Compresión de imágenes',
        'Minificación de código',
        'Integración CDN'
      ]
    }
  ]

  return (
    <section className="services-list-section">
      <div className="services-list-container">
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-description">{service.description}</p>
              <ul className="service-card-features">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="service-feature-item">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="9" stroke="#6366f1" strokeWidth="2"/>
                      <path d="M6 10L9 13L14 7" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesList
