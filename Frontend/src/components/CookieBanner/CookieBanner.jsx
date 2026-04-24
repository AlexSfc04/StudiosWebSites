import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Analytics,
  Bullhorn,
  CheckmarkFilled,
  Close,
  Settings,
  Checkmark,
  Save,
  Security,
} from '@carbon/icons-react'
import './CookieBanner.css'

function CookieBanner() {
  const [visible, setVisible]       = useState(false)
  const [showConfig, setShowConfig] = useState(false)
  const [prefs, setPrefs]           = useState({ analytics: false, marketing: false })

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  const save = (data) => {
    localStorage.setItem('cookie_consent', JSON.stringify(data))
    setVisible(false)
  }

  const acceptAll = () => save({ analytics: true,  marketing: true  })
  const rejectAll = () => save({ analytics: false, marketing: false })
  const savePrefs = () => save(prefs)

  if (!visible) return null

  return (
    <div className="cb-wrapper" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.div
          key={showConfig ? 'config' : 'main'}
          className="cb"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cb-title"
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0,  scale: 1    }}
          exit={{    opacity: 0, y: 8,  scale: 0.98 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          {!showConfig ? (
            /* ---- Vista principal ---- */
            <>
              {/* Icono + título */}
              <div className="cb__head">
                <div className="cb__icon" aria-hidden="true">
                  <Security size={20} />
                </div>
                <h3 id="cb-title" className="cb__title">Usamos cookies</h3>
              </div>

              {/* Descripción */}
              <p className="cb__text">
                Usamos cookies propias y de terceros para mejorar tu experiencia.
                Puedes aceptarlas, rechazarlas o personalizarlas.{' '}
                <Link to="/politica-cookies" className="cb__link">Más info</Link>
              </p>

              {/* Botones: aceptar y rechazar apilados, configurar como enlace */}
              <div className="cb__actions">
                <button className="cb__btn cb__btn--primary" onClick={acceptAll}>
                  <Checkmark size={15} aria-hidden="true" />
                  Aceptar todo
                </button>
                <button className="cb__btn cb__btn--outline" onClick={rejectAll}>
                  Rechazar todo
                </button>
                <button className="cb__btn-link" onClick={() => setShowConfig(true)}>
                  <Settings size={13} aria-hidden="true" />
                  Personalizar
                </button>
              </div>
            </>
          ) : (
            /* ---- Vista configuración ---- */
            <>
              <div className="cb__head cb__head--between">
                <h3 id="cb-title" className="cb__title">Preferencias</h3>
                <button className="cb__close" onClick={() => setShowConfig(false)} aria-label="Volver">
                  <Close size={16} />
                </button>
              </div>

              <div className="cb__prefs">
                {/* Necesarias */}
                <div className="cb__pref">
                  <div className="cb__pref-left">
                    <div className="cb__pref-icon cb__pref-icon--green">
                      <CheckmarkFilled size={14} aria-hidden="true" />
                    </div>
                    <div>
                      <strong>Necesarias</strong>
                      <p>Esenciales para el funcionamiento.</p>
                    </div>
                  </div>
                  <span className="cb__badge">Siempre activas</span>
                </div>

                {/* Analíticas */}
                <div className="cb__pref">
                  <div className="cb__pref-left">
                    <div className="cb__pref-icon cb__pref-icon--blue">
                      <Analytics size={14} aria-hidden="true" />
                    </div>
                    <div>
                      <strong>Analíticas</strong>
                      <p>Cómo navegas por el sitio.</p>
                    </div>
                  </div>
                  <label className="cb__toggle" aria-label="Activar cookies analíticas">
                    <input
                      type="checkbox"
                      checked={prefs.analytics}
                      onChange={e => setPrefs(p => ({ ...p, analytics: e.target.checked }))}
                    />
                    <span className="cb__slider" />
                  </label>
                </div>

                {/* Marketing */}
                <div className="cb__pref">
                  <div className="cb__pref-left">
                    <div className="cb__pref-icon cb__pref-icon--purple">
                      <Bullhorn size={14} aria-hidden="true" />
                    </div>
                    <div>
                      <strong>Marketing</strong>
                      <p>Publicidad personalizada.</p>
                    </div>
                  </div>
                  <label className="cb__toggle" aria-label="Activar cookies de marketing">
                    <input
                      type="checkbox"
                      checked={prefs.marketing}
                      onChange={e => setPrefs(p => ({ ...p, marketing: e.target.checked }))}
                    />
                    <span className="cb__slider" />
                  </label>
                </div>
              </div>

              <div className="cb__actions">
                <button className="cb__btn cb__btn--primary" onClick={savePrefs}>
                  <Save size={14} aria-hidden="true" />
                  Guardar
                </button>
                <button className="cb__btn cb__btn--outline" onClick={rejectAll}>
                  Rechazar todo
                </button>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default CookieBanner
