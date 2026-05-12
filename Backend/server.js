const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const projectRoutes = require('./routes/project')    
const articleRoutes = require('./routes/articles')
const contactRoutes = require('./routes/contact')
const newsletterRoutes = require('./routes/newsletter')
const chatbotRoutes = require('./routes/chatbot')



const app = express()

// Middleware
const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error(`CORS origin denied: ${origin}`))
    }
  },
  credentials: true,
}))
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: true, limit: '5mb' }))

// Rutas
app.use('/auth', authRoutes)
app.use('/projects', projectRoutes)
app.use('/articles', articleRoutes)
app.use('/contact', contactRoutes)
app.use('/newsletter', newsletterRoutes)
app.use('/chatbot', chatbotRoutes)

app.get('/', (req, res) => {
  res.json({ message: '🚀 Backend funcionando correctamente' })
})

// ✅ Después — añade la condición y el export
const PORT = process.env.PORT || 4000

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
  })
}

module.exports = app  // ← línea nueva al final

