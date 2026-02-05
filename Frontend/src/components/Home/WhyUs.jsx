import './WhyUs.css'

function WhyUs() {
  const features = [
    {
      icon: '⚡',
      title: 'Fast Development',
      description: 'We launch your project in the shortest time possible.',
    },
    {
      icon: '💬',
      title: 'Real Support',
      description: 'We are always available to help you.',
    },
    {
      icon: '🌐',
      title: 'Web Optimization',
      description: 'Unique designs tailored to your brand.',
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Your website will look perfect on any device.',
    },
  ]

  return (
    <section className="why-us-section">
      <div className="why-us-container">
        <div className="why-us-header">
          <h2 className="why-us-title">Why Choose Us?</h2>
          <p className="why-us-subtitle">
            We combine creativity, technology and dedication to create 
            exceptional web experiences.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUs
