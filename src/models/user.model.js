// user.model.js
import { pool } from '../config/db.js';

export const UserModel = {
  findAll() {
    return pool.query(
      'SELECT id, email, role, created_at FROM users'
    );
  },

  findByEmail(email) {
    return pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
  },

  create({ email, password, role }) {
    return pool.query(
      `INSERT INTO users (email, password, role)
       VALUES ($1, $2, $3)
       RETURNING id, email, role`,
      [email, password, role]
    );
  },

  deleteById(id) {
    return pool.query(
      'DELETE FROM users WHERE id = $1',
      [id]
    );
  }
};
