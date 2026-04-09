import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <div className="footer-logo">
              <img src="/logo-studios.png" alt="SWS Logo" className="footer-logo-img" />
              <span>SWS</span>
            </div>
            <p className="footer-tagline">
              Tu Negocio merece una web excepcional
            </p>
            <p className="footer-description">
              Diseñamos y desarrollamos sitios web profesionales
              que ayudan a los negocios a crecer en el mundo digital.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Enlaces rápidos</h4>
            <ul className="footer-links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/servicios">Servicios</Link></li>
              <li><Link to="/sectores">Sectores</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Servicios</h4>
            <ul className="footer-links">
              <li><a href="#design">Diseño Web</a></li>
              <li><a href="#development">Desarrollo</a></li>
              <li><a href="#marketing">Marketing Digital</a></li>
              <li><a href="#seo">SEO</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Contacto</h4>
            <ul className="footer-contact">
              <li>
                <span className="contact-icon">📧</span>
                <a href="mailto:infotudioswebsites2026@gmail.com">
                  infotudioswebsites2026@gmail.com
                </a>
              </li>
              <li>
                <span className="contact-icon">📱</span>
                <a href="tel:+34XXXXXXXXX">
                  +34 611 491 647
                </a>
              </li>
              <li>
                <span className="contact-icon">📍</span>
                <span>Sevilla, Andalucía, ES</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2026 StudiosWebSites. Todos los derechos reservados.</p>
            <div className="footer-legal">
              <a href="/privacidad">Privacidad</a>
              <span>•</span>
              <a href="/politica-cookies">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
