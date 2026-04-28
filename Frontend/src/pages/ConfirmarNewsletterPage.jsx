import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { CheckmarkFilled, WarningAlt, Email } from '@carbon/icons-react'
import './ConfirmarNewsletterPage.css'
import SEO from '../components/SEO/SEO'

const API_URL = import.meta.env.VITE_API_URL

function ConfirmarNewsletterPage() {
  const [searchParams] = useSearchParams()
  const [estado, setEstado] = useState('loading') // loading | success | error
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    const token = searchParams.get('token')

    if (!token) {
      setEstado('error')
      setMensaje('El enlace no es válido o ha expirado.')
      return
    }

    const confirmar = async () => {
      try {
        const res = await fetch(`${API_URL}/newsletter/confirmar?token=${token}`)
        const data = await res.json()

        if (res.ok) {
          setEstado('success')
        } else {
          setEstado('error')
          setMensaje(data.message || 'El enlace no es válido o ha expirado.')
        }
      } catch {
        setEstado('error')
        setMensaje('Error de conexión. Inténtalo de nuevo.')
      }
    }

    confirmar()
  }, [searchParams])

  return (
    <div className="ncp">
      <SEO
        title="Confirmación de newsletter"
        description="Confirma tu suscripción a la newsletter de StudiosWebSites y recibe novedades sobre diseño y desarrollo web."
        canonical="https://studioswebsites.com/confirmar-newsletter"
      />
      <h1 className="ncp__page-title">Confirmación de suscripción</h1>
      <div className="ncp__card">

        {/* Loading */}
        {estado === 'loading' && (
          <div className="ncp__content">
            <div className="ncp__icon ncp__icon--purple">
              <Email size={32} aria-hidden="true" />
            </div>
            <h2 className="ncp__title">Confirmando suscripción…</h2>
            <p className="ncp__text">Un momento, estamos verificando tu email.</p>
            <div className="ncp__spinner" aria-label="Cargando" />
          </div>
        )}

        {/* Success */}
        {estado === 'success' && (
          <div className="ncp__content">
            <div className="ncp__icon ncp__icon--green">
              <CheckmarkFilled size={32} aria-hidden="true" />
            </div>
            <h2 className="ncp__title">¡Suscripción confirmada!</h2>
            <p className="ncp__text">
              Ya formas parte de nuestra newsletter. Recibirás contenido
              exclusivo sobre diseño y desarrollo web.
            </p>
            <Link to="/" className="ncp__btn ncp__btn--primary">
              Volver al inicio
            </Link>
          </div>
        )}

        {/* Error */}
        {estado === 'error' && (
          <div className="ncp__content">
            <div className="ncp__icon ncp__icon--red">
              <WarningAlt size={32} aria-hidden="true" />
            </div>
            <h2 className="ncp__title">Enlace inválido</h2>
            <p className="ncp__text">{mensaje}</p>
            <Link to="/" className="ncp__btn ncp__btn--ghost">
              Volver al inicio
            </Link>
          </div>
        )}

      </div>
    </div>
  )
}

export default ConfirmarNewsletterPage
