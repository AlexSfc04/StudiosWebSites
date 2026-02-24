const pool = require('../config/database')

const Project = {
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM projects')
    return rows
  },

  getById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [id])
    return rows[0]
  },

  create: async (data) => {
    const { title, description, image, category, link, featured } = data
    const [result] = await pool.query(
      'INSERT INTO projects (title, description, image, category, link, featured) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, image, category || 'others', link, featured || false]
    )
    return result.insertId
  },

  update: async (id, data) => {
    const { title, description, image, category, link, featured } = data
    await pool.query(
      'UPDATE projects SET title=?, description=?, image=?, category=?, link=?, featured=? WHERE id=?',
      [title, description, image, category, link, featured, id]
    )
  },

  delete: async (id) => {
    await pool.query('DELETE FROM projects WHERE id = ?', [id])
  }
}

module.exports = Project
