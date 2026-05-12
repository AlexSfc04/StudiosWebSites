const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator')
const { OAuth2Client } = require('google-auth-library')
const crypto = require('crypto')
const User = require('../models/user')
const { upload } = require('../config/cloudinary')

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const router = express.Router()

// ── MIDDLEWARE JWT ────────────────────────────────────────
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.status(401).json({ error: 'Token no proporcionado' })

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' })
    req.user = user
    next()
  })
}

// ── REGISTRO ─────────────────────────────────────────────
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('name').notEmpty().withMessage('El nombre es requerido'),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const { email, password, name } = req.body
    try {
      const existingUser = await User.findByEmail(email)
      if (existingUser) return res.status(400).json({ error: 'El email ya está registrado' })

      const user = await User.create(email, password, name)
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role || 'user' },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      )
      res.status(201).json({
        message: 'Usuario registrado correctamente',
        token,
        user: { id: user.id, email: user.email, name: user.name, role: user.role || 'user' },
      })
    } catch (error) {
      console.error('Error en registro:', error)
      res.status(500).json({ error: 'Error al registrar usuario' })
    }
  }
)

// ── LOGIN ─────────────────────────────────────────────────
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const { email, password } = req.body
    try {
      const user = await User.findByEmail(email)
      if (!user) return res.status(401).json({ error: 'Credenciales incorrectas' })

      const isValidPassword = await User.verifyPassword(password, user.password)
      if (!isValidPassword) return res.status(401).json({ error: 'Credenciales incorrectas' })

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      )
      res.json({
        message: 'Login exitoso',
        token,
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
      })
    } catch (error) {
      console.error('Error en login:', error)
      res.status(500).json({ error: 'Error al iniciar sesión' })
    }
  }
)

// ── GOOGLE LOGIN ──────────────────────────────────────────
router.post('/google-login', async (req, res) => {
  const { idToken } = req.body
  if (!idToken) return res.status(400).json({ error: 'Token de Google no proporcionado' })
  if (!process.env.GOOGLE_CLIENT_ID) return res.status(500).json({ error: 'Falta GOOGLE_CLIENT_ID' })

  try {
    const ticket = await googleClient.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID })
    const payload = ticket.getPayload()
    if (!payload.email_verified) return res.status(403).json({ error: 'El correo de Google no está verificado' })

    let user = await User.findByEmail(payload.email)
    if (!user) {
      const randomPassword = crypto.randomBytes(20).toString('hex')
      user = await User.create(payload.email, randomPassword, payload.name || 'Usuario de Google')
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role || 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )
    res.json({
      message: 'Inicio de sesión con Google exitoso',
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role || 'user' },
    })
  } catch (error) {
    console.error('Error en Google login:', error)
    res.status(500).json({ error: 'Error al autenticar con Google' })
  }
})

// ── GET /profile ──────────────────────────────────────────
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })

    // ✅ Devuelve el objeto plano, sin anidarlo en { user: {} }
    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      country: user.country || '',
      language: user.language || 'es',
      timezone: user.timezone || 'Europe/Madrid',
      emailNotifications: user.emailNotifications ?? true,
      avatar: user.avatar || null,
    })
  } catch {
    res.status(500).json({ error: 'Error al obtener perfil' })
  }
})

// ── PUT /profile ──────────────────────────────────────────
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const updated = await User.updateProfile(req.user.id, req.body)
    res.json({
      id: updated.id,
      email: updated.email,
      name: updated.name,
      role: updated.role,
      country: updated.country || '',
      language: updated.language || 'es',
      timezone: updated.timezone || 'Europe/Madrid',
      emailNotifications: updated.emailNotifications ?? true,
    })
  } catch {
    res.status(500).json({ error: 'Error al actualizar perfil' })
  }
})

// ── PUT /password ─────────────────────────────────────────
router.put('/password', authenticateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body
  try {
    const user = await User.findByEmail(req.user.email)
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })

    const isMatch = await bcrypt.compare(currentPassword, user.password)
    if (!isMatch) return res.status(400).json({ message: 'La contraseña actual es incorrecta.' })

    if (newPassword.length < 8)
      return res.status(400).json({ message: 'La nueva contraseña debe tener al menos 8 caracteres.' })

    const hashed = await bcrypt.hash(newPassword, 10)
    await User.updatePassword(req.user.id, hashed)

    res.json({ message: 'Contraseña actualizada correctamente.' })
  } catch {
    res.status(500).json({ error: 'Error al cambiar la contraseña.' })
  }
})

  router.put('/avatar', authenticateToken, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No se proporcionó imagen.' })

    const avatarUrl = req.file.path // URL de Cloudinary

    await pool.query('UPDATE users SET avatar = ? WHERE id = ?', [avatarUrl, req.user.id])

    res.json({ message: 'Avatar actualizado.', avatar: avatarUrl })
  } catch (error) {
    console.error('Error avatar:', error)
    res.status(500).json({ error: 'Error al actualizar el avatar.' })
  }
})

// ── VERIFY ────────────────────────────────────────────────
router.get('/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user })
})

module.exports = router