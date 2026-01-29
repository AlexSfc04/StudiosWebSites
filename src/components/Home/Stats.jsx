import './Stats.css'

function Stats() {
  const stats = [
    { number: '50+', label: 'Projects' },
    { number: '100%', label: 'Clients' },
    { number: '24/7', label: 'Support' },
  ]

  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
