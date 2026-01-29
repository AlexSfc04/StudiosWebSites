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
              Your Business Deserves an Exceptional Web
            </p>
            <p className="footer-description">
              We design and develop professional websites 
              that help businesses grow in the digital world.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/servicios">Services</Link></li>
              <li><Link to="/sectores">Sectors</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Services</h4>
            <ul className="footer-links">
              <li><a href="#design">Web Design</a></li>
              <li><a href="#development">Development</a></li>
              <li><a href="#marketing">Digital Marketing</a></li>
              <li><a href="#seo">SEO</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Contact</h4>
            <ul className="footer-contact">
              <li>
                <span className="contact-icon">📧</span>
                <a href="mailto:info@studioswebsites.com">
                  info@studioswebsites.com
                </a>
              </li>
              <li>
                <span className="contact-icon">📱</span>
                <a href="tel:+34XXXXXXXXX">
                  +34 XXX XXX XXX
                </a>
              </li>
              <li>
                <span className="contact-icon">📍</span>
                <span>Seville, Andalusia, ES</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2026 StudiosWebSites. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#privacy">Privacy</a>
              <span>•</span>
              <a href="#terms">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
