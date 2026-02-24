const Article = require('../models/article')

exports.getAll = async (req, res) => {
  try { res.json(await Article.getAll()) }
  catch (err) { res.status(500).json({ error: err.message }) }
}
exports.getById = async (req, res) => {
  try {
    const article = await Article.getById(req.params.id)
    if (!article) return res.status(404).json({ error: 'Artículo no encontrado' })
    res.json(article)
  } catch (err) { res.status(500).json({ error: err.message }) }
}
exports.create = async (req, res) => {
  try { res.status(201).json({ id: await Article.create(req.body) }) }
  catch (err) { res.status(500).json({ error: err.message }) }
}
exports.update = async (req, res) => {
  try { await Article.update(req.params.id, req.body); res.json({ message: 'Actualizado' }) }
  catch (err) { res.status(500).json({ error: err.message }) }
}
exports.remove = async (req, res) => {
  try { await Article.delete(req.params.id); res.json({ message: 'Eliminado' }) }
  catch (err) { res.status(500).json({ error: err.message }) }
}
