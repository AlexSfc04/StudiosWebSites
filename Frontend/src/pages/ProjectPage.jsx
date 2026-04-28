import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'
import './ProjectPage.css'
import SEO from '../components/SEO/SEO'

function ProjectPage() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getProject(id)
      .then(data => setProject(data || null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="project-page">Cargando...</div>
  if (!project) return <div className="project-page">Proyecto no encontrado</div>

  const description = project.description
    ? project.description.replace(/\s+/g, ' ').trim().slice(0, 160)
    : 'Proyecto web de StudiosWebSites.'

  return (
    <div className="project-page">
      <SEO
        title={project.title}
        description={description}
        canonical={`https://studioswebsites.com/portfolio/${id}`}
        image={project.image}
      />
      <div className="project-page-inner">
        {project.image && (
          <div className="project-page-image-wrapper">
            <img src={project.image} alt={project.title} className="project-page-image" />
          </div>
        )}

        <h1 className="project-page-title">{project.title}</h1>
        <div className="project-page-meta">
          {project.category && <span className="project-page-badge">{project.category}</span>}
          {project.link && (
            <a
              className="project-page-button"
              href={project.link}
              target="_blank"
              rel="noreferrer"
            >
              Ver proyecto
            </a>
          )}
        </div>

        <p className="project-page-description">{project.description}</p>
      </div>
    </div>
  )
}

export default ProjectPage
