import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import './AdminPage.css'

function AdminPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

useEffect(() => {
  if (!user) {
    navigate('/login')
  } else if (user.role !== 'admin') {
    navigate('/')  // usuarios normales van a la home
  }
}, [user])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const cards = [
    { icon: '📁', title: 'Proyectos', desc: 'Gestionar portfolio', color: '#6366f1' },
    { icon: '✍️', title: 'Blog', desc: 'Gestionar artículos', color: '#8b5cf6' },
    { icon: '⚙️', title: 'Servicios', desc: 'Editar servicios', color: '#06b6d4' },
    { icon: '📩', title: 'Contactos', desc: 'Ver mensajes', color: '#10b981' },
  ]

  return (
    <div className="admin-page">

      {/* Topbar */}
      <div className="admin-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <h2 className="admin-logo">⚡ SWS Admin</h2>
          <a href="/" className="admin-back-link">← Volver a la web</a>
        </div>
        <div className="admin-topbar-right">
          <span className="admin-user">👤 {user?.name || user?.nombre || user?.email}</span>
          <button className="admin-logout-btn" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>


      {/* Contenido */}
      <div className="admin-content">
        <h1 className="admin-title">Panel de Administración</h1>
        <p className="admin-subtitle">Gestiona el contenido de tu web desde aquí.</p>

        {/* Cards */}
        <div className="admin-cards">
          {cards.map((card) => (
            <div className="admin-card" key={card.title}>
              <div
                className="admin-card-icon"
                style={{ background: card.color + '20', color: card.color }}
              >
                {card.icon}
              </div>
              <h3 className="admin-card-title">{card.title}</h3>
              <p className="admin-card-desc">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default AdminPage

