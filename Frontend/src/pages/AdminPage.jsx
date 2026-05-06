import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './AdminPage.css'
import SEO from '../components/SEO/SEO'
import {
  Dashboard,
  Portfolio,
  Edit,
  Settings,
  Email,
  Logout,
  ArrowLeft,
  User,
  ChevronRight,
  Notification,
  DataTable,
  Globe,
  Add,
  Time,
  CheckmarkFilled,
  WarningFilled,
} from '@carbon/icons-react'

function AdminPage() {
  const { user, logout, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    if (loading) return

    if (!user) {
      navigate('/login')
    } else if (user.role !== 'admin') {
      navigate('/')
    }
  }, [user, loading, navigate])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  if (loading) return null
  if (!user || user.role !== 'admin') return null

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const greeting = () => {
    const h = currentTime.getHours()
    if (h < 12) return 'Buenos días'
    if (h < 20) return 'Buenas tardes'
    return 'Buenas noches'
  }

  const cards = [
    {
      icon: <Portfolio size={24} />,
      title: 'Proyectos',
      desc: 'Gestiona tu portfolio',
      color: 'indigo',
      path: '/admin/projects',
      tag: 'Activo',
      tagOk: true,
    },
    {
      icon: <Edit size={24} />,
      title: 'Blog',
      desc: 'Gestiona artículos',
      color: 'violet',
      path: '/admin/articles',
      tag: 'Activo',
      tagOk: true,
    },
    {
      icon: <Settings size={24} />,
      title: 'Servicios',
      desc: 'Editar servicios',
      color: 'cyan',
      path: null,
      tag: 'Próximamente',
      tagOk: false,
    },
    {
      icon: <Email size={24} />,
      title: 'Contactos',
      desc: 'Ver mensajes',
      color: 'emerald',
      path: null,
      tag: 'Próximamente',
      tagOk: false,
    },
    {
      icon: <DataTable size={24} />,
      title: 'Analíticas',
      desc: 'Estadísticas del sitio',
      color: 'amber',
      path: null,
      tag: 'Próximamente',
      tagOk: false,
    },
    {
      icon: <Globe size={24} />,
      title: 'Web pública',
      desc: 'Ver studioswebsites.com',
      color: 'slate',
      path: '/',
      tag: 'Enlace',
      tagOk: true,
    },
  ]

  const quickActions = [
    { label: 'Nuevo proyecto', icon: <Add size={16} />, path: '/admin/projects' },
    { label: 'Nuevo artículo', icon: <Add size={16} />, path: '/admin/articles' },
    { label: 'Ver la web', icon: <Globe size={16} />, path: '/' },
  ]

  const formatDate = (d) =>
    d.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

  const isActive = (path) => location.pathname === path

  return (
    <div className="adm-root">
      <SEO
        title="Panel de administración"
        description="Administra proyectos, artículos y contenido de StudiosWebSites desde el panel privado."
        canonical="https://studioswebsites.com/admin"
        robots="noindex,nofollow"
      />

      <aside className="adm-sidebar">
        <div className="adm-sidebar-logo">
          <img src="/logo-studios.png" alt="SWS" className="adm-sidebar-logo-img" />
          <span>SWS</span>
          <span className="adm-sidebar-badge">Admin</span>
        </div>

        <nav className="adm-sidebar-nav">
          <p className="adm-sidebar-section-label">Panel</p>

          <Link
            to="/admin"
            className={`adm-sidebar-link ${isActive('/admin') ? 'adm-sidebar-link--active' : ''}`}
          >
            <Dashboard size={18} /> Dashboard
          </Link>

          <Link
            to="/admin/projects"
            className={`adm-sidebar-link ${isActive('/admin/projects') ? 'adm-sidebar-link--active' : ''}`}
          >
            <Portfolio size={18} /> Proyectos
          </Link>

          <Link
            to="/admin/articles"
            className={`adm-sidebar-link ${isActive('/admin/articles') ? 'adm-sidebar-link--active' : ''}`}
          >
            <Edit size={18} /> Blog
          </Link>

          <p className="adm-sidebar-section-label" style={{ marginTop: '24px' }}>
            Próximamente
          </p>

          <span className="adm-sidebar-link adm-sidebar-link--disabled">
            <Settings size={18} /> Servicios
          </span>
          <span className="adm-sidebar-link adm-sidebar-link--disabled">
            <Email size={18} /> Contactos
          </span>
          <span className="adm-sidebar-link adm-sidebar-link--disabled">
            <DataTable size={18} /> Analíticas
          </span>
        </nav>

        <div className="adm-sidebar-footer">
          <Link to="/" className="adm-sidebar-link">
            <ArrowLeft size={18} /> Volver a la web
          </Link>

          <button className="adm-sidebar-logout" onClick={handleLogout}>
            <Logout size={18} /> Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="adm-main">
        <header className="adm-topbar">
          <div className="adm-topbar-left">
            <h1 className="adm-topbar-title">Dashboard</h1>
            <span className="adm-topbar-date">
              <Time size={14} />
              {formatDate(currentTime)}
            </span>
          </div>

          <div className="adm-topbar-right">
            <button className="adm-topbar-icon-btn" aria-label="Notificaciones">
              <Notification size={18} />
            </button>

            <div className="adm-topbar-user">
              <div className="adm-topbar-avatar">
                <User size={16} />
              </div>
              <div className="adm-topbar-user-info">
                <span className="adm-topbar-user-name">{user?.name || user?.email}</span>
                <span className="adm-topbar-user-role">Administrador</span>
              </div>
            </div>
          </div>
        </header>

        <div className="adm-content">
          <div className="adm-greeting">
            <div>
              <h2 className="adm-greeting-title">
                {greeting()}, {user?.name?.split(' ')[0] || 'Admin'} 👋
              </h2>
              <p className="adm-greeting-sub">Aquí tienes el resumen de StudiosWebSites.</p>
            </div>

            <div className="adm-quick-actions">
              {quickActions.map((a) => (
                <button key={a.label} className="adm-quick-btn" onClick={() => navigate(a.path)}>
                  {a.icon} {a.label}
                </button>
              ))}
            </div>
          </div>

          <section className="adm-section">
            <h3 className="adm-section-title">Módulos</h3>

            <div className="adm-cards">
              {cards.map((card) => (
                <div
                  key={card.title}
                  className={`adm-card adm-card--${card.color} ${!card.path ? 'adm-card--disabled' : ''}`}
                  onClick={() => card.path && navigate(card.path)}
                  role={card.path ? 'button' : undefined}
                  tabIndex={card.path ? 0 : undefined}
                  onKeyDown={(e) => e.key === 'Enter' && card.path && navigate(card.path)}
                >
                  <div className="adm-card-header">
                    <div className="adm-card-icon">{card.icon}</div>

                    <span className={`adm-card-tag ${card.tagOk ? 'adm-card-tag--ok' : 'adm-card-tag--soon'}`}>
                      {card.tagOk ? <CheckmarkFilled size={10} /> : <WarningFilled size={10} />}
                      {card.tag}
                    </span>
                  </div>

                  <h4 className="adm-card-title">{card.title}</h4>
                  <p className="adm-card-desc">{card.desc}</p>

                  {card.path && (
                    <div className="adm-card-arrow">
                      <ChevronRight size={16} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <div className="adm-info-strip">
            <div className="adm-info-item">
              <span className="adm-info-label">Web</span>
              <a
                href="https://www.studioswebsites.com"
                target="_blank"
                rel="noopener noreferrer"
                className="adm-info-value adm-info-link"
              >
                studioswebsites.com <ChevronRight size={12} />
              </a>
            </div>

            <div className="adm-info-divider" />

            <div className="adm-info-item">
              <span className="adm-info-label">Sesión</span>
              <span className="adm-info-value">{user?.email}</span>
            </div>

            <div className="adm-info-divider" />

            <div className="adm-info-item">
              <span className="adm-info-label">Rol</span>
              <span className="adm-info-value adm-info-value--admin">Administrador</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminPage