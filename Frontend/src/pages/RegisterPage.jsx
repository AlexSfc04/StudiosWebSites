import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Auth.css'


function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!name || !email || !password) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    try {
      await register(name, email, password)
      navigate('/')
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">

      {/* LEFT — Form */}
      <div className="auth-form-side">
  <div className="auth-form-box">

    <Link to="/" className="auth-logo">
      <img src="/logo-studios.png" alt="SWS Logo" className="footer-logo-img" />
      <span>SWS</span>
    </Link>

    {error && <div className="auth-error">{error}</div>}

    <h2 className="auth-title">Crea tu cuenta</h2>
    <p className="auth-subtitle">Es gratis y solo tarda un minuto</p>

    <form onSubmit={handleSubmit} className="auth-form">
      <div className="auth-field">
        <label>Nombre</label>
        <input
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="auth-field">
        <label>Correo electrónico</label>
        <input
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="auth-field">
        <label>Contraseña</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="auth-btn" disabled={loading}>
        {loading ? 'Cargando...' : 'Crear cuenta'}
      </button>
    </form>

    <p className="auth-switch">
      ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
    </p>

  </div>
</div>


      {/* RIGHT — Brand panel (mismo que Login) */}
      {/* DERECHA — Panel de marca */}
      <div className="auth-brand-side">
        <div className="auth-brand-content">

          <div className="auth-brand-logo">
          <img src="/logo-studios.png" alt="SWS Logo" className="footer-logo-img" />
          <span>SWS</span>
          </div>

          <h2>Gestiona tu negocio<br /><span>online.</span></h2>
          <p className="auth-brand-tagline">Todo lo que necesitas, en un solo lugar.</p>

          <ul className="auth-brand-features">
            <li>
              <div className="auth-feature-icon-wrap">🌐</div>
              <span>Visualiza y gestiona tu <strong>página web</strong></span>
            </li>
            <li>
              <div className="auth-feature-icon-wrap">📊</div>
              <span>Consulta tus <strong>estadísticas</strong> en tiempo real</span>
            </li>
            <li>
              <div className="auth-feature-icon-wrap">📩</div>
              <span>Lee tus <strong>mensajes de contacto</strong></span>
            </li>
            <li>
              <div className="auth-feature-icon-wrap">🛒</div>
              <span>Administra tus <strong>servicios contratados</strong></span>
            </li>
          </ul>

          <div className="auth-brand-stats">
            <div className="auth-stat">
              <span className="auth-stat-number">50+</span>
              <span className="auth-stat-label">Proyectos</span>
            </div>
            <div className="auth-stat">
              <span className="auth-stat-number">100%</span>
              <span className="auth-stat-label">Satisfacción</span>
            </div>
            <div className="auth-stat">
              <span className="auth-stat-number">24/7</span>
              <span className="auth-stat-label">Soporte</span>
            </div>
          </div>

          <div className="auth-brand-contact">
            <p>Atención al cliente</p>
            <p>📞 +34 611 491 647</p>
            <p>📧 infostudioswebsites2026@gmail.com</p>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Register
