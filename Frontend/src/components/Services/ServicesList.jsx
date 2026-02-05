import './ServicesList.css'

function ServicesList() {
  const services = [
    {
      title: 'Professional Web Design',
      description: 'Modern and attractive designs that capture the essence of your brand.',
      features: [
        'Responsive design',
        'Custom UI/UX',
        'Brand integration',
        'Optimized layouts'
      ]
    },
    {
      title: 'SEO Optimization',
      description: 'Improve your visibility in search engines and attract more customers.',
      features: [
        'Keyword research',
        'On-page optimization',
        'Technical SEO',
        'Performance tracking'
      ]
    },
    {
      title: 'E-commerce Development',
      description: 'Complete online stores ready to sell and grow your business.',
      features: [
        'Payment integration',
        'Inventory management',
        'Shopping cart',
        'Order tracking'
      ]
    },
    {
      title: 'Admin Portfolio',
      description: 'Complete management systems for your business operations.',
      features: [
        'Dashboard analytics',
        'User management',
        'Content administration',
        'Reporting tools'
      ]
    },
    {
      title: 'Maintenance & Support',
      description: 'Continuous support to keep your website running smoothly.',
      features: [
        'Regular updates',
        'Bug fixes',
        'Security patches',
        'Technical support 24/7'
      ]
    },
    {
      title: 'Web Security',
      description: 'Protect your website and customer data with advanced security measures.',
      features: [
        'SSL certificates',
        'Firewall protection',
        'Regular backups',
        'Security monitoring'
      ]
    },
    {
      title: 'Performance Optimization',
      description: 'Fast loading speeds and optimal performance for better user experience.',
      features: [
        'Speed optimization',
        'Image compression',
        'Code minification',
        'CDN integration'
      ]
    }
  ]

  return (
    <section className="services-list-section">
      <div className="services-list-container">
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-description">{service.description}</p>
              <ul className="service-card-features">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="service-feature-item">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="9" stroke="#6366f1" strokeWidth="2"/>
                      <path d="M6 10L9 13L14 7" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesList
