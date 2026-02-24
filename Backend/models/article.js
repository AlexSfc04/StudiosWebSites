const pool = require('../config/database')

const Article = {
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM articles')
    return rows
  },

  getById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM articles WHERE id = ?', [id])
    return rows[0]
  },

  create: async (data) => {
    const { title, content, image, category, featured } = data
    const [result] = await pool.query(
      'INSERT INTO articles (title, content, image, category, featured) VALUES (?, ?, ?, ?, ?)',
      [title, content, image, category || 'general', featured || false]
    )
    return result.insertId
  },

  update: async (id, data) => {
    const { title, content, image, category, featured } = data
    await pool.query(
      'UPDATE articles SET title=?, content=?, image=?, category=?, featured=? WHERE id=?',
      [title, content, image, category, featured, id]
    )
  },

  delete: async (id) => {
    await pool.query('DELETE FROM articles WHERE id = ?', [id])
  }
}

module.exports = Article
