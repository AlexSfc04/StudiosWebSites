import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useDarkMode } from '../../hooks/useDarkMode'
import {
  Menu,
  Close,
  Settings,
  Logout,
  Login,
  UserFollow,
  Sun,
  Moon,
  UserProfile,
} from '@carbon/icons-react'
import './Header.css'

const NAV_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/sectores', label: 'Sectores' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/blog', label: 'Blog' },
  { to: '/contacto', label: 'Contacto' },
]

// ── Header ──────────────────────────────────────────────────
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout, isAdmin } = useAuth()
  const { theme, toggleTheme } = useDarkMode()          // ← NUEVO
  const navigate = useNavigate()
  const location = useLocation()
  const dropdownRef = useRef(null)

  useEffect(() => {
    setIsMenuOpen(false)
    setIsProfileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isProfileOpen) return
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setIsProfileOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isProfileOpen])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  const handleLogout = () => {
    logout()
    setIsProfileOpen(false)
    setIsMenuOpen(false)
    navigate('/')
  }

  const displayName = user?.name || user?.nombre || user?.email?.split('@')[0] || 'Usuario'
  const initials = displayName.slice(0, 1).toUpperCase()
  const avatarUrl = user?.avatar || null 

  return (
    <>
      <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
        <div className="header-inner">

          {/* Logo */}
          <Link to="/" className="header-logo" aria-label="SWS – Inicio">
            <img src="/logo-studios.png" alt="" className="header-logo__img" aria-hidden="true" />
            <span className="header-logo__text">SWS</span>
          </Link>

          {/* Nav desktop */}
          <nav className="header-nav" aria-label="Navegación principal">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`header-nav__link${location.pathname === to ? ' header-nav__link--active' : ''}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Acciones */}
          <div className="header-actions">

            {/* ── Botón Dark Mode ── */}
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
              title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
            >
              {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
            </button>

            {user ? (
              <div className="profile" ref={dropdownRef}>
              <button
                className="profile__trigger"
                onClick={() => setIsProfileOpen(v => !v)}
                aria-expanded={isProfileOpen}
                aria-haspopup="menu"
                aria-label={`Menú de ${displayName}`}
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="profile__avatar profile__avatar--img"
                  />
                ) : (
                  <span className="profile__avatar" aria-hidden="true">{initials}</span>
                )}
                <span className="profile__name">{displayName}</span>
                <svg
                  className={`profile__chevron${isProfileOpen ? ' profile__chevron--open' : ''}`}
                  width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"
                >
                  <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {isProfileOpen && (
                <div className="profile__dropdown" role="menu">
                  <div className="profile__dropdown-header">
                    <span className="profile__dropdown-name">{displayName}</span>
                    {user?.email && (
                      <span className="profile__dropdown-email">{user.email}</span>
                    )}
                  </div>
                  <div className="profile__dropdown-divider" />

                  {isAdmin && (
                    <Link to="/admin" className="profile__dropdown-item" role="menuitem"
                      onClick={() => setIsProfileOpen(false)}>
                      <Settings size={16} aria-hidden="true" />
                      <span>Admin Panel</span>
                    </Link>
                  )}

                  <Link to="/perfil" className="profile__dropdown-item" role="menuitem"
                    onClick={() => setIsProfileOpen(false)}>
                    <UserProfile size={16} aria-hidden="true" />
                    <span>Configuración de cuenta</span>
                  </Link>

                  <div className="profile__dropdown-divider" />

                  {/* ✅ Toggle modo oscuro */}
                  <button
                    type="button"
                    className="profile__dropdown-item profile__dropdown-item--theme"
                    onClick={toggleTheme}
                    role="menuitem"
                  >
                    {theme === 'dark'
                      ? <Sun size={16} aria-hidden="true" />
                      : <Moon size={16} aria-hidden="true" />
                    }
                    <span>{theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}</span>
                    <span className={`toggle-pill ${theme === 'dark' ? 'toggle-pill--on' : ''}`}>
                      <span className="toggle-pill__thumb" />
                    </span>
                  </button>

                  <div className="profile__dropdown-divider" />

                  <button
                    className="profile__dropdown-item profile__dropdown-item--danger"
                    role="menuitem"
                    onClick={handleLogout}
                  >
                    <Logout size={16} aria-hidden="true" />
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              )}
              </div>
            ) : (
              <div className="header-auth">
                <Link to="/login" className="header-auth__login">Iniciar sesión</Link>
                <Link to="/registro" className="header-auth__register">Registro</Link>
              </div>
            )}

            {/* Hamburger */}
            <button
              className={`hamburger${isMenuOpen ? ' hamburger--open' : ''}`}
              onClick={() => setIsMenuOpen(v => !v)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {isMenuOpen
                ? <Close size={22} aria-hidden="true" />
                : <Menu size={22} aria-hidden="true" />
              }
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil */}
      <div
        id="mobile-menu"
        className={`mobile-menu${isMenuOpen ? ' mobile-menu--open' : ''}`}
        aria-hidden={!isMenuOpen}
      >
        <nav className="mobile-menu__nav" aria-label="Menú móvil">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`mobile-menu__link${location.pathname === to ? ' mobile-menu__link--active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="mobile-menu__footer">
          {user ? (
            <>
              <div className="mobile-menu__user">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="mobile-menu__avatar mobile-menu__avatar--img"
                  />
                ) : (
                  <span className="mobile-menu__avatar">{initials}</span>
                )}
                <div>
                  <p className="mobile-menu__user-name">{displayName}</p>
                  {user?.email && <p className="mobile-menu__user-email">{user.email}</p>}
                </div>
              </div>
              {isAdmin && (
                <Link to="/admin" className="mobile-menu__action"
                  onClick={() => setIsMenuOpen(false)}>
                  <Settings size={16} aria-hidden="true" />
                  Admin Panel
                </Link>
              )}
              <button
                className="mobile-menu__action mobile-menu__action--danger"
                onClick={handleLogout}
              >
                <Logout size={16} aria-hidden="true" />
                Cerrar sesión
              </button>
            </>
          ) : (
            <div className="mobile-menu__auth">
              <Link to="/login"
                className="mobile-menu__btn mobile-menu__btn--ghost"
                onClick={() => setIsMenuOpen(false)}>
                <Login size={16} aria-hidden="true" />
                Iniciar sesión
              </Link>
              <Link to="/registro"
                className="mobile-menu__btn mobile-menu__btn--primary"
                onClick={() => setIsMenuOpen(false)}>
                <UserFollow size={16} aria-hidden="true" />
                Registro
              </Link>
            </div>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu__overlay"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}

export default Header