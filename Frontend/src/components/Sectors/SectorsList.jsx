import { Link } from 'react-router-dom'
import './SectorsList.css'

function SectorsList() {
  const sectors = [
    {
      title: 'Restaurants & Cafes',
      description: 'Complete digital solutions for restaurants, bars and cafes to attract more customers.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop',
      features: [
        'Online reservations',
        'Digital menu',
        'Order management',
        'Table booking system',
        'Customer reviews',
        'Social media integration'
      ],
      buttonColor: 'orange'
    },
    {
      title: 'Small Businesses',
      description: 'Affordable and effective websites for small and medium businesses looking to grow.',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=400&fit=crop',
      features: [
        'Professional design',
        'Contact forms',
        'Service showcase',
        'Customer testimonials',
        'Location map',
        'Mobile responsive'
      ],
      buttonColor: 'purple'
    },
    {
      title: 'Stores & Retail',
      description: 'Online stores and e-commerce platforms to sell your products globally.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop',
      features: [
        'Shopping cart',
        'Payment gateway',
        'Product catalog',
        'Inventory management',
        'Shipping integration',
        'Customer accounts'
      ],
      buttonColor: 'pink'
    },
    {
      title: 'Gyms & Fitness',
      description: 'Modern websites for gyms, yoga studios and fitness centers to grow membership.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop',
      features: [
        'Class schedules',
        'Membership plans',
        'Trainer profiles',
        'Online booking',
        'Progress tracking',
        'Nutrition blog'
      ],
      buttonColor: 'blue'
    }
  ]

  return (
    <section className="sectors-list-section">
      <div className="sectors-list-container">
        {sectors.map((sector, index) => (
          <div 
            key={index} 
            className={`sector-item ${index % 2 === 1 ? 'sector-item-reverse' : ''}`}
          >
            <div className="sector-image-container">
              <img 
                src={sector.image} 
                alt={sector.title} 
                className="sector-image"
              />
            </div>
            <div className="sector-content">
              <h2 className="sector-title">{sector.title}</h2>
              <p className="sector-description">{sector.description}</p>
              <ul className="sector-features">
                {sector.features.map((feature, idx) => (
                  <li key={idx} className="sector-feature-item">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <circle cx="9" cy="9" r="8" stroke="#10b981" strokeWidth="2"/>
                      <path d="M5 9L8 12L13 6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link 
                to="/portfolio" 
                className={`sector-button sector-button-${sector.buttonColor}`}
              >
                View Completed Projects
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SectorsList
