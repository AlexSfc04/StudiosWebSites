import { Link } from 'react-router-dom'
import AnimatedSection from '../AnimatedSection/AnimatedSection'
import './Maintenance.css'
import { CheckmarkFilled, ArrowRight } from '@carbon/icons-react'

function Maintenance() {
  const maintenanceItems = [
    'Integraciones API',
    'Análisis de datos',
    'Copias de seguridad',
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
          <CheckmarkFilled size={20} />
        </div>
        <span className="maintenance-name">{item}</span>
      </div>
    </AnimatedSection>
  ))}
</div>

        <div style={{ textAlign: 'center' }}>
          <AnimatedSection delay={0.4}>
            <Link to="/servicios" className="maintenance-btn">
              Ver nuestros servicios <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

export default Maintenance
