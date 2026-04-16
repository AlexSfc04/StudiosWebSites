import { Link } from 'react-router-dom'
import './PoliticasLegales.css'
import { ArrowLeft, ArrowRight } from '@carbon/icons-react'

function PoliticaPrivacidad() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link to="/" className="legal-back"><ArrowLeft size={16} /> Volver al inicio</Link>

        <h1>Política de Privacidad</h1>
        <p className="legal-updated">Última actualización: abril de 2026</p>

        <section>
          <h2>1. Responsable del tratamiento</h2>
          <p>
            En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD),
            te informamos que el responsable del tratamiento de tus datos es <strong>StudiosWebSites</strong>,
            con domicilio en Sevilla, España.
          </p>
          <p>Contacto: <a href="mailto:info@studioswebsites.com">info@studioswebsites.com</a></p>
        </section>

        <section>
          <h2>2. Datos que recogemos</h2>
          <ul>
            <li><strong>Datos de registro:</strong> nombre, dirección de correo electrónico y contraseña (cifrada).</li>
            <li><strong>Datos de uso:</strong> páginas visitadas, tiempo en el sitio y acciones realizadas.</li>
            <li><strong>Datos de contacto:</strong> nombre y mensaje cuando usas el formulario de contacto.</li>
            <li><strong>Datos del chatbot:</strong> mensajes introducidos en el asistente virtual.</li>
          </ul>
        </section>

        <section>
          <h2>3. Finalidad del tratamiento</h2>
          <ul>
            <li>Gestionar tu cuenta y acceso a la plataforma.</li>
            <li>Responder a tus solicitudes de contacto.</li>
            <li>Mejorar los servicios mediante análisis de uso.</li>
            <li>Enviar comunicaciones si te has suscrito a la newsletter (con tu consentimiento).</li>
          </ul>
        </section>

        <section>
          <h2>4. Base jurídica</h2>
          <p>
            El tratamiento se basa en la ejecución de un contrato (acceso a la plataforma),
            en tu consentimiento (newsletter y cookies no esenciales) y en el interés legítimo
            (seguridad y mejora del servicio).
          </p>
        </section>

        <section>
          <h2>5. Conservación de datos</h2>
          <p>
            Tus datos se conservan mientras mantengas una cuenta activa. Al eliminarla,
            los datos se borran en un plazo máximo de 30 días, salvo obligación legal de conservación.
          </p>
        </section>

        <section>
          <h2>6. Tus derechos</h2>
          <p>Puedes ejercer los siguientes derechos enviando un email a <a href="mailto:info@studioswebsites.com">info@studioswebsites.com</a>:</p>
          <ul>
            <li><strong>Acceso:</strong> conocer qué datos tenemos sobre ti.</li>
            <li><strong>Rectificación:</strong> corregir datos inexactos.</li>
            <li><strong>Supresión:</strong> solicitar la eliminación de tus datos.</li>
            <li><strong>Portabilidad:</strong> recibir tus datos en formato estructurado.</li>
            <li><strong>Oposición:</strong> oponerte al tratamiento en determinadas circunstancias.</li>
            <li><strong>Reclamación:</strong> puedes reclamar ante la <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">Agencia Española de Protección de Datos (AEPD)</a>.</li>
          </ul>
        </section>

        <section>
          <h2>7. Seguridad</h2>
          <p>
            Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos,
            incluyendo cifrado de contraseñas con bcrypt y comunicaciones sobre HTTPS.
          </p>
        </section>

        <div className="legal-footer">
          <Link to="/politica-cookies">Ver Política de Cookies <ArrowRight size={16} /></Link>
        </div>
      </div>
    </div>
  )
}

export default PoliticaPrivacidad
