const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  // Crear nuevo usuario
  static async create(email, password, name) {
    try {
      // Encriptar contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const [result] = await pool.query(
        'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
        [email, hashedPassword, name]
      );

      return {
        id: result.insertId,
        email,
        name
      };
    } catch (error) {
      throw error;
    }
  }

  // Buscar usuario por email
  static async findByEmail(email) {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  // Buscar usuario por ID
  static async findById(id) {
    const [rows] = await pool.query(
      'SELECT id, email, name, created_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  // Verificar contraseña
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;
