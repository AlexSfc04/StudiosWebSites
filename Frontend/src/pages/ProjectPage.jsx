import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Auth.css'
import { Globe, Analytics, ShoppingCart, Flash, Idea, Phone, Email } from '@carbon/icons-react'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!name || !email || !password) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    try {
      await register(name, email, password)
      navigate('/')
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">

      {/* LEFT — Form */}
      <div className="auth-form-side">
        <div className="auth-form-box">
          <Link to="/" className="auth-logo">
            <div className="auth-logo-icon">S</div>
            <span>SWS</span>
          </Link>

          {error && <div className="auth-error">{error}</div>}

          <h2 className="auth-title">Create your account</h2>
          <p className="auth-subtitle">It's free and takes one minute</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label>Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="auth-field">
              <label>Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="auth-field">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Loading...' : 'Create account'}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>

      {/* RIGHT — Brand panel (mismo que Login) */}
      <div className="auth-brand-side">
        <div className="auth-brand-content">
          <div className="auth-brand-logo">
            <div className="auth-brand-icon">S</div>
            <span>SWS</span>
          </div>
          <h2>Manage your business online.</h2>

          <ul className="auth-brand-features">
            <li>
              <span className="auth-feature-icon"><Globe size={22} /></span>
              <span>View and manage your <strong>website</strong></span>
            </li>
            <li>
              <span className="auth-feature-icon"><Analytics size={22} /></span>
              <span>See your <strong>statistics</strong></span>
            </li>
            <li>
              <div className="auth-feature-icon-wrap"><Email size={22} /></div>
              <span>Read your <strong>contact messages</strong></span>
            </li>
            <li>
              <div className="auth-feature-icon-wrap"><ShoppingCart size={22} /></div>
              <span>Manage your <strong>services</strong></span>
            </li>
            <li>
              <span className="auth-feature-icon"><Flash size={22} /></span>
              <span>Get <strong>fast support</strong> anytime</span>
            </li>
            <li>
              <span className="auth-feature-icon"><Idea size={22} /></span>
              <span>Access <strong>exclusive tips</strong> and resources</span>
            </li>
          </ul>

          <div className="auth-brand-contact">
            <p><strong>Customer support:</strong></p>
            <p><Phone size={14} /> +34 611 491 647</p>
            <p><Email size={14} /> infostudioswebsites2026@gmail.com</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Register
