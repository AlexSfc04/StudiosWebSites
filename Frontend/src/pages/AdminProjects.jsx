import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import api from '../services/api'
import './AdminPage.css'

const empty = { title: '', description: '', image: '', category: 'others', link: '', featured: false }

function AdminProjects() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) navigate('/login')
  }, [user])

  useEffect(() => {
    api.getProjects()
      .then(data => setProjects(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingId) {
      await api.updateProject(editingId, form)
      setProjects(projects.map(p => p.id === editingId ? { ...p, ...form } : p))
    } else {
      const res = await api.createProject(form)
      setProjects([...projects, { ...form, id: res.id }])
    }
    setForm(empty)
    setEditingId(null)
  }

  const handleEdit = (project) => {
    setForm(project)
    setEditingId(project.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Seguro que quieres eliminar este proyecto?')) return
    await api.deleteProject(id)
    setProjects(projects.filter(p => p.id !== id))
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
        <h1 className="admin-title">📁 Gestionar Proyectos</h1>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="admin-form">
          <input className="admin-input" placeholder="Título" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <textarea className="admin-input" placeholder="Descripción" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
          <input className="admin-input" placeholder="URL de imagen" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
          <input className="admin-input" placeholder="Link del proyecto" value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} />
          <select className="admin-input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
            <option value="restaurants">Restaurantes</option>
            <option value="beauty">Salones de Belleza</option>
            <option value="commerce">Comercio</option>
            <option value="services">Servicios</option>
            <option value="others">Otros</option>
          </select>
          <label className="admin-check">
            <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
            Destacado
          </label>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" className="admin-btn-primary">
              {editingId ? 'Actualizar' : 'Crear Proyecto'}
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
            {projects.map(project => (
              <div className="admin-list-item" key={project.id}>
                <div>
                  <strong>{project.title}</strong>
                  <span className="admin-badge">{project.category}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="admin-btn-edit" onClick={() => handleEdit(project)}>Editar</button>
                  <button className="admin-btn-delete" onClick={() => handleDelete(project.id)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminProjects
