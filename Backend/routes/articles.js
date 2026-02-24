const express = require('express')
const router = express.Router()
const Article = require('../models/article')
const authMiddleware = require('../middleware/auth')

// Público: obtener artículos publicados
router.get('/', async (req, res) => {
  try {
    const articles = await Article.findAll({
      where: { published: true },
      order: [['createdAt', 'DESC']]
    })
    res.json(articles)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener artículos' })
  }
})

// Admin: obtener todos (publicados y no)
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const articles = await Article.findAll({ order: [['createdAt', 'DESC']] })
    res.json(articles)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener artículos' })
  }
})

// Admin: crear artículo
router.post('/', authMiddleware, async (req, res) => {
  try {
    const article = await Article.create(req.body)
    res.status(201).json(article)
  } catch (error) {
    res.status(500).json({ message: 'Error al crear artículo' })
  }
})

// Admin: editar artículo
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id)
    if (!article) return res.status(404).json({ message: 'Artículo no encontrado' })
    await article.update(req.body)
    res.json(article)
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar artículo' })
  }
})

// Admin: eliminar artículo
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id)
    if (!article) return res.status(404).json({ message: 'Artículo no encontrado' })
    await article.destroy()
    res.json({ message: 'Artículo eliminado' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar artículo' })
  }
})

module.exports = router
