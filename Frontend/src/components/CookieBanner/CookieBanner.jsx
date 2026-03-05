import { useEffect, useState } from 'react'
import './CookieBanner.css'

const STORAGE_KEY = 'sws_cookie_consent'

const defaultPrefs = {
  essential: true,      // siempre activas
  analytics: false,
  marketing: false,
  preferences: false,
}

function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [prefs, setPrefs] = useState(defaultPrefs)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) {
      setTimeout(() => setVisible(true), 800) // pequeño delay elegante
    }
  }, [])

  const save = (newPrefs) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...newPrefs, savedAt: Date.now() }))
    setVisible(false)
    setShowModal(false)
  }

  const acceptAll = () => {
    const all = { essential: true, analytics: true, marketing: true, preferences: true }
    setPrefs(all)
    save(all)
  }

  const rejectAll = () => {
    save(defaultPrefs)
  }

  const saveCustom = () => {
    save(prefs)
  }

  const toggle = (key) => {
    if (key === 'essential') return
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }))
  }

  if (!visible) return null

  return (
    <>
      {/* ── Banner ── */}
      {!showModal && (
        <div className="ck-overlay-anim">
          <div className="ck-banner">
            <div className="ck-banner-left">
              <div className="ck-logo-row">
                <span className="ck-shield">🔒</span>
                <strong className="ck-brand">Tu privacidad importa</strong>
              </div>
              <p className="ck-banner-text">
                Usamos cookies propias y de terceros para mejorar tu experiencia,
                analizar el tráfico y personalizar el contenido. Puedes aceptarlas
                todas, rechazarlas o configurar tus preferencias.
              </p>
              <a
                href="/politica-de-cookies"
                className="ck-policy-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Política de cookies →
              </a>
            </div>

            <div className="ck-banner-actions">
              <button className="ck-btn ck-btn-ghost" onClick={rejectAll}>
                Rechazar todo
              </button>
              <button className="ck-btn ck-btn-outline" onClick={() => setShowModal(true)}>
                Configurar
              </button>
              <button className="ck-btn ck-btn-primary" onClick={acceptAll}>
                Aceptar todo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal de configuración ── */}
      {showModal && (
        <div className="ck-modal-backdrop">
          <div className="ck-modal">
            <div className="ck-modal-header">
              <div>
                <h2 className="ck-modal-title">Preferencias de privacidad</h2>
                <p className="ck-modal-subtitle">
                  Elige qué cookies deseas permitir. Puedes cambiar esta configuración en cualquier momento.
                </p>
              </div>
              <button className="ck-modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <div className="ck-modal-body">
              {[
                {
                  key: 'essential',
                  label: 'Cookies esenciales',
                  badge: 'Siempre activas',
                  description: 'Necesarias para el funcionamiento básico del sitio. No se pueden desactivar.',
                },
                {
                  key: 'analytics',
                  label: 'Cookies analíticas',
                  badge: null,
                  description: 'Nos ayudan a entender cómo interactúas con el sitio para mejorar la experiencia.',
                },
                {
                  key: 'marketing',
                  label: 'Cookies de marketing',
                  badge: null,
                  description: 'Se usan para mostrarte publicidad relevante dentro y fuera de nuestra web.',
                },
                {
                  key: 'preferences',
                  label: 'Cookies de preferencias',
                  badge: null,
                  description: 'Recuerdan tus ajustes personales como idioma o región.',
                },
              ].map(({ key, label, badge, description }) => (
                <div className="ck-row" key={key}>
                  <div className="ck-row-info">
                    <div className="ck-row-title-wrap">
                      <span className="ck-row-label">{label}</span>
                      {badge && <span className="ck-badge">{badge}</span>}
                    </div>
                    <p className="ck-row-desc">{description}</p>
                  </div>
                  <label className={`ck-switch ${key === 'essential' ? 'ck-switch-disabled' : ''}`}>
                    <input
                      type="checkbox"
                      checked={prefs[key]}
                      onChange={() => toggle(key)}
                      disabled={key === 'essential'}
                    />
                    <span className="ck-slider" />
                  </label>
                </div>
              ))}
            </div>

            <div className="ck-modal-footer">
              <button className="ck-btn ck-btn-ghost" onClick={rejectAll}>
                Rechazar todo
              </button>
              <div className="ck-modal-footer-right">
                <button className="ck-btn ck-btn-outline" onClick={saveCustom}>
                  Guardar selección
                </button>
                <button className="ck-btn ck-btn-primary" onClick={acceptAll}>
                  Aceptar todo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Hook para leer consentimiento desde cualquier componente
export function useCookieConsent() {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : defaultPrefs
}

export default CookieBanner
