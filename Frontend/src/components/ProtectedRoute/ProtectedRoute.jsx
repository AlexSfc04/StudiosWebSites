import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import './ProtectedRoute.css'
import { Locked } from '@carbon/icons-react'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="protected-loading" />
  }

  if (!user) {
    return (
      <div className="protected-container">
        <div className="protected-card">
          <h2 className="protected-title">🔒 Contenido Exclusivo</h2>
          <p className="protected-text">
            Regístrate o inicia sesión para acceder al portfolio y blog con nuestros proyectos y artículos más recientes.
          </p>
          <div className="protected-buttons">
            <Link to="/login" className="protected-btn-primary">
              Iniciar Sesión
            </Link>
            <Link to="/registro" className="protected-btn-secondary">
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return children
}

export default ProtectedRoute
