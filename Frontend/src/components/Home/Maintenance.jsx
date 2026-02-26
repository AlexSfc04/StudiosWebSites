import { Link } from 'react-router-dom'
import AnimatedSection from '../AnimatedSection/AnimatedSection'
import './Maintenance.css'

function Maintenance() {
  const maintenanceItems = [
    'Integraciones API',
    'Análisis de Datos',
    'Copias de Seguridad',
    'Certificados SSL',
  ]

  return (
    <section className="maintenance-section">
      <div className="maintenance-container">
        <AnimatedSection>
          <div className="maintenance-header">
            <h2 className="maintenance-title">Mantenimiento</h2>
          </div>
        </AnimatedSection>

        <div className="maintenance-list">
          {maintenanceItems.map((item, index) => (
            <AnimatedSection key={index} delay={index * 0.1} direction="right">
              <div className="maintenance-item">
                <div className="maintenance-check">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="9" stroke="#10b981" strokeWidth="2"/>
                    <path d="M6 10L9 13L14 7" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="maintenance-name">{item}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4}>
          <Link to="/servicios" className="maintenance-btn">
            Ver nuestros servicios →
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default Maintenance
