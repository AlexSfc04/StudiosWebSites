const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const projectRoutes = require('./routes/project')    
const articleRoutes = require('./routes/articles')
const contactRoutes = require('./routes/contact')
const newsletterRoutes = require('./routes/newsletter')


const app = express()

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rutas
app.use('/auth', authRoutes)
app.use('/projects', projectRoutes)
app.use('/articles', articleRoutes)
app.use('/contact', contactRoutes)
app.use('/newsletter', newsletterRoutes)

app.get('/', (req, res) => {
  res.json({ message: '🚀 Backend funcionando correctamente' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
})

