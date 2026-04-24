import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import {
  Menu,           // hamburguesa
  Close,          // cerrar menú
  UserAvatar,     // perfil usuario
  Settings,       // admin panel
  Logout,         // cerrar sesión
  Login,          // iniciar sesión
  UserFollow,     // registro
} from '@carbon/icons-react'
import './Header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen)
  const closeProfile = () => setIsProfileOpen(false)

  const handleLogout = () => {
    logout()
    closeProfile()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-container">

        {/* 1. Logo */}
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src="/logo-studios.png" alt="SWS Logo" className="logo-icon" />
          <span>SWS</span>
        </Link>

        {/* 2. Nav */}
        <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={closeMenu}>Inicio</Link>
          <Link to="/servicios" className="nav-link" onClick={closeMenu}>Servicios</Link>
          <Link to="/sectores" className="nav-link" onClick={closeMenu}>Sectores</Link>
          <Link to="/portfolio" className="nav-link" onClick={closeMenu}>Portfolio</Link>
          <Link to="/blog" className="nav-link" onClick={closeMenu}>Blog</Link>
          <Link to="/contacto" className="nav-link" onClick={closeMenu}>Contacto</Link>

          {/* ✅ Perfil en menú móvil */}
                  {user && (
          <div className="nav-mobile-user">
            <div className="nav-mobile-user-card">
              <div className="nav-mobile-user-top">
                <div className="nav-mobile-avatar">
                  <UserAvatar size={18} aria-hidden="true" />
                </div>

                <div className="nav-mobile-user-info">
                  <span className="nav-mobile-user-label">Sesión iniciada</span>
                  <span className="nav-mobile-username">
                    {user?.name || user?.nombre || user?.email}
                  </span>
                </div>
              </div>

              <div className="nav-mobile-user-actions">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="nav-mobile-action"
                    onClick={closeMenu}
                  >
                    <Settings size={18} aria-hidden="true" />
                    <span>Admin Panel</span>
                  </Link>
                )}

                <button
                  className="nav-mobile-action nav-mobile-logout"
                  onClick={() => {
                    handleLogout()
                    closeMenu()
                  }}
                >
                  <Logout size={18} aria-hidden="true" />
                  <span>Cerrar sesión</span>
                </button>
              </div>
            </div>
          </div>
        )}
        </nav>

        {/* 3. Actions */}
        <div className="header-actions">
          {user ? (
            <div className="profile-container">
              <button className="profile-button" onClick={toggleProfile}>
                <UserAvatar size={20} aria-hidden="true" />
                <span className="profile-name">
                  {user?.name || user?.nombre || user?.email}
                </span>
              </button>
              {isProfileOpen && (
                <>
                  <div className="profile-overlay" onClick={closeProfile} />
                  <div className="profile-dropdown">
                    {isAdmin && (
                      <Link to="/admin" className="dropdown-item" onClick={closeProfile}>
                        <Settings size={16} aria-hidden="true" />
                        Admin Panel
                      </Link>
                    )}
                    <button className="dropdown-item dropdown-logout" onClick={handleLogout}>
                      <Logout size={16} aria-hidden="true" />
                      Cerrar sesión
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="header-auth">
              <Link to="/login" className="btn-login desktop-only">
                <Login size={16} aria-hidden="true" />
                Iniciar sesión
              </Link>
              <Link to="/registro" className="btn-register desktop-only">
                <UserFollow size={16} aria-hidden="true" />
                Registro
              </Link>
              <Link to="/login" className="btn-entrar mobile-only">
                <Login size={16} aria-hidden="true" />
                Entrar
              </Link>
            </div>
          )}
        </div>

        {/* 4. Hamburguesa */}
        <button
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen
            ? <Close size={24} aria-hidden="true" />
            : <Menu size={24} aria-hidden="true" />
          }
        </button>

      </div>
    </header>
  )
}

export default Header