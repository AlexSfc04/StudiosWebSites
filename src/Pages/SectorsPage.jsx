function SectorsPage() {
  const sectors = [
    { id: 1, name: 'E-commerce', icon: '🛍️' },
    { id: 2, name: 'Restaurantes', icon: '🍽️' },
    { id: 3, name: 'Abogados', icon: '⚖️' },
    { id: 4, name: 'Inmobiliario', icon: '🏠' },
  ]

  return (
    <div className="sectors-page">
      <h1>Sectores que servimos</h1>
      <div className="sectors-grid">
        {sectors.map(sector => (
          <div key={sector.id} className="sector-card">
            <div className="sector-icon">{sector.icon}</div>
            <h3>{sector.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SectorsPage
