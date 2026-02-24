import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../services/api'
import './ProjectPage.css'

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

  return (
    <div className="project-page">
      <div className="project-page-inner">
        {project.image && (
          <div className="project-page-image-wrapper">
            <img src={project.image} alt={project.title} className="project-page-image" />
          </div>
        )}

        <h1 className="project-page-title">{project.title}</h1>

        <p className="project-page-meta">
          Categoría: <span>{project.category}</span>
          {project.featured && <span className="project-page-badge">Destacado</span>}
        </p>

        <p className="project-page-description">{project.description}</p>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="project-page-button"
          >
            Ver web del proyecto
          </a>
        )}
      </div>
    </div>
  )
}

export default ProjectPage
