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
} from '@carbon/icons-react'

const empty = { title: '', content: '', image: '', category: 'general', featured: false }

function AdminArticles() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [articles, setArticles] = useState([])
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)
  const [loadingArticles, setLoadingArticles] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    api.getArticles()
      .then(data => setArticles(Array.isArray(data) ? data : []))
      .finally(() => setLoadingArticles(false))
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingId) {
      await api.updateArticle(editingId, form)
      setArticles(articles.map(a => a.id === editingId ? { ...a, ...form } : a))
    } else {
      const res = await api.createArticle(form)
      setArticles([...articles, { ...form, id: res.id }])
    }
    setForm(empty)
    setEditingId(null)
  }

  const handleEdit = (article) => {
    setForm(article)
    setEditingId(article.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Seguro que quieres eliminar este artículo?')) return
    await api.deleteArticle(id)
    setArticles(articles.filter(a => a.id !== id))
  }

  const formatDate = (d) =>
    d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  const isActive = (path) => location.pathname === path

  return (
    <div className="adm-root">
      <SEO
        title="Admin - Artículos"
        description="Gestiona el blog y publica artículos desde el panel administrativo de StudiosWebSites."
        canonical="https://studioswebsites.com/admin/articles"
        robots="noindex,nofollow"
      />

      {/* ── SIDEBAR ── */}
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

          <p className="adm-sidebar-section-label" style={{ marginTop: '24px' }}>Próximamente</p>
          <span className="adm-sidebar-link adm-sidebar-link--disabled"><Settings size={18} /> Servicios</span>
          <span className="adm-sidebar-link adm-sidebar-link--disabled"><Email size={18} /> Contactos</span>
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

      {/* ── MAIN ── */}
      <main className="adm-main">

        {/* Topbar */}
        <header className="adm-topbar">
          <div className="adm-topbar-left">
            <h1 className="adm-topbar-title">Blog — Artículos</h1>
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
              <div className="adm-topbar-avatar"><User size={16} /></div>
              <div className="adm-topbar-user-info">
                <span className="adm-topbar-user-name">{user?.name || user?.email}</span>
                <span className="adm-topbar-user-role">Administrador</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="adm-content">

          {/* Formulario */}
          <section className="adm-section">
            <h3 className="adm-section-title">
              {editingId ? 'Editar artículo' : 'Nuevo artículo'}
            </h3>
            <form onSubmit={handleSubmit} className="admin-form">
              <input
                className="admin-input"
                placeholder="Título"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                required
              />
              <textarea
                className="admin-input"
                placeholder="Contenido"
                rows={5}
                value={form.content}
                onChange={e => setForm({ ...form, content: e.target.value })}
                required
              />
              <input
                className="admin-input"
                placeholder="URL de imagen"
                value={form.image}
                onChange={e => setForm({ ...form, image: e.target.value })}
              />
              <select
                className="admin-input"
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
              >
                <option value="general">General</option>
                <option value="news">Noticias</option>
                <option value="tips">Consejos</option>
                <option value="others">Otros</option>
              </select>
              <label className="admin-check">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={e => setForm({ ...form, featured: e.target.checked })}
                />
                Destacado
              </label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="submit" className="admin-btn-primary">
                  {editingId ? 'Actualizar artículo' : 'Crear artículo'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="admin-btn-secondary"
                    onClick={() => { setForm(empty); setEditingId(null) }}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* Lista */}
          <section className="adm-section">
            <h3 className="adm-section-title">
              Artículos publicados ({articles.length})
            </h3>
            {loadingArticles ? (
              <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Cargando...</p>
            ) : (
              <div className="admin-list">
                {articles.length === 0 && (
                  <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>No hay artículos todavía.</p>
                )}
                {articles.map(article => (
                  <div className="admin-list-item" key={article.id}>
                    <div>
                      <strong>{article.title}</strong>
                      <span className="admin-badge">{article.category}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="admin-btn-edit" onClick={() => handleEdit(article)}>Editar</button>
                      <button className="admin-btn-delete" onClick={() => handleDelete(article.id)}>Eliminar</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

        </div>
      </main>
    </div>
  )
}

export default AdminArticles