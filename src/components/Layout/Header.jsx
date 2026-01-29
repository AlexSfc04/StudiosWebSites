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
                <svg className="profile-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z" fill="currentColor"/>
                  <path d="M10 12C4.47715 12 0 14.4772 0 17.5V20H20V17.5C20 14.4772 15.5228 12 10 12Z" fill="currentColor"/>
                </svg>
                <span className="profile-name">{user.name}</span>
                <svg 
                  className={`profile-arrow ${isProfileOpen ? 'active' : ''}`} 
                  width="12" 
                  height="12" 
                  viewBox="0 0 12 12" 
                  fill="none"
                >
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
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
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                      Admin Panel
                    </Link>
                    <button 
                      className="dropdown-item dropdown-logout"
                      onClick={handleLogout}
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M7 2H3C2.44772 2 2 2.44772 2 3V15C2 15.5523 2.44772 16 3 16H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M12 12L16 8L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 8H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
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
