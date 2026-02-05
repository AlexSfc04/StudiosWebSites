import { useState } from 'react'
import './Newsletter.css'

function Newsletter() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Email subscribed:', email)
    setEmail('')
  }

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <h2 className="newsletter-title">
            Ready to Take<br />
            Your Business to the<br />
            Next Level?
          </h2>
          <p className="newsletter-description">
            Subscribe to our newsletter and receive exclusive tips 
            on web design and development.
          </p>
          
          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="email"
              placeholder="Your email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter-input"
              required
            />
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
