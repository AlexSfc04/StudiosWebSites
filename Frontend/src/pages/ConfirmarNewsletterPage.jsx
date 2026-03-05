import { useSearchParams, Link } from 'react-router-dom'
import './ConfirmarNewsletterPage.css'

function ConfirmarNewsletterPage() {
  const [params] = useSearchParams()
  const success = params.get('success')

  if (success === 'true') {
    return (
      <div className="confirm-page">
        <div className="confirm-card">
          <div className="confirm-icon">✅</div>
          <h1 className="confirm-title">¡Suscripción confirmada!</h1>
          <p className="confirm-text">
            Ya estás en nuestra lista. Pronto recibirás consejos exclusivos
            sobre diseño y desarrollo web.
          </p>
          <Link to="/" className="confirm-btn">Volver al inicio</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="confirm-page">
      <div className="confirm-card">
        <div className="confirm-icon">❌</div>
        <h1 className="confirm-title">Enlace no válido</h1>
        <p className="confirm-text">Este enlace no es válido o ha expirado.</p>
        <Link to="/" className="confirm-btn">Volver al inicio</Link>
      </div>
    </div>
  )
}

export default ConfirmarNewsletterPage
