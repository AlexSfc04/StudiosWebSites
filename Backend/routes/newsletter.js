const express = require('express')
const router = express.Router()
const db = require('../config/database')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware')

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
      <p>Newsletter de diseño y desarrollo web</p>
    </div>
    <div class="body">
      <p>Hola,</p>
      <p>
        Gracias por suscribirte. Recibirás consejos exclusivos sobre diseño web,
        desarrollo y tendencias digitales directamente en tu bandeja de entrada.
      </p>
      <p>Haz clic en el botón para confirmar tu suscripción:</p>
      <div class="btn-wrap">
        <a href="${confirmUrl}" class="btn">Confirmar suscripción</a>
      </div>
      <div class="divider"></div>
      <p class="note">
        Si no solicitaste esta suscripción, ignora este email.
        El enlace expira en 24 horas.
      </p>
    </div>
    <div class="footer">
      <p>© 2026 StudiosWebSites · Sevilla, Andalucía</p>
    </div>
  </div>
</body>
</html>
`

const campaignEmailTemplate = (subject, bodyHtml) => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      background: #f8fafc;
      color: #0f172a;
      padding: 32px 16px;
    }
    .wrapper {
      max-width: 680px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 20px;
      overflow: hidden;
      border: 1px solid #e2e8f0;
      box-shadow: 0 20px 80px rgba(15, 23, 42, 0.08);
    }
    .header {
      background: linear-gradient(135deg, #4338ca 0%, #8b5cf6 100%);
      padding: 32px;
      text-align: left;
    }
    .header h1 {
      color: #ffffff;
      font-size: 24px;
      margin-bottom: 8px;
    }
    .header p {
      color: rgba(255,255,255,0.82);
      font-size: 14px;
      line-height: 1.6;
    }
    .content {
      padding: 32px;
      line-height: 1.75;
      color: #334155;
    }
    .content h2 {
      color: #0f172a;
      margin-bottom: 16px;
      font-size: 20px;
    }
    .content p {
      margin-bottom: 18px;
      font-size: 15px;
    }
    .footer {
      background: #f8fafc;
      padding: 24px 32px;
      border-top: 1px solid #e2e8f0;
      color: #64748b;
      font-size: 13px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>${subject}</h1>
      <p>Contenido exclusivo de StudiosWebSites para suscriptores.</p>
    </div>
    <div class="content">
      ${bodyHtml}
    </div>
    <div class="footer">
      <p>Estás recibiendo este correo porque te suscribiste a la newsletter de StudiosWebSites.</p>
    </div>
  </div>
</body>
</html>
`

const getConfirmedSubscriberEmails = async () => {
  const [rows] = await db.query('SELECT email FROM newsletter WHERE confirmado = TRUE')
  return rows.map(row => row.email)
}

const formatDateToMySQLDatetimeUTC = (date) => {
  const d = date instanceof Date ? date : new Date(date)
  const pad = (value) => String(value).padStart(2, '0')
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`
}

const sendPendingNewsletterCampaigns = async (force = false) => {
  const query = force
    ? 'SELECT * FROM newsletter_campaigns WHERE sent_at IS NULL ORDER BY scheduled_at ASC'
    : 'SELECT * FROM newsletter_campaigns WHERE scheduled_at <= UTC_TIMESTAMP() AND sent_at IS NULL ORDER BY scheduled_at ASC'

  const [campaigns] = await db.query(query)

  if (campaigns.length === 0) {
    return {
      sentCount: 0,
      subscriberCount: 0,
      reason: force ? 'no_campaigns' : 'no_due_campaigns',
    }
  }

  const emails = await getConfirmedSubscriberEmails()
  if (emails.length === 0) {
    console.log('[Newsletter] No hay suscriptores confirmados para enviar campañas pendientes.')
    return { sentCount: 0, subscriberCount: 0, reason: 'no_subscribers' }
  }

  for (const campaign of campaigns) {
    await transporter.sendMail({
      from: `"StudiosWebSites" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      bcc: emails,
      subject: campaign.subject,
      html: campaignEmailTemplate(campaign.subject, campaign.html),
      text: campaign.html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
    })

    await db.query(
      'UPDATE newsletter_campaigns SET sent_at = UTC_TIMESTAMP() WHERE id = ?',
      [campaign.id]
    )
  }

  return { sentCount: campaigns.length, subscriberCount: emails.length, reason: 'sent' }
}

