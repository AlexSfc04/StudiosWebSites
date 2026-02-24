const Project = require('../models/project')

exports.getAll = async (req, res) => {
  try { res.json(await Project.getAll()) }
  catch (err) { res.status(500).json({ error: err.message }) }
}
exports.getById = async (req, res) => {
  try {
    const project = await Project.getById(req.params.id)
    if (!project) return res.status(404).json({ error: 'Proyecto no encontrado' })
    res.json(project)
  } catch (err) { res.status(500).json({ error: err.message }) }
}
exports.create = async (req, res) => {
  try { res.status(201).json({ id: await Project.create(req.body) }) }
  catch (err) { res.status(500).json({ error: err.message }) }
}
exports.update = async (req, res) => {
  try { await Project.update(req.params.id, req.body); res.json({ message: 'Actualizado' }) }
  catch (err) { res.status(500).json({ error: err.message }) }
}
exports.remove = async (req, res) => {
  try { await Project.delete(req.params.id); res.json({ message: 'Eliminado' }) }
  catch (err) { res.status(500).json({ error: err.message }) }
}
