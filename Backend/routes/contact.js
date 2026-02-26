const express = require('express')
const nodemailer = require('nodemailer')
require('dotenv').config()

const router = express.Router()

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

router.post('/', async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' })
  }

  try {
    await transporter.sendMail({
    from: `"${name}" <${email}>`,  // ← Email del cliente como remitente
    to: process.env.CONTACT_EMAIL,
    replyTo: email,  // ← Mismo pero por si acaso
    subject: `Nuevo mensaje de ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
      html: `
        <h2>Nuevo mensaje desde la web</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    })

    res.json({ success: true, message: 'Mensaje enviado correctamente' })
  } catch (err) {
    console.error('Error enviando email de contacto:', err)
    res.status(500).json({ error: 'No se pudo enviar el mensaje' })
  }
})

module.exports = router
