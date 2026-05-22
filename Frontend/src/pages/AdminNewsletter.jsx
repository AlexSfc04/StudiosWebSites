import { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import api from '../services/api'
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
  Notification,
  DataTable,
  Globe,
  Time,
  Send,
} from '@carbon/icons-react'

const buildLocalDateTime = (date = new Date()) => {
  const pad = (value) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

const emptyForm = {
  subject: '',
  html: '',
  scheduledAt: buildLocalDateTime(new Date(Date.now() + 60 * 60 * 1000)),
}

function AdminNewsletter() {
  const { user, logout, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [campaigns, setCampaigns] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState(null)
  const [confirmedSubscribers, setConfirmedSubscribers] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    if (loading) return
    setAuthChecked(true)

    if (!user) {
      navigate('/login')
      return
    }
    if (user.role !== 'admin') {
      navigate('/')
      return
    }
    loadCampaigns()
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [user, loading, navigate])

  const loadCampaigns = async () => {
    setLoading(true)
    try {
      const data = await api.getNewsletterCampaigns()
      setCampaigns(Array.isArray(data.campaigns) ? data.campaigns : [])
      setConfirmedSubscribers(data.confirmedSubscribers || 0)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus(null)
    setSaving(true)

    if (!form.subject.trim() || !form.html.trim()) {
      setStatus({ type: 'error', message: 'Completa el asunto y el contenido de la campaña.' })
      setSaving(false)
      return
    }

    try {
      const body = {
        subject: form.subject.trim(),
        html: form.html,
        scheduledAt: form.scheduledAt,
      }
      const res = await api.createNewsletterCampaign(body)
      if (res.campaign?.id) {
        setCampaigns([res.campaign, ...campaigns])
        setStatus({ type: 'success', message: 'Campaña programada correctamente.' })
        setForm(emptyForm)
      } else {
        setStatus({ type: 'error', message: res.message || 'No se pudo programar la campaña.' })
      }
    } catch (error) {
      console.error(error)
      setStatus({ type: 'error', message: 'Error al programar la campaña.' })
    } finally {
      setSaving(false)
    }
  }

  const handleSendNow = async () => {
    setStatus(null)
    setSending(true)
    try {
      const res = await api.sendNewsletterCampaigns()
      setStatus({ type: 'success', message: res.message || 'Campañas enviadas.' })
      await loadCampaigns()
    } catch (error) {
      console.error(error)
      setStatus({ type: 'error', message: 'Error al enviar las campañas pendientes.' })
    } finally {
      setSending(false)
    }
  }

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString('es-ES', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

  const isActive = (path) => location.pathname === path

  if (loading || !authChecked) {
    return (
      <div className="adm-root">
        <main className="adm-main">
          <div className="adm-content" style={{ padding: '40px', color: '#64748b' }}>
            Cargando administración...
          </div>
        </main>
      </div>
    )
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="adm-root">
        <main className="adm-main">
          <div className="adm-content" style={{ padding: '40px', color: '#64748b' }}>
            <h2>Acceso restringido</h2>
            <p>Debes iniciar sesión con un usuario administrador para acceder a este panel.</p>
            <Link to="/login" className="admin-btn-primary">Iniciar sesión</Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="adm-root">
      <SEO
        title="Admin - Newsletter"
        description="Gestiona y programa las campañas de newsletter de StudiosWebSites desde el panel administrativo."
        canonical="https://studioswebsites.com/admin/newsletter"
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
          <Link to="/admin" className={`adm-sidebar-link ${isActive('/admin') ? 'adm-sidebar-link--active' : ''}`}>
            <Dashboard size={18} /> Dashboard
          </Link>
          <Link to="/admin/projects" className={`adm-sidebar-link ${isActive('/admin/projects') ? 'adm-sidebar-link--active' : ''}`}>
            <Portfolio size={18} /> Proyectos
          </Link>
          <Link to="/admin/articles" className={`adm-sidebar-link ${isActive('/admin/articles') ? 'adm-sidebar-link--active' : ''}`}>
            <Edit size={18} /> Blog
          </Link>
          <Link to="/admin/newsletter" className={`adm-sidebar-link ${isActive('/admin/newsletter') ? 'adm-sidebar-link--active' : ''}`}>
            <Email size={18} /> Newsletter
          </Link>

          <p className="adm-sidebar-section-label" style={{ marginTop: '24px' }}>Próximamente</p>
          <span className="adm-sidebar-link adm-sidebar-link--disabled"><Settings size={18} /> Servicios</span>
          <span className="adm-sidebar-link adm-sidebar-link--disabled"><DataTable size={18} /> Analíticas</span>
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
            <h1 className="adm-topbar-title">Newsletter</h1>
            <span className="adm-topbar-date">
              <Time size={14} /> {currentTime.toLocaleDateString('es-ES', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>

          <div className="adm-topbar-right">
            <button className="adm-topbar-icon-btn" aria-label="Notificaciones">
              <Notification size={18} />
            </button>

            <div className="adm-topbar-user">
              <div className="adm-topbar-avatar"><User size={16} /></div>
              <div className="adm-topbar-user-info">
                <span className="adm-topbar-user-name">{user?.name || user?.email}</span>
                <span className="adm-topbar-user-role">Administrador</span>
              </div>
            </div>
          </div>
        </header>

        <div className="adm-content">
          <section className="adm-section">
            <div className="adm-section-header">
              <div>
                <h3 className="adm-section-title">Programar campaña</h3>
                <p className="adm-section-subtitle">
                  Crea un email para enviar a los suscriptores confirmados.
                </p>
              </div>
              <button
                type="button"
                className="admin-btn-primary"
                onClick={handleSendNow}
                disabled={sending}
              >
                <Send size={16} /> Enviar ahora
              </button>
            </div>

            <form onSubmit={handleSubmit} className="admin-form">
              <input
                className="admin-input"
                placeholder="Asunto de la campaña"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                required
              />
              <textarea
                className="admin-input"
                placeholder="Contenido HTML de la newsletter"
                rows={8}
                value={form.html}
                onChange={(e) => setForm({ ...form, html: e.target.value })}
                required
              />
              <label className="admin-field-label">Programar para</label>
              <input
                type="datetime-local"
                className="admin-input"
                value={form.scheduledAt}
                onChange={(e) => setForm({ ...form, scheduledAt: e.target.value })}
              />
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button type="submit" className="admin-btn-primary" disabled={saving}>
                  {saving ? 'Guardando...' : 'Programar campaña'}
                </button>
                <button
                  type="button"
                  className="admin-btn-secondary"
                  onClick={() => { setForm(emptyForm); setStatus(null) }}
                >
                  Limpiar formulario
                </button>
              </div>
              {status && (
                <div className={`admin-status admin-status--${status.type}`}>
                  {status.message}
                </div>
              )}
            </form>
          </section>

          <section className="adm-section">
            <div className="adm-section-header">
              <div>
                <h3 className="adm-section-title">Campañas programadas</h3>
                <p className="adm-section-subtitle">
                  {confirmedSubscribers} suscriptor(es) confirmados. Las campañas pendientes se enviarán automáticamente.
                </p>
              </div>
            </div>

            {loading ? (
              <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Cargando campañas...</p>
            ) : (
              <div className="admin-list">
                {campaigns.length === 0 ? (
                  <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>No hay campañas programadas.</p>
                ) : (
                  campaigns.map((campaign) => (
                    <div className="admin-list-item" key={campaign.id}>
                      <div>
                        <strong>{campaign.subject}</strong>
                        <div className="admin-list-meta">
                          <span>{formatDate(campaign.scheduled_at)}</span>
                          <span className={`admin-badge ${campaign.sent_at ? 'admin-badge--sent' : 'admin-badge--pending'}`}>
                            {campaign.sent_at ? 'Enviada' : 'Pendiente'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}

export default AdminNewsletter
