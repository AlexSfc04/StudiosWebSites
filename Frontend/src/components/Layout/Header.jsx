import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './Header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { user, logout, isAdmin } = useAuth()  // ← añade isAdmin
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
    </nav>

    {/* 3. Actions */}
    <div className="header-actions">
      {user ? (
        <div className="profile-container">
          <button className="profile-button" onClick={toggleProfile}>
            <span className="profile-name">
              {user?.name || user?.nombre || user?.email}
            </span>
          </button>
          {isProfileOpen && (
            <>
              <div className="profile-overlay" onClick={closeProfile}></div>
              <div className="profile-dropdown">
                {isAdmin && (
                  <Link to="/admin" className="dropdown-item" onClick={closeProfile}>
                    Admin Panel
                  </Link>
                )}
                <button className="dropdown-item dropdown-logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="header-auth">
          <Link to="/login" className="btn-login">Iniciar sesión</Link>
          <Link to="/registro" className="btn-register">Registro</Link>
        </div>
      )}
    </div>

    {/* 4. Hamburger al final ✅ */}
    <button
      className={`hamburger ${isMenuOpen ? 'active' : ''}`}
      onClick={toggleMenu}
      aria-label="Toggle menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

  </div>
</header>

  )
}

export default Header
