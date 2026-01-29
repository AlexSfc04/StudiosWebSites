import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen)
  }

  const closeProfile = () => {
    setIsProfileOpen(false)
  }

  // Usuario de ejemplo (luego lo puedes conectar con autenticación real)
  const user = {
    name: 'Alejandro Amor Rico',
    isLoggedIn: true
  }

  const handleLogout = () => {
    console.log('Logging out...')
    closeProfile()
    // Aquí irá la lógica de logout real
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src="/logo-studios.png" alt="SWS Logo" className="logo-icon" />
          <span>SWS</span>
        </Link>

        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/servicios" className="nav-link" onClick={closeMenu}>
            Services
          </Link>
          <Link to="/sectores" className="nav-link" onClick={closeMenu}>
            Sectors
          </Link>
          <Link to="/portfolio" className="nav-link" onClick={closeMenu}>
            Portfolio
          </Link>
          <Link to="/sobre-mi" className="nav-link" onClick={closeMenu}>
            Blog
          </Link>
          <Link to="/contacto" className="nav-link" onClick={closeMenu}>
            Contact
          </Link>
        </nav>

        <div className="header-actions">
          {/* Botón Start Project */}
          <Link to="/contacto" className="btn-start-project">
            Start Project
          </Link>

          {/* Perfil de usuario */}
          {user.isLoggedIn && (
            <div className="profile-container">
              <button 
                className="profile-button"
                onClick={toggleProfile}
                aria-label="User profile"
              >
                <span className="profile-name">{user.name}</span>
              </button>

              {/* Dropdown menu */}
              {isProfileOpen && (
                <>
                  <div className="profile-overlay" onClick={closeProfile}></div>
                  <div className="profile-dropdown">
                    <Link 
                      to="/admin" 
                      className="dropdown-item"
                      onClick={closeProfile}
                    >
                      
                      Admin Panel
                    </Link>
                    <button 
                      className="dropdown-item dropdown-logout"
                      onClick={handleLogout}
                    >
                      
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
