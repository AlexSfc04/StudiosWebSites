function ServicesPage() {
  const services = [
    { id: 1, title: 'Diseño Web', description: 'Diseño moderno y responsivo' },
    { id: 2, title: 'Desarrollo', description: 'Desarrollo con React y tecnologías modernas' },
    { id: 3, title: 'Marketing Digital', description: 'Estrategias de marketing efectivas' },
  ]

  return (
    <div className="services-page">
      <h1>Nuestros Servicios</h1>
      <div className="services-grid">
        {services.map(service => (
          <div key={service.id} className="service-card">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServicesPage
