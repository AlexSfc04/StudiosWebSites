// NotFoundPage.jsx
import { Link } from 'react-router-dom'
import SEO from '../components/SEO/SEO'

function NotFoundPage() {
  return (
    <>
      <SEO
        title="Página no encontrada"
        description="La página que buscas no existe o ha sido movida."
      />
      <div style={{ textAlign: 'center', padding: '80px 20px', minHeight: '60vh' }}>
        <h1 style={{ fontSize: '5rem', fontWeight: 800, color: '#6366f1' }}>404</h1>
        <h2 style={{ marginBottom: 12 }}>Página no encontrada</h2>
        <p style={{ color: '#64748b', marginBottom: 32 }}>
          La URL que buscas no existe o ha sido movida.
        </p>
        <Link to="/" style={{
          padding: '12px 28px', background: '#6366f1', color: 'white',
          borderRadius: 10, fontWeight: 600, textDecoration: 'none'
        }}>
          Volver al inicio
        </Link>
      </div>
    </>
  )
}

export default NotFoundPage