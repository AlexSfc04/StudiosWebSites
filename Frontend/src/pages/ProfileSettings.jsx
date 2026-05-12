import { useEffect, useState } from 'react'
import {
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
import './ProfileSettings.css'

function ProfileSettings() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    country: '',
    language: 'es',
    timezone: 'Europe/Madrid',
    emailNotifications: true,
  })

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

  const saveProfile = async (e) => {
    e.preventDefault()
    setSavingProfile(true)
    setMessage('')
    setError('')

    try {
      const updated = await api.updateProfile(profile)
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
      localStorage.setItem(
        'user',
        JSON.stringify({
          ...currentUser,
          name: updated.name || profile.name,
          email: updated.email || profile.email,
        }),
      )

      setMessage('La información de la cuenta se ha actualizado correctamente.')
    } catch (err) {
      setError(err.message)
    } finally {
      setSavingProfile(false)
    }
  }

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validaciones
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

    // Convertir a Base64
    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64 = reader.result
      try {
        await api.updateAvatar(base64)
        setAvatarPreview(base64)
        // Actualiza localStorage
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
        localStorage.setItem('user', JSON.stringify({ ...currentUser, avatar: base64 }))
        setMessage('Foto de perfil actualizada.')
      } catch (err) {
        setError(err.message)
      } finally {
        setUploadingAvatar(false)
      }
    }
    reader.readAsDataURL(file)
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
      await api.changePassword(passwords.currentPassword, passwords.newPassword) // ← antes: fetch('http://localhost:5000/users/me/password', PUT)
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setMessage('La contraseña se ha actualizado correctamente.')
    } catch (err) {
      setError(err.message)
    } finally {
      setSavingPassword(false)
    }
  }

  return (
    <section className="profile-settings-page">
      <div className="profile-settings-container">
        <div className="profile-settings-header">
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
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: 'none' }}
            />
          </label>
        </div>
        <div className="avatar-info">
          <p className="avatar-name">{profile.name || 'Tu nombre'}</p>
          <p className="avatar-email">{profile.email}</p>
        </div>
      </div>

        <div className="profile-settings-grid">
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

          <form className="settings-card" onSubmit={changePassword}>
            <div className="settings-card-header">
              <h2>Seguridad</h2>
              <p>Cambia tu contraseña cuando lo necesites.</p>
            </div>

            <label className="settings-field">
              <span className="settings-label"><Password size={16} aria-hidden="true" />Contraseña actual</span>
              <div className="settings-password-wrap">
                <input type={show.current ? 'text' : 'password'} name="currentPassword" value={passwords.currentPassword} onChange={handlePasswordChange} placeholder="Introduce tu contraseña actual" />
                <button type="button" className="password-toggle-btn" onClick={() => setShow((prev) => ({ ...prev, current: !prev.current }))}>
                  {show.current ? <ViewOff size={18} /> : <View size={18} />}
                </button>
              </div>
            </label>

            <label className="settings-field">
              <span className="settings-label"><Password size={16} aria-hidden="true" />Nueva contraseña</span>
              <div className="settings-password-wrap">
                <input type={show.next ? 'text' : 'password'} name="newPassword" value={passwords.newPassword} onChange={handlePasswordChange} placeholder="Mínimo 8 caracteres" />
                <button type="button" className="password-toggle-btn" onClick={() => setShow((prev) => ({ ...prev, next: !prev.next }))}>
                  {show.next ? <ViewOff size={18} /> : <View size={18} />}
                </button>
              </div>
            </label>

            <label className="settings-field">
              <span className="settings-label"><Password size={16} aria-hidden="true" />Confirmar nueva contraseña</span>
              <div className="settings-password-wrap">
                <input type={show.confirm ? 'text' : 'password'} name="confirmPassword" value={passwords.confirmPassword} onChange={handlePasswordChange} placeholder="Repite la nueva contraseña" />
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
              {savingPassword ? 'Actualizando...' : 'Actualizar contraseña'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ProfileSettings