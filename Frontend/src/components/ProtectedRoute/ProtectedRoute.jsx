import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { Login, UserFollow, Locked } from '@carbon/icons-react'
import './ProtectedRoute.css'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="pr-loading">
        <div className="pr-loading__spinner" aria-label="Cargando..." />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="pr-wall">
        <div className="pr-card">

          <div className="pr-card__icon">
            <Locked size={28} aria-hidden="true" />
          </div>

          <h2 className="pr-card__title">Contenido exclusivo</h2>

          <p className="pr-card__text">
            Regístrate o inicia sesión para acceder al portfolio y blog
            con nuestros proyectos y artículos más recientes.
          </p>

          <div className="pr-card__actions">
            <Link to="/login" className="pr-btn pr-btn--primary">
              <Login size={16} aria-hidden="true" />
              Iniciar sesión
            </Link>
            <Link to="/registro" className="pr-btn pr-btn--outline">
              <UserFollow size={16} aria-hidden="true" />
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