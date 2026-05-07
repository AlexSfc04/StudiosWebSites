import { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import api from '../services/api'
import './AdminPage.css'
import './ProfilePage.css'
import SEO from '../components/SEO/SEO'
import {
  Dashboard,
  Portfolio,
  Edit,
  Settings,
  Email,
  Logout,
  ArrowLeft,
  User,
  Notification,
  DataTable,
  Globe,
  Time,
  Password,
  Location,
  Phone,
  Save,
  Warning,
  CheckmarkFilled,
  TrashCan,
} from '@carbon/icons-react'

const COUNTRIES = [
  'España', 'México', 'Argentina', 'Colombia', 'Chile', 'Perú', 'Venezuela',
  'Ecuador', 'Bolivia', 'Paraguay', 'Uruguay', 'Guatemala', 'Honduras',
  'El Salvador', 'Nicaragua', 'Costa Rica', 'Panamá', 'Cuba', 'República Dominicana',
  'Puerto Rico', 'Estados Unidos', 'Otro',
]

function ProfilePage() {
  const { user, logout, updateUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [profileForm, setProfileForm] = useState({
    name: user?.name || user?.nombre || '',
    email: user?.email || '',
    phone: user?.phone || user?.telefono || '',
    country: user?.country || user?.pais || 'España',
    bio: user?.bio || '',
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [profileStatus, setProfileStatus] = useState(null) // 'success' | 'error' | null
  const [passwordStatus, setPasswordStatus] = useState(null)
  const [profileLoading, setProfileLoading] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('profile') // 'profile' | 'security' | 'danger'

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setProfileLoading(true)
    setProfileStatus(null)
    try {
      await api.updateProfile(profileForm)
      if (updateUser) updateUser(profileForm)
      setProfileStatus('success')
    } catch {
      setProfileStatus('error')
    } finally {
      setProfileLoading(false)
      setTimeout(() => setProfileStatus(null), 4000)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setPasswordStatus(null)
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordStatus('mismatch')
      return
    }
    if (passwordForm.newPassword.length < 8) {
      setPasswordStatus('short')
      return
    }
    setPasswordLoading(true)
    try {
      await api.updatePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      })
      setPasswordStatus('success')
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch {
      setPasswordStatus('error')
    } finally {
      setPasswordLoading(false)
      setTimeout(() => setPasswordStatus(null), 4000)
    }
  }

  const passwordStrength = (pw) => {
    if (!pw) return null
    let score = 0
    if (pw.length >= 8) score++
    if (/[A-Z]/.test(pw)) score++
    if (/[0-9]/.test(pw)) score++
    if (/[^A-Za-z0-9]/.test(pw)) score++
    if (score <= 1) return { label: 'Débil', color: '#ef4444', width: '25%' }
    if (score === 2) return { label: 'Regular', color: '#f59e0b', width: '50%' }
    if (score === 3) return { label: 'Buena', color: '#3b82f6', width: '75%' }
    return { label: 'Fuerte', color: '#10b981', width: '100%' }
  }

  const strength = passwordStrength(passwordForm.newPassword)

  const tabs = [
    { key: 'profile', label: 'Perfil', icon: <User size={16} /> },
    { key: 'security', label: 'Seguridad', icon: <Password size={16} /> },
    { key: 'danger', label: 'Cuenta', icon: <Settings size={16} /> },
  ]

  return (
    <div className="adm-root">
      <SEO
        title="Mi perfil"
        description="Gestiona tu perfil y configuración de cuenta en StudiosWebSites."
        canonical="https://studioswebsites.com/perfil"
        robots="noindex,nofollow"
      />

      {/* SIDEBAR */}
      <aside className="adm-sidebar">
        <div className="adm-sidebar-logo">
          <img src="/logo-studios.png" alt="SWS" className="adm-sidebar-logo-img" />
          <span>SWS</span>
          <span className="adm-sidebar-badge">Admin</span>
        </div>

        <nav className="adm-sidebar-nav">
          <p className="adm-sidebar-section-label">Panel</p>
          <Link to="/admin" className={`adm-sidebar-link ${isActive('/admin') ? 'adm-sidebar-link--active' : ''}`}>
            <Dashboard size={18} /> Dashboard
          </Link>
          <Link to="/admin/projects" className={`adm-sidebar-link ${isActive('/admin/projects') ? 'adm-sidebar-link--active' : ''}`}>
            <Portfolio size={18} /> Proyectos
          </Link>
          <Link to="/admin/articles" className={`adm-sidebar-link ${isActive('/admin/articles') ? 'adm-sidebar-link--active' : ''}`}>
            <Edit size={18} /> Blog
          </Link>

          <p className="adm-sidebar-section-label" style={{ marginTop: '24px' }}>Cuenta</p>
          <Link to="/perfil" className={`adm-sidebar-link ${isActive('/perfil') ? 'adm-sidebar-link--active' : ''}`}>
            <User size={18} /> Mi perfil
          </Link>

          <p className="adm-sidebar-section-label" style={{ marginTop: '24px' }}>Próximamente</p>
          <span className="adm-sidebar-link adm-sidebar-link--disabled"><Settings size={18} /> Servicios</span>
          <span className="adm-sidebar-link adm-sidebar-link--disabled"><Email size={18} /> Contactos</span>
          <span className="adm-sidebar-link adm-sidebar-link--disabled"><DataTable size={18} /> Analíticas</span>
        </nav>

        <div className="adm-sidebar-footer">
          <Link to="/" className="adm-sidebar-link">
            <ArrowLeft size={18} /> Volver a la web
          </Link>
          <button className="adm-sidebar-logout" onClick={handleLogout}>
            <Logout size={18} /> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="adm-main">

        {/* Topbar */}
        <header className="adm-topbar">
          <div className="adm-topbar-left">
            <h1 className="adm-topbar-title">Mi perfil</h1>
            <span className="adm-topbar-date">
              <Time size={14} />
              Configuración de cuenta
            </span>
          </div>
          <div className="adm-topbar-right">
            <button className="adm-topbar-icon-btn" aria-label="Notificaciones">
              <Notification size={18} />
            </button>
            <div className="adm-topbar-user">
              <div className="adm-topbar-avatar"><User size={16} /></div>
              <div className="adm-topbar-user-info">
                <span className="adm-topbar-user-name">{user?.name || user?.email}</span>
                <span className="adm-topbar-user-role">Administrador</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="adm-content">

          {/* Avatar + nombre */}
          <div className="prf-hero">
            <div className="prf-avatar">
              <User size={32} />
            </div>
            <div className="prf-hero-info">
              <h2 className="prf-hero-name">{user?.name || user?.nombre || 'Usuario'}</h2>
              <p className="prf-hero-email">{user?.email}</p>
              <span className="prf-hero-role">
                <CheckmarkFilled size={12} />
                {user?.role === 'admin' ? 'Administrador' : 'Cliente'}
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="prf-tabs">
            {tabs.map(t => (
              <button
                key={t.key}
                className={`prf-tab ${activeTab === t.key ? 'prf-tab--active' : ''}`}
                onClick={() => setActiveTab(t.key)}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* TAB: PERFIL */}
          {activeTab === 'profile' && (
            <div className="prf-section">
              <div className="prf-section-header">
                <h3 className="prf-section-title">Información personal</h3>
                <p className="prf-section-desc">Actualiza tus datos de contacto y preferencias.</p>
              </div>

              <form onSubmit={handleProfileSubmit} className="prf-form">
                <div className="prf-form-row">
                  <div className="prf-field">
                    <label className="prf-label">Nombre completo</label>
                    <div className="prf-input-wrap">
                      <User size={16} className="prf-input-icon" />
                      <input
                        className="prf-input"
                        type="text"
                        placeholder="Tu nombre"
                        value={profileForm.name}
                        onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="prf-field">
                    <label className="prf-label">Correo electrónico</label>
                    <div className="prf-input-wrap">
                      <Email size={16} className="prf-input-icon" />
                      <input
                        className="prf-input"
                        type="email"
                        placeholder="correo@ejemplo.com"
                        value={profileForm.email}
                        onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="prf-form-row">
                  <div className="prf-field">
                    <label className="prf-label">Teléfono</label>
                    <div className="prf-input-wrap">
                      <Phone size={16} className="prf-input-icon" />
                      <input
                        className="prf-input"
                        type="tel"
                        placeholder="+34 600 000 000"
                        value={profileForm.phone}
                        onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="prf-field">
                    <label className="prf-label">País</label>
                    <div className="prf-input-wrap">
                      <Location size={16} className="prf-input-icon" />
                      <select
                        className="prf-input prf-select"
                        value={profileForm.country}
                        onChange={e => setProfileForm({ ...profileForm, country: e.target.value })}
                      >
                        {COUNTRIES.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="prf-field prf-field--full">
                  <label className="prf-label">Sobre ti <span className="prf-label-opt">opcional</span></label>
                  <textarea
                    className="prf-input prf-textarea"
                    placeholder="Breve descripción sobre ti o tu empresa..."
                    rows={3}
                    value={profileForm.bio}
                    onChange={e => setProfileForm({ ...profileForm, bio: e.target.value })}
                  />
                </div>

                <div className="prf-form-footer">
                  {profileStatus === 'success' && (
                    <span className="prf-status prf-status--ok">
                      <CheckmarkFilled size={14} /> Perfil actualizado correctamente
                    </span>
                  )}
                  {profileStatus === 'error' && (
                    <span className="prf-status prf-status--err">
                      <Warning size={14} /> Error al guardar. Inténtalo de nuevo.
                    </span>
                  )}
                  <button type="submit" className="prf-btn-primary" disabled={profileLoading}>
                    <Save size={16} />
                    {profileLoading ? 'Guardando...' : 'Guardar cambios'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: SEGURIDAD */}
          {activeTab === 'security' && (
            <div className="prf-section">
              <div className="prf-section-header">
                <h3 className="prf-section-title">Cambiar contraseña</h3>
                <p className="prf-section-desc">Usa una contraseña de al menos 8 caracteres con letras, números y símbolos.</p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="prf-form prf-form--narrow">
                <div className="prf-field">
                  <label className="prf-label">Contraseña actual</label>
                  <div className="prf-input-wrap">
                    <Password size={16} className="prf-input-icon" />
                    <input
                      className="prf-input"
                      type="password"
                      placeholder="••••••••"
                      value={passwordForm.currentPassword}
                      onChange={e => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="prf-field">
                  <label className="prf-label">Nueva contraseña</label>
                  <div className="prf-input-wrap">
                    <Password size={16} className="prf-input-icon" />
                    <input
                      className="prf-input"
                      type="password"
                      placeholder="••••••••"
                      value={passwordForm.newPassword}
                      onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      required
                    />
                  </div>
                  {strength && (
                    <div className="prf-strength">
                      <div className="prf-strength-bar">
                        <div
                          className="prf-strength-fill"
                          style={{ width: strength.width, background: strength.color }}
                        />
                      </div>
                      <span className="prf-strength-label" style={{ color: strength.color }}>
                        {strength.label}
                      </span>
                    </div>
                  )}
                </div>

                <div className="prf-field">
                  <label className="prf-label">Confirmar nueva contraseña</label>
                  <div className="prf-input-wrap">
                    <Password size={16} className="prf-input-icon" />
                    <input
                      className="prf-input"
                      type="password"
                      placeholder="••••••••"
                      value={passwordForm.confirmPassword}
                      onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="prf-form-footer">
                  {passwordStatus === 'success' && (
                    <span className="prf-status prf-status--ok">
                      <CheckmarkFilled size={14} /> Contraseña actualizada correctamente
                    </span>
                  )}
                  {passwordStatus === 'mismatch' && (
                    <span className="prf-status prf-status--err">
                      <Warning size={14} /> Las contraseñas no coinciden
                    </span>
                  )}
                  {passwordStatus === 'short' && (
                    <span className="prf-status prf-status--err">
                      <Warning size={14} /> La contraseña debe tener al menos 8 caracteres
                    </span>
                  )}
                  {passwordStatus === 'error' && (
                    <span className="prf-status prf-status--err">
                      <Warning size={14} /> Contraseña actual incorrecta
                    </span>
                  )}
                  <button type="submit" className="prf-btn-primary" disabled={passwordLoading}>
                    <Save size={16} />
                    {passwordLoading ? 'Actualizando...' : 'Actualizar contraseña'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: CUENTA / DANGER */}
          {activeTab === 'danger' && (
            <div className="prf-section">
              <div className="prf-section-header">
                <h3 className="prf-section-title">Gestión de cuenta</h3>
                <p className="prf-section-desc">Acciones permanentes sobre tu cuenta. Procede con cautela.</p>
              </div>

              <div className="prf-info-grid">
                <div className="prf-info-item">
                  <span className="prf-info-label">ID de cuenta</span>
                  <span className="prf-info-value prf-info-value--mono">{user?.id || '—'}</span>
                </div>
                <div className="prf-info-item">
                  <span className="prf-info-label">Rol</span>
                  <span className="prf-info-value">{user?.role === 'admin' ? 'Administrador' : 'Cliente'}</span>
                </div>
                <div className="prf-info-item">
                  <span className="prf-info-label">Estado</span>
                  <span className="prf-info-value prf-info-value--active">
                    <CheckmarkFilled size={12} /> Activa
                  </span>
                </div>
                <div className="prf-info-item">
                  <span className="prf-info-label">Correo registrado</span>
                  <span className="prf-info-value">{user?.email}</span>
                </div>
              </div>

              <div className="prf-danger-zone">
                <div className="prf-danger-header">
                  <Warning size={18} />
                  <span>Zona peligrosa</span>
                </div>
                <div className="prf-danger-item">
                  <div>
                    <p className="prf-danger-title">Cerrar sesión en todos los dispositivos</p>
                    <p className="prf-danger-desc">Se cerrará la sesión en todos los navegadores y dispositivos activos.</p>
                  </div>
                  <button className="prf-btn-warning" onClick={handleLogout}>
                    <Logout size={16} /> Cerrar todas las sesiones
                  </button>
                </div>
                <div className="prf-danger-item">
                  <div>
                    <p className="prf-danger-title">Eliminar cuenta</p>
                    <p className="prf-danger-desc">Esta acción es irreversible. Se eliminarán todos tus datos permanentemente.</p>
                  </div>
                  <button
                    className="prf-btn-danger"
                    onClick={() => {
                      if (confirm('¿Estás seguro? Esta acción no se puede deshacer.')) {
                        alert('Contacta con soporte para eliminar tu cuenta.')
                      }
                    }}
                  >
                    <TrashCan size={16} /> Eliminar cuenta
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}

export default ProfilePage