const express = require('express')
const router = express.Router()
const db = require('../config/database')
const nodemailer = require('nodemailer')
const crypto = require('crypto')

// ── Transporter ──────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// ── Helpers ──────────────────────────────────────────────────
const emailTemplate = (confirmUrl) => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Confirma tu suscripcion</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      background: #f3f4f6;
      padding: 40px 16px;
    }
    .wrapper {
      max-width: 520px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid #e5e7eb;
    }
    .header {
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      padding: 36px 32px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    .header p {
      color: rgba(255,255,255,0.8);
      font-size: 13px;
      margin-top: 6px;
    }
    .body {
      padding: 36px 32px;
    }
    .body p {
      color: #4b5563;
      font-size: 15px;
      line-height: 1.65;
      margin-bottom: 16px;
    }
    .body p:last-of-type { margin-bottom: 0; }
    .btn-wrap { text-align: center; margin: 28px 0; }
    .btn {
      display: inline-block;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: #ffffff;
      text-decoration: none;
      padding: 14px 36px;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 700;
    }
    .note {
      font-size: 12px !important;
      color: #9ca3af !important;
    }
    .divider {
      height: 1px;
      background: #f3f4f6;
      margin: 24px 0;
    }
    .footer {
      padding: 18px 32px;
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
      text-align: center;
    }
    .footer p {
      color: #9ca3af;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>StudiosWebSites</h1>
      <p>Newsletter de diseno y desarrollo web</p>
    </div>
    <div class="body">
      <p>Hola,</p>
      <p>
        Gracias por suscribirte. Recibiras consejos exclusivos sobre diseno web,
        desarrollo y tendencias digitales directamente en tu bandeja de entrada.
      </p>
      <p>Haz clic en el boton para confirmar tu suscripcion:</p>
      <div class="btn-wrap">
        <a href="${confirmUrl}" class="btn">Confirmar suscripcion</a>
      </div>
      <div class="divider"></div>
      <p class="note">
        Si no solicitaste esta suscripcion, ignora este email.
        El enlace expira en 24 horas.
      </p>
    </div>
    <div class="footer">
      <p>© 2026 StudiosWebSites · Sevilla, Andalucia, ES</p>
    </div>
  </div>
</body>
</html>
`

// ── POST /api/newsletter ─────────────────────────────────────
router.post('/', async (req, res) => {
  const { email } = req.body

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ message: 'El email es obligatorio.' })
  }

  const emailTrimmed = email.trim().toLowerCase()

  try {
    // Comprobar si ya existe y está confirmado
    const [existing] = await db.query(
      'SELECT id, confirmado FROM newsletter WHERE email = ?',
      [emailTrimmed]
    )

    if (existing.length > 0 && existing[0].confirmado) {
      return res.status(409).json({ message: 'Este email ya está suscrito.' })
    }

    // Generar token seguro
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24h

    if (existing.length > 0) {
      // Ya existe pero no confirmado — actualizar token
      await db.query(
        'UPDATE newsletter SET token = ?, token_expires_at = ? WHERE email = ?',
        [token, expiresAt, emailTrimmed]
      )
    } else {
      // Nuevo suscriptor
      await db.query(
        'INSERT INTO newsletter (email, token, token_expires_at, confirmado) VALUES (?, ?, ?, FALSE)',
        [emailTrimmed, token, expiresAt]
      )
    }

    // URL de confirmación — apunta al FRONTEND
    const confirmUrl = `${process.env.FRONTEND_URL}/confirmar-newsletter?token=${token}`

    // Enviar email
    await transporter.sendMail({
      from: `"StudiosWebSites" <${process.env.SMTP_USER}>`,
      to: emailTrimmed,
      subject: 'Confirma tu suscripcion a SWS Newsletter',
      html: emailTemplate(confirmUrl),
    })

    return res.status(200).json({
      message: 'Te hemos enviado un email de confirmacion.'
    })

  } catch (error) {
    console.error('[Newsletter] POST error:', error)
    return res.status(500).json({ message: 'Error al procesar la suscripcion.' })
  }
})

// ── GET /api/newsletter/confirmar?token=xxx ──────────────────
router.get('/confirmar', async (req, res) => {
  const { token } = req.query

  if (!token || typeof token !== 'string') {
    return res.status(400).json({ message: 'Token no valido.' })
  }

  try {
    const [result] = await db.query(
      `SELECT id FROM newsletter
       WHERE token = ?
         AND confirmado = FALSE
         AND token_expires_at > NOW()`,
      [token]
    )

    if (result.length === 0) {
      return res.status(404).json({
        message: 'El enlace no es valido o ha expirado.'
      })
    }

    // Confirmar y limpiar token
    await db.query(
      'UPDATE newsletter SET confirmado = TRUE, token = NULL, token_expires_at = NULL WHERE token = ?',
      [token]
    )

    // Devuelve JSON — el frontend React gestiona la UI
    return res.status(200).json({
      message: 'Suscripcion confirmada correctamente.'
    })

  } catch (error) {
    console.error('[Newsletter] GET confirmar error:', error)
    return res.status(500).json({ message: 'Error al confirmar la suscripcion.' })
  }
})

module.exports = router
