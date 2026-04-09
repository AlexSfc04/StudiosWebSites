import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './CookieBanner.css'

function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showConfig, setShowConfig] = useState(false)
  const [prefs, setPrefs] = useState({ analytics: false, marketing: false })

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  const acceptAll = () => {
    localStorage.setItem('cookie_consent', JSON.stringify({ analytics: true, marketing: true }))
    setVisible(false)
  }

  const rejectAll = () => {
    localStorage.setItem('cookie_consent', JSON.stringify({ analytics: false, marketing: false }))
    setVisible(false)
  }

  const savePrefs = () => {
    localStorage.setItem('cookie_consent', JSON.stringify(prefs))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie-overlay">
      <div className="cookie-banner">
        <div className="cookie-header">
          <span className="cookie-icon">🍪</span>
          <h3>Usamos cookies</h3>
        </div>

        {!showConfig ? (
          <>
            <p className="cookie-text">
              Utilizamos cookies propias y de terceros para mejorar tu experiencia de navegación
              y analizar el tráfico del sitio. Puedes aceptarlas, rechazarlas o configurarlas.
              Consulta nuestra{' '}
              <Link to="/politica-cookies" className="cookie-link">Política de Cookies</Link>
              {' '}y{' '}
              <Link to="/privacidad" className="cookie-link">Política de Privacidad</Link>.
            </p>
            <div className="cookie-actions">
              <button className="cookie-btn cookie-btn--reject" onClick={rejectAll}>Rechazar</button>
              <button className="cookie-btn cookie-btn--config" onClick={() => setShowConfig(true)}>Configurar</button>
              <button className="cookie-btn cookie-btn--accept" onClick={acceptAll}>Aceptar todo</button>
            </div>
          </>
        ) : (
          <>
            <div className="cookie-prefs">
              <div className="cookie-pref-item">
                <div>
                  <strong>Cookies necesarias</strong>
                  <p>Imprescindibles para el funcionamiento del sitio.</p>
                </div>
                <span className="cookie-badge">Siempre activas</span>
              </div>
              <div className="cookie-pref-item">
                <div>
                  <strong>Cookies analíticas</strong>
                  <p>Nos ayudan a entender cómo usas el sitio.</p>
                </div>
                <label className="cookie-toggle">
                  <input
                    type="checkbox"
                    checked={prefs.analytics}
                    onChange={e => setPrefs(p => ({ ...p, analytics: e.target.checked }))}
                  />
                  <span className="cookie-slider" />
                </label>
              </div>
              <div className="cookie-pref-item">
                <div>
                  <strong>Cookies de marketing</strong>
                  <p>Permiten mostrarte publicidad personalizada.</p>
                </div>
                <label className="cookie-toggle">
                  <input
                    type="checkbox"
                    checked={prefs.marketing}
                    onChange={e => setPrefs(p => ({ ...p, marketing: e.target.checked }))}
                  />
                  <span className="cookie-slider" />
                </label>
              </div>
            </div>
            <div className="cookie-actions">
              <button className="cookie-btn cookie-btn--reject" onClick={() => setShowConfig(false)}>Volver</button>
              <button className="cookie-btn cookie-btn--accept" onClick={savePrefs}>Guardar preferencias</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CookieBanner