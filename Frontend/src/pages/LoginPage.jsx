import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Auth.css'
import SEO from '../components/SEO/SEO'
import { Globe, Analytics, Email, ShoppingCart, Phone, Subtract } from '@carbon/icons-react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleReady, setGoogleReady] = useState(false)
  const { login, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Introduce los datos necesarios.')
      return
    }
    setLoading(true)
    try {
      const result = await login(email, password)
      if (result.success) {
        navigate('/')
      } else {
        setError(result.message || 'Email o contraseña incorrectos.')
      }
    } catch (err) {
      setError('Error inesperado. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleCredentialResponse = async (credentialResponse) => {
    if (!credentialResponse?.credential) {
      setError('Error al obtener credenciales de Google.')
      return
    }
    setLoading(true)
    setError('')
    const result = await loginWithGoogle(credentialResponse.credential)
    if (result.success) {
      navigate('/')
    } else {
      setError(result.message || 'Error al iniciar sesión con Google.')
    }
    setLoading(false)
  }

  const handleGoogleLogin = () => {
    if (!GOOGLE_CLIENT_ID) {
      setError('No se ha configurado el login con Google.')
      return
    }
    if (!window.google?.accounts?.id) {
      setError('El servicio de Google no está listo. Por favor recarga la página.')
      return
    }
  }

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return
    let intervalId = null
    const renderButton = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleCredentialResponse,
          ux_mode: 'popup',
          auto_select: false,
          cancel_on_tap_outside: true,
          use_fedcm_for_prompt: false,
        })
        
        window.google.accounts.id.cancel()

        const container = document.getElementById('google-signin-button-login')
        if (container) {
          container.innerHTML = ''
          window.google.accounts.id.renderButton(container, {
            theme: 'outline',
            size: 'large',
            width: container.offsetWidth || 400,  // ← píxeles reales
          })
        }
        setGoogleReady(true)
        if (intervalId) { clearInterval(intervalId); intervalId = null }
      }
    }
    intervalId = window.setInterval(renderButton, 150)
    return () => { if (intervalId) window.clearInterval(intervalId) }
  }, [GOOGLE_CLIENT_ID])

  return (
    <div className="auth-page">
      <SEO
        title="Iniciar sesión"
        description="Accede a tu área privada de StudiosWebSites para gestionar tu portfolio y blog."
        canonical="https://studioswebsites.com/login"
      />

      {/* LEFT — Form */}
      <div className="auth-form-side">
        <div className="auth-form-box">

          <Link to="/" className="auth-logo">
            <img src="/logo-studios.png" alt="SWS Logo" className="footer-logo-img" />
            <span>SWS</span>
          </Link>

          {error && <div className="auth-error">{error}</div>}

          <h1 className="auth-title">Bienvenido de nuevo</h1>
          <p className="auth-subtitle">Inicia sesión en tu cuenta</p>

          {/* Google button — encima del formulario */}
          {GOOGLE_CLIENT_ID ? (
            <div className="auth-google-box">
              <div id="google-signin-button-login" />
              {!googleReady && (
                <button type="button" className="auth-google-btn" onClick={handleGoogleLogin} disabled={loading}>
                  Iniciar sesión con Google
                </button>
              )}
            </div>
          ) : (
            <div className="auth-google-missing">
              No está configurado Google Sign-In. Añade <code>VITE_GOOGLE_CLIENT_ID</code> en tu frontend.
            </div>
          )}

          {/* Divisor con Carbon icon */}
          <div className="auth-divider-container">
            <div className="auth-divider" />
            <div className="auth-divider-circle" aria-hidden="true">
              <Subtract size={14} />
            </div>
            <div className="auth-divider" />
          </div>

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
              <div className="auth-feature-icon-wrap"><Globe size={22} /></div>
              <span>Visualiza y gestiona tu <strong>página web</strong></span>
            </li>
            <li>
              <div className="auth-feature-icon-wrap"><Analytics size={22} /></div>
              <span>Consulta tus <strong>estadísticas</strong> en tiempo real</span>
            </li>
            <li>
              <div className="auth-feature-icon-wrap"><Email size={22} /></div>
              <span>Lee tus <strong>mensajes de contacto</strong></span>
            </li>
            <li>
              <div className="auth-feature-icon-wrap"><ShoppingCart size={22} /></div>
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
            <p><Phone size={14} /> +34 611 491 647</p>
            <p><Email size={14} /> infostudioswebsites2026@gmail.com</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login