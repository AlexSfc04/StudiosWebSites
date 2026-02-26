import { Link } from 'react-router-dom'
import './Pricing.css'

function Pricing() {
  const plans = [
    {
      name: 'Básico',
      description: 'Perfecto para pequeños negocios y startups.',
      features: [
        'Hasta 5 páginas',
        'Diseño responsive',
        'SEO básico',
        'Formulario de contacto',
        '1 mes de soporte'
      ]
    },
    {
      name: 'Premium',
      description: 'Ideal para negocios en crecimiento.',
      features: [
        'Hasta 15 páginas',
        'Diseño avanzado',
        'SEO completo',
        'Integración de pagos',
        '6 meses de soporte'
      ],
      popular: true
    },
    {
      name: 'Empresa',
      description: 'Para grandes empresas con necesidades específicas.',
      features: [
        'Páginas ilimitadas',
        'Soluciones personalizadas',
        'Soporte prioritario',
        'Integraciones avanzadas',
        '12 meses de soporte'
      ]
    }
  ]

  return (
    <section className="pricing-section">
      <div className="pricing-container">
        <div className="pricing-header">
          <h2 className="pricing-title">Planes adaptados a tu negocio</h2>
          <p className="pricing-subtitle">
            Elige el plan que mejor se adapte a tus necesidades. Todos los planes incluyen
            diseño profesional y soporte continuo.
          </p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card ${plan.popular ? 'pricing-card-popular' : ''}`}
            >
              {plan.popular && <div className="pricing-badge">Más popular</div>}
              <h3 className="pricing-card-name">{plan.name}</h3>
              <p className="pricing-card-description">{plan.description}</p>
              <ul className="pricing-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="pricing-feature-item">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <circle cx="9" cy="9" r="8" stroke="#10b981" strokeWidth="2"/>
                      <path d="M5 9L8 12L13 6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contacto" className="pricing-btn">
                Empezar
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
