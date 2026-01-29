function PortfolioPage() {
  const projects = [
    { id: 1, title: 'Proyecto 1', category: 'E-commerce', image: '📷' },
    { id: 2, title: 'Proyecto 2', category: 'Restaurante', image: '📷' },
    { id: 3, title: 'Proyecto 3', category: 'Consultoría', image: '📷' },
  ]

  return (
    <div className="portfolio-page">
      <h1>Nuestro Portfolio</h1>
      <div className="portfolio-grid">
        {projects.map(project => (
          <div key={project.id} className="portfolio-card">
            <div className="portfolio-image">{project.image}</div>
            <h3>{project.title}</h3>
            <p>{project.category}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PortfolioPage