const scheduleNewsletterCampaigns = () => {
  setInterval(async () => {
    try {
      await sendPendingNewsletterCampaigns()
    } catch (error) {
      console.error('[Newsletter] Scheduler error:', error)
    }
  }, 10 * 60 * 1000)
}

scheduleNewsletterCampaigns()

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

    return res.status(200).json({
      message: 'Suscripcion confirmada correctamente.'
    })

  } catch (error) {
    console.error('[Newsletter] GET confirmar error:', error)
    return res.status(500).json({ message: 'Error al confirmar la suscripcion.' })
  }
})

// ── ADMIN: listar campañas ──────────────────────────────────
router.get('/campaigns', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const [campaigns] = await db.query(
      `SELECT
         id,
         subject,
         DATE_FORMAT(scheduled_at, '%Y-%m-%dT%H:%i:%sZ') AS scheduled_at,
         DATE_FORMAT(sent_at, '%Y-%m-%dT%H:%i:%sZ') AS sent_at,
         DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%sZ') AS created_at
       FROM newsletter_campaigns
       ORDER BY scheduled_at DESC`
    )
    const [countResult] = await db.query(
      'SELECT COUNT(*) AS confirmed FROM newsletter WHERE confirmado = TRUE'
    )

    return res.status(200).json({
      confirmedSubscribers: countResult[0]?.confirmed || 0,
      campaigns,
    })
  } catch (error) {
    console.error('[Newsletter] GET campaigns error:', error)
    return res.status(500).json({ message: 'Error al obtener las campañas de newsletter.' })
  }
})

// ── ADMIN: crear campaña ────────────────────────────────────
router.post('/campaigns', authenticateToken, requireAdmin, async (req, res) => {
  const { subject, html, scheduledAt } = req.body

  if (!subject || !html) {
    return res.status(400).json({ message: 'El asunto y el contenido son obligatorios.' })
  }

  const scheduledDate = scheduledAt ? new Date(scheduledAt) : new Date()
  if (Number.isNaN(scheduledDate.getTime())) {
    return res.status(400).json({ message: 'Fecha de programación inválida.' })
  }

  try {
    const scheduledAtUTC = formatDateToMySQLDatetimeUTC(scheduledDate)
    const [result] = await db.query(
      'INSERT INTO newsletter_campaigns (subject, html, scheduled_at) VALUES (?, ?, ?)',
      [subject.trim(), html, scheduledAtUTC]
    )

    return res.status(201).json({
      message: 'Campaña programada correctamente.',
      campaign: {
        id: result.insertId,
        subject: subject.trim(),
        scheduled_at: scheduledDate.toISOString(),
        sent_at: null,
        created_at: new Date(),
      },
    })
  } catch (error) {
    console.error('[Newsletter] POST campaigns error:', error)
    return res.status(500).json({ message: 'Error al crear la campaña de newsletter.' })
  }
})

// ── ADMIN: eliminar campaña pendiente ─────────────────────────
router.delete('/campaigns/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params

  if (!id || Number.isNaN(Number(id))) {
    return res.status(400).json({ message: 'ID de campaña inválido.' })
  }

  try {
    const [result] = await db.query(
      'DELETE FROM newsletter_campaigns WHERE id = ? AND sent_at IS NULL',
      [id]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'No se encontró ninguna campaña pendiente con ese ID.' })
    }

    return res.status(200).json({ message: 'Campaña pendiente eliminada correctamente.' })
  } catch (error) {
    console.error('[Newsletter] DELETE campaigns/:id error:', error)
    return res.status(500).json({ message: 'Error al eliminar la campaña pendiente.' })
  }
})

// ── ADMIN: enviar campañas pendientes ahora ───────────────────
router.post('/campaigns/send', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const force = req.query.force === 'true'
    const result = await sendPendingNewsletterCampaigns(force)
    const message = result.sentCount === 0
      ? result.reason === 'no_subscribers'
        ? 'No hay suscriptores confirmados para enviar la campaña.'
        : force
          ? 'No hay campañas pendientes para enviar.'
          : 'No hay campañas programadas listas para enviar ahora.'
      : `Se han enviado ${result.sentCount} campaña(s) pendientes.`

    return res.status(200).json({
      message,
      sentCount: result.sentCount,
      subscriberCount: result.subscriberCount,
    })
  } catch (error) {
    console.error('[Newsletter] POST campaigns/send error:', error)
    return res.status(500).json({ message: 'Error al enviar las campañas pendientes.' })
  }
})

module.exports = router
