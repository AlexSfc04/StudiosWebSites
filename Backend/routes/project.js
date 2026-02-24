const express = require('express')
const router = express.Router()
const Project = require('../models/project')
const authMiddleware = require('../middleware/auth')

// Público: obtener todos los proyectos
router.get('/', async (req, res) => {
  try {
    const projects = await Project.findAll({ order: [['createdAt', 'DESC']] })
    res.json(projects)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener proyectos' })
  }
})

// Admin: crear proyecto
router.post('/', authMiddleware, async (req, res) => {
  try {
    const project = await Project.create(req.body)
    res.status(201).json(project)
  } catch (error) {
    res.status(500).json({ message: 'Error al crear proyecto' })
  }
})

// Admin: editar proyecto
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id)
    if (!project) return res.status(404).json({ message: 'Proyecto no encontrado' })
    await project.update(req.body)
    res.json(project)
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar proyecto' })
  }
})

// Admin: eliminar proyecto
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id)
    if (!project) return res.status(404).json({ message: 'Proyecto no encontrado' })
    await project.destroy()
    res.json({ message: 'Proyecto eliminado' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar proyecto' })
  }
})

module.exports = router
