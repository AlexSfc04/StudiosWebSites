import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import api from '../services/api'
import './AdminPage.css'

const empty = { title: '', content: '', image: '', category: 'general', featured: false }

function AdminArticles() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [articles, setArticles] = useState([])
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) navigate('/login')
  }, [user])

  useEffect(() => {
    api.getArticles()
      .then(data => setArticles(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false))
  }, [])

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

  return (
    <div className="admin-page">
      <div className="admin-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <h2 className="admin-logo">⚡ SWS Admin</h2>
          <span onClick={() => navigate('/admin')} className="admin-back-link" style={{ cursor: 'pointer' }}>
            ← Volver al panel
          </span>
        </div>
      </div>

      <div className="admin-content">
        <h1 className="admin-title">✍️ Gestionar Artículos</h1>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="admin-form">
          <input className="admin-input" placeholder="Título" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <textarea className="admin-input" placeholder="Contenido" rows={5} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required />
          <input className="admin-input" placeholder="URL de imagen" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
          <select className="admin-input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
            <option value="general">General</option>
            <option value="news">Noticias</option>
            <option value="tips">Consejos</option>
            <option value="others">Otros</option>
          </select>
          <label className="admin-check">
            <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
            Destacado
          </label>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" className="admin-btn-primary">
              {editingId ? 'Actualizar' : 'Crear Artículo'}
            </button>
            {editingId && (
              <button type="button" className="admin-btn-secondary" onClick={() => { setForm(empty); setEditingId(null) }}>
                Cancelar
              </button>
            )}
          </div>
        </form>

        {/* Lista */}
        {loading ? <p>Cargando...</p> : (
          <div className="admin-list">
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
      </div>
    </div>
  )
}

export default AdminArticles
