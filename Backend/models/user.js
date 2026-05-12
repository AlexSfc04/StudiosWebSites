const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {

  // ── CREAR USUARIO ─────────────────────────────────────────
  static async create(email, password, name) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
      [email, hashedPassword, name]
    );

    return {
      id: result.insertId,
      email,
      name,
      role: 'user'
    };
  }

  // ── BUSCAR POR EMAIL ──────────────────────────────────────
  static async findByEmail(email) {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0] || null;
  }

  // ── BUSCAR POR ID ─────────────────────────────────────────
  static async findById(id) {
    const [rows] = await pool.query(
      `SELECT
        id, email, name, role, password,
        country, language, timezone,
        email_notifications AS emailNotifications,
        created_at
       FROM users WHERE id = ?`,
      [id]
    );
    return rows[0] || null;
  }

  // ── ACTUALIZAR PERFIL ─────────────────────────────────────
  static async updateProfile(id, { name, email, country, language, timezone, emailNotifications }) {
    await pool.query(
      `UPDATE users
       SET
         name = ?,
         email = ?,
         country = ?,
         language = ?,
         timezone = ?,
         email_notifications = ?
       WHERE id = ?`,
      [
        name,
        email,
        country || '',
        language || 'es',
        timezone || 'Europe/Madrid',
        emailNotifications ?? true,
        id
      ]
    );

    return User.findById(id);
  }

  // ── ACTUALIZAR CONTRASEÑA ─────────────────────────────────
  static async updatePassword(id, hashedPassword) {
    await pool.query(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedPassword, id]
    );
  }

  // ── HASHEAR CONTRASEÑA ────────────────────────────────────
  static async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  // ── VERIFICAR CONTRASEÑA ──────────────────────────────────
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;