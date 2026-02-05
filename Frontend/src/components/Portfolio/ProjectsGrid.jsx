import { useState } from 'react'
import { Link } from 'react-router-dom'
import './ProjectsGrid.css'

function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState('all')

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'restaurants', name: 'Restaurants' },
    { id: 'beauty', name: 'Beauty Salons' },
    { id: 'commerce', name: 'Commerce' },
    { id: 'services', name: 'Services' },
    { id: 'others', name: 'Others' },
  ]

  // Aquí irán los proyectos reales
  const projects = [
    // Ejemplo de estructura de proyecto (comentado porque no hay proyectos aún)
    // {
    //   id: 1,
    //   title: 'Restaurant La Bella',
    //   category: 'restaurants',
    //   image: '/images/projects/project1.jpg',
    //   description: 'Modern restaurant website with online reservations',
    //   link: '/portfolio/restaurant-bella'
    // },
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  return (
    <section className="projects-section">
      <div className="projects-container">
        {/* Filtros */}
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

        {/* Grid de proyectos o mensaje vacío */}
        {filteredProjects.length > 0 ? (
          <div className="projects-grid">
            {filteredProjects.map(project => (
              <Link 
                key={project.id} 
                to={project.link} 
                className="project-card"
              >
                <div className="project-image-container">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="project-image"
                  />
                  <div className="project-overlay">
                    <span className="project-view-btn">View Project</span>
                  </div>
                </div>
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <svg className="empty-icon" width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="38" stroke="#e5e7eb" strokeWidth="4"/>
              <path d="M40 20V60M20 40H60" stroke="#e5e7eb" strokeWidth="4" strokeLinecap="round"/>
            </svg>
            <h3 className="empty-title">No projects yet in this category</h3>
            <p className="empty-description">
              We're working on amazing projects. Stay tuned for updates!
            </p>
            <Link to="/contacto" className="empty-btn">
              Start Your Project
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProjectsGrid
