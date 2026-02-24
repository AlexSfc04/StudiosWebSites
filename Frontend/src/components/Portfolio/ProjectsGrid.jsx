import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import './ProjectsGrid.css'

function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'restaurants', name: 'Restaurantes' },
    { id: 'beauty', name: 'Salones de Belleza' },
    { id: 'commerce', name: 'Comercio' },
    { id: 'services', name: 'Servicios' },
    { id: 'others', name: 'Otros' },
  ]

  useEffect(() => {
    api.getProjects()
      .then(data => setProjects(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false))
  }, [])

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter)

  if (loading) return <div className="empty-state"><p>Cargando proyectos...</p></div>

  return (
    <section className="projects-section">
      <div className="projects-container">
        <div className="filters-container">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {filteredProjects.length > 0 ? (
          <div className="projects-grid">
            {filteredProjects.map(project => (
              <a key={project.id} href={project.link} target="_blank" rel="noreferrer" className="project-card">
                <div className="project-image-container">
                  <img src={project.image} alt={project.title} className="project-image" />
                  <div className="project-overlay">
                    <span className="project-view-btn">Ver Proyecto</span>
                  </div>
                </div>
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <svg className="empty-icon" width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="38" stroke="#e5e7eb" strokeWidth="4"/>
              <path d="M40 20V60M20 40H60" stroke="#e5e7eb" strokeWidth="4" strokeLinecap="round"/>
            </svg>
            <h3 className="empty-title">Aún no hay proyectos en esta categoría</h3>
            <p className="empty-description">Estamos trabajando en proyectos increíbles. ¡Vuelve pronto!</p>
            <Link to="/contacto" className="empty-btn">Inicia tu Proyecto</Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProjectsGrid
