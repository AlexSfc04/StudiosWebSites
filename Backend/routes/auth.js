const express = require('express')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const { OAuth2Client } = require('google-auth-library')
const crypto = require('crypto')
const User = require('../models/user')

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const router = express.Router()

// Middleware para verificar token JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' })
    }
    req.user = user
    next()
  })
}

// REGISTRO
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('name').notEmpty().withMessage('El nombre es requerido')
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password, name } = req.body

    try {
      const existingUser = await User.findByEmail(email)
      if (existingUser) {
        return res.status(400).json({ error: 'El email ya está registrado' })
      }

      const user = await User.create(email, password, name) // asegúrate de que ponga role='user' por defecto

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role || 'user' },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      )

      res.status(201).json({
        message: 'Usuario registrado correctamente',
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role || 'user'
        }
      })
    } catch (error) {
      console.error('Error en registro:', error)
      res.status(500).json({ error: 'Error al registrar usuario' })
    }
  }
)

// LOGIN
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('La contraseña es requerida')
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
      const user = await User.findByEmail(email)
      if (!user) {
        return res.status(401).json({ error: 'Credenciales incorrectas' })
      }

      const isValidPassword = await User.verifyPassword(password, user.password)
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Credenciales incorrectas' })
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      )

      res.json({
        message: 'Login exitoso',
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      })
    } catch (error) {
      console.error('Error en login:', error)
      res.status(500).json({ error: 'Error al iniciar sesión' })
    }
  }
)

// GOOGLE LOGIN / REGISTER
router.post('/google-login', async (req, res) => {
  const { idToken } = req.body

  if (!idToken) {
    return res.status(400).json({ error: 'Token de Google no proporcionado' })
  }

  if (!process.env.GOOGLE_CLIENT_ID) {
    return res.status(500).json({ error: 'Falta GOOGLE_CLIENT_ID en la configuración del servidor' })
  }

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()
    const email = payload.email
    const name = payload.name || 'Usuario de Google'
    const emailVerified = payload.email_verified

    if (!emailVerified) {
      return res.status(403).json({ error: 'El correo de Google no está verificado' })
    }

    let user = await User.findByEmail(email)

    if (!user) {
      const randomPassword = crypto.randomBytes(20).toString('hex')
      user = await User.create(email, randomPassword, name)
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role || 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      message: 'Inicio de sesión con Google exitoso',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role || 'user'
      }
    })
  } catch (error) {
    console.error('Error en Google login:', error)
    res.status(500).json({ error: 'Error al autenticar con Google' })
  }
})

// PERFIL
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }
    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener perfil' })
  }
})

router.get('/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user })
})

module.exports = router
