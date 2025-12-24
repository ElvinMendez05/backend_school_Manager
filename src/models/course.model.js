// course.model.js
import { pool } from '../config/db.js';

export const CourseModel = {
  findAll() {
    return pool.query('SELECT * FROM courses');
  },

  create({ name, description }) {
    return pool.query(
      `INSERT INTO courses (name, description)
       VALUES ($1, $2)
       RETURNING *`,
      [name, description]
    );
  }
};
