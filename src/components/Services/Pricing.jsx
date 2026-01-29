import { Link } from 'react-router-dom'
import './Pricing.css'

function Pricing() {
  const plans = [
    {
      name: 'Basic',
      description: 'Perfect for small businesses and startups.',
      features: [
        'Up to 5 pages',
        'Responsive design',
        'Basic SEO',
        'Contact form',
        '1 month support'
      ]
    },
    {
      name: 'Premium',
      description: 'Ideal for growing businesses.',
      features: [
        'Up to 15 pages',
        'Advanced design',
        'Complete SEO',
        'Payment integration',
        '6 months support'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'For large companies with specific needs.',
      features: [
        'Unlimited pages',
        'Custom solutions',
        'Priority support',
        'Advanced integrations',
        '12 months support'
      ]
    }
  ]

  return (
    <section className="pricing-section">
      <div className="pricing-container">
        <div className="pricing-header">
          <h2 className="pricing-title">Plans Tailored to Your Business</h2>
          <p className="pricing-subtitle">
            Choose the plan that best fits your needs. All plans include 
            professional design and ongoing support.
          </p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`pricing-card ${plan.popular ? 'pricing-card-popular' : ''}`}
            >
              {plan.popular && <div className="pricing-badge">Most Popular</div>}
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
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
