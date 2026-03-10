const express = require('express')
const router = express.Router()
const Groq = require('groq-sdk')

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const SYSTEM_PROMPT = `Eres el asistente virtual de StudiosWebSites, una agencia de diseño y desarrollo web en Sevilla, España.
NORMAS:
- Responde SIEMPRE en español, amable y breve (máximo 3 frases).
- Solo habla sobre temas de la empresa.
- Si no sabes algo, sugiere escribir al email.
DATOS:
- Servicios: diseño web, SEO, e-commerce, mantenimiento, seguridad, paneles admin.
- Email: studioswebsites2026@gmail.com
- Teléfono: +34 611 491 647
- Ubicación: Sevilla, España
- Plazos: web básica 1-2 semanas, tienda online 3-4 semanas.
- Todo incluye diseño responsive y SSL.`

router.post('/', async (req, res) => {
  const { message, history = [] } = req.body
  if (!message) return res.status(400).json({ answer: 'Mensaje vacío.' })

  try {
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.map(msg => ({
        role: msg.from === 'user' ? 'user' : 'assistant',
        content: msg.text,
      })),
      { role: 'user', content: message },
    ]

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages,
      max_tokens: 300,
    })

    res.json({ answer: completion.choices[0].message.content })
  } catch (error) {
    console.error('Groq error:', error.message)
    res.status(500).json({ answer: '❌ Error al procesar tu mensaje.' })
  }
})

module.exports = router
