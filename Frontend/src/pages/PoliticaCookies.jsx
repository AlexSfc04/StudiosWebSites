import { Link } from 'react-router-dom'
import './PoliticasLegales.css'
import { ArrowLeft,ArrowRight } from '@carbon/icons-react'

function PoliticaCookies() {
  const limpiarCookies = () => {
    localStorage.removeItem('cookie_consent')
    alert('Preferencias de cookies eliminadas. Recarga la página para volver a configurarlas.')
  }

  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link to="/" className="legal-back"><ArrowLeft size={16} /> Volver al inicio</Link>

        <h1>Política de Cookies</h1>
        <p className="legal-updated">Última actualización: abril de 2026</p>

        <section>
          <h2>¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que un sitio web almacena en tu navegador
            cuando lo visitas. Sirven para recordar tus preferencias, analizar el tráfico
            y mejorar la experiencia de usuario.
          </p>
        </section>

        <section>
          <h2>Cookies que usamos</h2>
          <div className="legal-table-wrap">
            <table className="legal-table">
              <thead>
                <tr>
                  <th>Cookie</th>
                  <th>Tipo</th>
                  <th>Finalidad</th>
                  <th>Duración</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>cookie_consent</code></td>
                  <td>Necesaria</td>
                  <td>Guarda tus preferencias de cookies</td>
                  <td>1 año</td>
                </tr>
                <tr>
                  <td><code>auth_token</code></td>
                  <td>Necesaria</td>
                  <td>Mantiene tu sesión iniciada</td>
                  <td>Sesión</td>
                </tr>
                <tr>
                  <td><code>_ga</code></td>
                  <td>Analítica</td>
                  <td>Google Analytics — mide el tráfico</td>
                  <td>2 años</td>
                </tr>
                <tr>
                  <td><code>_gid</code></td>
                  <td>Analítica</td>
                  <td>Google Analytics — distingue usuarios</td>
                  <td>24 horas</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2>Tipos de cookies</h2>
          <ul>
            <li>
              <strong>Necesarias:</strong> imprescindibles para que el sitio funcione correctamente.
              No requieren consentimiento.
            </li>
            <li>
              <strong>Analíticas:</strong> nos permiten conocer cómo los usuarios navegan
              por el sitio para mejorar su funcionamiento.
            </li>
            <li>
              <strong>Marketing:</strong> utilizadas para mostrarte publicidad relevante
              según tus intereses.
            </li>
          </ul>
        </section>

        <section>
          <h2>Cómo gestionar tus cookies</h2>
          <p>
            Puedes modificar tus preferencias en cualquier momento haciendo clic en el botón
            de abajo o configurando tu navegador para bloquear o eliminar cookies.
          </p>
          <p>Instrucciones para los navegadores más comunes:</p>
          <ul>
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
            <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
          </ul>
          <button className="legal-btn" onClick={limpiarCookies}>
            🔄 Restablecer mis preferencias de cookies
          </button>
        </section>

        <div className="legal-footer">
          <Link to="/privacidad">Ver Política de Privacidad <ArrowRight size={16} /></Link>
        </div>
      </div>
    </div>
  )
}

export default PoliticaCookies
