import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Auth.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
  e.preventDefault()
  setError('')
  if (!email || !password) {
    setError('Introduce los datos necesarios.')
    return
  }
  setLoading(true)
  try {
    const result = await login(email, password) // ← recoge el resultado

    if (result.success) {
      navigate('/')                              // ← solo navega si fue exitoso
    } else {
      setError(result.message || 'Email o contraseña incorrectos.') // ← muestra el error
    }
  } catch (err) {
    setError('Error inesperado. Inténtalo de nuevo.')
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

    <h2 className="auth-title">Bienvenido de nuevo</h2>
    <p className="auth-subtitle">Inicia sesión en tu cuenta</p>

    <form onSubmit={handleSubmit} className="auth-form">
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
        {loading ? 'Cargando...' : 'Iniciar sesión'}
      </button>
    </form>

    <p className="auth-switch">
      ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
    </p>

  </div>
</div>


      {/* RIGHT — Brand panel */}
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

export default Login
