const express = require('express')
const router = express.Router()
const db = require('../config/database') // tu conexión a MySQL
const nodemailer = require('nodemailer')
const crypto = require('crypto')

// ── Configura tu email ──
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // false para puerto 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// ── POST /api/newsletter ──
router.post('/', async (req, res) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ message: 'El email es obligatorio.' })
  }

  try {
    // Comprobar si ya existe
    const [existing] = await db.query(
      'SELECT id FROM newsletter WHERE email = ?', [email]
    )

    if (existing.length > 0) {
      return res.status(409).json({ message: 'Este email ya está suscrito.' })
    }

    // Generar token de confirmación
    const token = crypto.randomBytes(32).toString('hex')

    // Guardar en base de datos
    await db.query(
      'INSERT INTO newsletter (email, token) VALUES (?, ?)',
      [email, token]
    )

    // URL de confirmación
    const confirmUrl = `https://studios-web-sites-u6qh.vercel.app/newsletter/confirmar?token=${token}`

    // Enviar email de confirmación
    await transporter.sendMail({
      from: `"StudiosWebSites" <${process.env.SMTP_USER}>`,
      to: email,
      subject: '✅ Confirma tu suscripción a SWS Newsletter',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; background: #f9fafb; margin: 0; padding: 0; }
            .wrapper { max-width: 560px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
            .header { background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 32px 24px; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 22px; }
            .header p { color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 14px; }
            .body { padding: 32px 28px; }
            .body p { color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0 0 16px; }
            .btn { display: block; width: fit-content; margin: 24px auto; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; text-decoration: none; padding: 14px 32px; border-radius: 10px; font-weight: 700; font-size: 15px; }
            .footer { text-align: center; padding: 16px 24px; background: #f9fafb; border-top: 1px solid #e5e7eb; }
            .footer p { color: #9ca3af; font-size: 12px; margin: 0; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header">
              <h1>🚀 StudiosWebSites</h1>
              <p>Newsletter de diseño y desarrollo web</p>
            </div>
            <div class="body">
              <p>¡Hola! 👋</p>
              <p>Gracias por suscribirte a nuestro newsletter. Recibirás consejos exclusivos sobre diseño web, desarrollo y tendencias digitales.</p>
              <p>Para completar tu suscripción, haz clic en el botón:</p>
              <a href="${confirmUrl}" class="btn">Confirmar suscripción</a>
              <p style="font-size:13px; color:#9ca3af;">Si no solicitaste esta suscripción, puedes ignorar este email. El enlace expira en 24 horas.</p>
            </div>
            <div class="footer">
              <p>© 2026 StudiosWebSites · Sevilla, Andalucía, ES</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    res.status(200).json({ message: 'Te hemos enviado un email de confirmación.' })

  } catch (error) {
    console.error('Newsletter error:', error)
    res.status(500).json({ message: 'Error al procesar la suscripción.' })
  }
})

// ── GET /api/newsletter/confirmar?token=xxx ──
router.get('/confirmar', async (req, res) => {
  const { token } = req.query

  if (!token) {
    return res.status(400).json({ message: 'Token no válido.' })
  }

  try {
    const [result] = await db.query(
      'SELECT id FROM newsletter WHERE token = ? AND confirmado = FALSE',
      [token]
    )

    if (result.length === 0) {
      return res.status(404).json({ message: 'Token no válido o ya confirmado.' })
    }

    await db.query(
      'UPDATE newsletter SET confirmado = TRUE, token = NULL WHERE token = ?',
      [token]
    )

    // Redirige al frontend con éxito
    res.redirect(`${process.env.FRONTEND_URL}/confirmar-newsletter?success=true`)

  } catch (error) {
    console.error('Confirmación error:', error)
    res.status(500).json({ message: 'Error al confirmar.' })
  }
})

module.exports = router
