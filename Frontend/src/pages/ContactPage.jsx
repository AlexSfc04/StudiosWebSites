import { useState } from 'react'
import './ContactPage.css'
import api from '../services/api'

function ContactPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipoNegocio: '',
    mensaje: ''
  })
  const [enviado, setEnviado] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {  
    e.preventDefault()
    
    try {
      const res = await api.sendContact(
        formData.nombre,
        formData.email,
        `Teléfono: ${formData.telefono}\nTipo de negocio: ${formData.tipoNegocio}\nMensaje: ${formData.mensaje}`
      )
      
      if (res.success) {
        setEnviado(true)
      } else {
        alert('Error al enviar: ' + (res.error || 'Inténtalo de nuevo'))
      }
    } catch (error) {
      alert('Error de conexión. Inténtalo de nuevo.')
    }
  }

  const faqs = [
    { q: '¿Cuánto tiempo tarda en estar lista mi web?', a: 'Normalmente entre 2 y 4 semanas dependiendo de la complejidad del proyecto.' },
    { q: '¿Qué incluye el precio?', a: 'Diseño, desarrollo, optimización SEO básica, hosting del primer año y soporte inicial.' },
    { q: '¿Puedo actualizar el contenido yo mismo?', a: 'Sí, todas nuestras webs incluyen un panel de administración sencillo.' },
    { q: '¿Ofrecen mantenimiento?', a: 'Sí, tenemos planes de mantenimiento mensual adaptados a cada cliente.' },
  ]

  return (
    <div className="contact-page">

      {/* Hero */}
      <section className="contact-hero">
        <h1 className="contact-hero-title">
          Hablemos de <br />
          <span className="contact-hero-highlight">tu proyecto</span>
        </h1>
        <p className="contact-hero-subtitle">
          Estamos aquí para ayudarte. Cuéntanos sobre tu negocio y te responderemos en menos de 24 horas.
        </p>
      </section>

      {/* Main: Info + Formulario */}
      <section className="contact-main">

        {/* Columna izquierda: info */}
        <div className="contact-info">
          <h2 className="contact-info-title">Información de contacto</h2>
          <p className="contact-info-subtitle">
            Contáctanos por cualquiera de estos medios y te responderemos lo antes posible.
          </p>

          <ul className="contact-info-list">
            <li className="contact-info-item">
              <div className="contact-info-icon contact-info-icon--blue">📞</div>
              <div>
                <strong>Teléfono</strong>
                <p>+34 611 491 647</p>
                <a href="tel:+34611491647" className="contact-info-link">Llamar ahora →</a>
              </div>
            </li>
            <li className="contact-info-item">
              <div className="contact-info-icon contact-info-icon--purple">✉️</div>
              <div>
                <strong>Email</strong>
                <p>info@studioswebsites.com</p>
                <a href="mailto:info@studioswebsites.com" className="contact-info-link">Enviar email →</a>
              </div>
            </li>
            <li className="contact-info-item">
              <div className="contact-info-icon contact-info-icon--green">💬</div>
              <div>
                <strong>WhatsApp</strong>
                <p>Chatea con nosotros</p>
                <a href="https://wa.me/611491647" className="contact-info-link" target="_blank" rel="noreferrer">Abrir WhatsApp →</a>
              </div>
            </li>
            <li className="contact-info-item">
              <div className="contact-info-icon contact-info-icon--orange">📍</div>
              <div>
                <strong>Ubicación</strong>
                <p>Sevilla, Andalusia, ES</p>
                <span className="contact-info-note">Trabajamos con clientes en toda España</span>
              </div>
            </li>
          </ul>

          {/* Horario */}
          <div className="contact-schedule">
            <h3 className="contact-schedule-title">Horario de Atención</h3>
            <table className="contact-schedule-table">
              <tbody>
                <tr><td>Lunes – Viernes</td><td>9:00 – 18:00</td></tr>
                <tr><td>Sábados</td><td>10:00 – 14:00</td></tr>
                <tr><td>Domingos</td><td className="contact-schedule-closed">Cerrado</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Columna derecha: formulario */}
        <div className="contact-form-card">
          <h2 className="contact-form-title">Solicita tu Presupuesto</h2>
          <p className="contact-form-subtitle">Completa el formulario y nos pondremos en contacto contigo.</p>

          {enviado ? (
            <div className="contact-success">
              <span className="contact-success-icon">✅</span>
              <h3>¡Mensaje enviado!</h3>
              <p>Te responderemos en menos de 24 horas.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="contact-form-group">
                  <label>Nombre Completo *</label>
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Juan Pérez"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact-form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="juan@ejemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="contact-form-row">
                <div className="contact-form-group">
                  <label>Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    placeholder="+34 123 456 789"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </div>
                <div className="contact-form-group">
                  <label>Tipo de Negocio</label>
                  <select
                    name="tipoNegocio"
                    value={formData.tipoNegocio}
                    onChange={handleChange}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="ecommerce">Restaurantes y cafetería</option>
                    <option value="corporativa">Pequeño negocio</option>
                    <option value="portfolio">Gimnasio y fitness</option>
                    <option value="startup">Tiendas y comercios</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>

              <div className="contact-form-group">
                <label>Cuéntanos sobre tu proyecto *</label>
                <textarea
                  name="mensaje"
                  placeholder="Describe tu negocio, qué necesitas para tu web, objetivos, etc."
                  rows={5}
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                />
              </div>

              <p className="contact-form-privacy">
                Al enviar este formulario, aceptas que contactemos contigo para responder a tu consulta. Tus datos están seguros y nunca los compartiremos con terceros.
              </p>

              <button type="submit" className="contact-form-btn">
                Enviar Mensaje
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="contact-faq">
        <h2 className="contact-faq-title">Preguntas Frecuentes</h2>
        <p className="contact-faq-subtitle">Respuestas rápidas a las dudas más comunes</p>

        <div className="contact-faq-list">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`contact-faq-item ${openFaq === i ? 'open' : ''}`}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div className="contact-faq-question">
                <span>{faq.q}</span>
                <span className="contact-faq-arrow">{openFaq === i ? '▲' : '▼'}</span>
              </div>
              {openFaq === i && (
                <div className="contact-faq-answer">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}

export default ContactPage
