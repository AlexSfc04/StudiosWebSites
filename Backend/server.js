const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');  // ← IMPORTANTE
const Project = require('./models/project')
const Article = require('./models/article')

// ya deberías tener esto:
sequelize.sync({ alter: true })


const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: '🚀 Backend funcionando correctamente' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

const projectsRouter = require('./routes/projects')
const articlesRouter = require('./routes/articles')

app.use('/projects', projectsRouter)
app.use('/articles', articlesRouter)
