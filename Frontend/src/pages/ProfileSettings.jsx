import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  User,
  Email,
  Location,
  Password,
  Save,
  View,
  ViewOff,
  Settings,

} from '@carbon/icons-react'
import api from '../services/api'
import { useAuth } from '../contexts/AuthContext'
import './ProfileSettings.css'
import { useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'https://studios-web-sites-u6qh.vercel.app'

function ProfileSettings() {
  const { updateUser } = useAuth()
  const navigate = useNavigate()

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    country: '',
    language: 'es',
    timezone: 'Europe/Madrid',
    emailNotifications: true,
  })

  // ✅ Nuevos campos para gestionar cuentas de Google
  const [provider, setProvider] = useState('local')
  const [hasPassword, setHasPassword] = useState(true)

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [show, setShow] = useState({
    current: false,
    next: false,
    confirm: false,
  })

  const [savingProfile, setSavingProfile] = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await api.getProfile()
        setAvatarPreview(data.avatar || null)
        setProvider(data.provider || 'local')
        setHasPassword(!!data.hasPassword)
        setProfile({
          name: data.name || '',
          email: data.email || '',
          country: data.country || '',
          language: data.language || 'es',
          timezone: data.timezone || 'Europe/Madrid',
          emailNotifications: data.emailNotifications ?? true,
        })
      } catch {
        setError('No se pudo cargar la información de la cuenta.')
      }
    }
    loadProfile()
  }, [])

  const handleProfileChange = (e) => {
    const { name, value, type, checked } = e.target
    setProfile((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswords((prev) => ({ ...prev, [name]: value }))
  }

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Solo se permiten imágenes.')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setError('La imagen no puede superar los 2MB.')
      return
    }

    setUploadingAvatar(true)
    setError('')

    try {
      setAvatarPreview(URL.createObjectURL(file))

      const formData = new FormData()
      formData.append('avatar', file)

      const response = await fetch(`${API_URL}/auth/avatar`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: formData,
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || 'No se pudo actualizar la foto.')
      }

      const data = await response.json()
      setAvatarPreview(data.avatar)
      updateUser({ avatar: data.avatar })
      setMessage('Foto de perfil actualizada.')
    } catch (err) {
      setError(err.message)
      setAvatarPreview(null)
    } finally {
      setUploadingAvatar(false)
    }
  }

  const saveProfile = async (e) => {
    e.preventDefault()
    setSavingProfile(true)
    setMessage('')
    setError('')

    try {
      const updated = await api.updateProfile(profile)
      updateUser({ name: updated.name || profile.name, email: updated.email || profile.email })
      setMessage('La información de la cuenta se ha actualizado correctamente.')
    } catch (err) {
      setError(err.message)
    } finally {
      setSavingProfile(false)
    }
  }

  const changePassword = async (e) => {
    e.preventDefault()
    setSavingPassword(true)
    setMessage('')
    setError('')

    if (passwords.newPassword.length < 8) {
      setError('La nueva contraseña debe tener al menos 8 caracteres.')
      setSavingPassword(false)
      return
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError('La confirmación de la contraseña no coincide.')
      setSavingPassword(false)
      return
    }

    try {
      await api.changePassword(passwords.currentPassword, passwords.newPassword)
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' })
      // ✅ Tras establecer contraseña por primera vez, actualiza el estado local
      setHasPassword(true)
      setMessage(
        hasPassword
          ? 'La contraseña se ha actualizado correctamente.'
          : 'Contraseña establecida. Ya puedes iniciar sesión con email y contraseña.'
      )
    } catch (err) {
      setError(err.message)
    } finally {
      setSavingPassword(false)
    }
  }

  // ✅ Usuario de Google sin contraseña → no necesita introducir la actual
  const isGoogleWithoutPassword = provider === 'google' && !hasPassword

  return (
    <section className="profile-settings-page">
      <div className="profile-settings-container">
        <div className="profile-settings-header">
          <button className="settings-back-btn" onClick={() => navigate('/')} aria-label="Volver al inicio">
            <ArrowLeft size={18} aria-hidden="true" />
            Volver
          </button>
          <div className="profile-settings-title-wrap">
            <Settings size={24} aria-hidden="true" />
            <div>
              <h1>Configuración de cuenta</h1>
              <p>Gestiona tu información personal, seguridad y preferencias.</p>
            </div>
          </div>
        </div>

        {message && <div className="settings-feedback success">{message}</div>}
        {error && <div className="settings-feedback error">{error}</div>}

        <div className="avatar-section">
          <div className="avatar-wrapper">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar" className="avatar-img" />
            ) : (
              <div className="avatar-placeholder">
                {profile.name ? profile.name.charAt(0).toUpperCase() : '?'}
              </div>
            )}
            <label className="avatar-upload-btn" title="Cambiar foto">
              {uploadingAvatar ? '...' : '📷'}
              <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
            </label>
          </div>
          <div className="avatar-info">
            <p className="avatar-name">{profile.name || 'Tu nombre'}</p>
            <p className="avatar-email">{profile.email}</p>
            {/* ✅ Badge que indica cuenta vinculada con Google */}
            {provider === 'google' && (
                <span className="google-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Cuenta de Google
                </span>
              )}
          </div>
        </div>

        <div className="profile-settings-grid">
          {/* ── INFORMACIÓN ── */}
          <form className="settings-card" onSubmit={saveProfile}>
            <div className="settings-card-header">
              <h2>Información de la cuenta</h2>
              <p>Actualiza tus datos personales y preferencias básicas.</p>
            </div>

            <label className="settings-field">
              <span className="settings-label"><User size={16} aria-hidden="true" />Nombre</span>
              <input type="text" name="name" value={profile.name} onChange={handleProfileChange} placeholder="Tu nombre" />
            </label>

            <label className="settings-field">
              <span className="settings-label"><Email size={16} aria-hidden="true" />Correo electrónico</span>
              <input type="email" name="email" value={profile.email} onChange={handleProfileChange} placeholder="correo@dominio.com" />
            </label>

            <label className="settings-field">
              <span className="settings-label"><Location size={16} aria-hidden="true" />País</span>
              <input type="text" name="country" value={profile.country} onChange={handleProfileChange} placeholder="España" />
            </label>

            <label className="settings-field">
              <span className="settings-label">Idioma</span>
              <select name="language" value={profile.language} onChange={handleProfileChange}>
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </label>

            <label className="settings-field">
              <span className="settings-label">Zona horaria</span>
              <select name="timezone" value={profile.timezone} onChange={handleProfileChange}>
                <option value="Europe/Madrid">Europe/Madrid</option>
                <option value="Europe/London">Europe/London</option>
                <option value="America/New_York">America/New_York</option>
              </select>
            </label>

            <label className="settings-checkbox">
              <input type="checkbox" name="emailNotifications" checked={profile.emailNotifications} onChange={handleProfileChange} />
              <span>Recibir comunicaciones y avisos por correo electrónico</span>
            </label>

            <button className="settings-primary-btn" type="submit" disabled={savingProfile}>
              <Save size={18} aria-hidden="true" />
              {savingProfile ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </form>

          {/* ── SEGURIDAD ── */}
          <form className="settings-card" onSubmit={changePassword}>
            <div className="settings-card-header">
              <h2>Seguridad</h2>
              {/* ✅ Subtítulo adaptado según el caso */}
              <p>
                {isGoogleWithoutPassword
                  ? 'Establece una contraseña para poder iniciar sesión también con email.'
                  : 'Cambia tu contraseña cuando lo necesites.'}
              </p>
            </div>

            {/* ✅ Campo "contraseña actual" solo si ya tiene contraseña */}
            {!isGoogleWithoutPassword && (
              <label className="settings-field">
                <span className="settings-label"><Password size={16} aria-hidden="true" />Contraseña actual</span>
                <div className="settings-password-wrap">
                  <input
                    type={show.current ? 'text' : 'password'}
                    name="currentPassword"
                    value={passwords.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Introduce tu contraseña actual"
                  />
                  <button type="button" className="password-toggle-btn" onClick={() => setShow((prev) => ({ ...prev, current: !prev.current }))}>
                    {show.current ? <ViewOff size={18} /> : <View size={18} />}
                  </button>
                </div>
              </label>
            )}

            <label className="settings-field">
              <span className="settings-label"><Password size={16} aria-hidden="true" />Nueva contraseña</span>
              <div className="settings-password-wrap">
                <input
                  type={show.next ? 'text' : 'password'}
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Mínimo 8 caracteres"
                />
                <button type="button" className="password-toggle-btn" onClick={() => setShow((prev) => ({ ...prev, next: !prev.next }))}>
                  {show.next ? <ViewOff size={18} /> : <View size={18} />}
                </button>
              </div>
            </label>

            <label className="settings-field">
              <span className="settings-label"><Password size={16} aria-hidden="true" />Confirmar nueva contraseña</span>
              <div className="settings-password-wrap">
                <input
                  type={show.confirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Repite la nueva contraseña"
                />
                <button type="button" className="password-toggle-btn" onClick={() => setShow((prev) => ({ ...prev, confirm: !prev.confirm }))}>
                  {show.confirm ? <ViewOff size={18} /> : <View size={18} />}
                </button>
              </div>
            </label>

            <div className="settings-helper">
              La contraseña debe tener al menos 8 caracteres.
            </div>

            <button className="settings-primary-btn" type="submit" disabled={savingPassword}>
              <Password size={18} aria-hidden="true" />
              {savingPassword
                ? 'Guardando...'
                : isGoogleWithoutPassword
                  ? 'Establecer contraseña'
                  : 'Actualizar contraseña'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ProfileSettings