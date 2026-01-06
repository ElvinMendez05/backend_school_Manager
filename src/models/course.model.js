import { pool } from '../config/db.js';

export const CourseModel = {

  async findAll() {
    const { rows } = await pool.query(`
      SELECT *
      FROM courses
      ORDER BY id
    `);

    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM courses WHERE id = $1',
      [id]
    );
    return rows[0];
  },

  async create({ name, description }) {
    const { rows } = await pool.query(
      `INSERT INTO courses (name, description)
       VALUES ($1, $2)
       RETURNING *`,
      [name, description]
    );
    return rows[0];
  },

  async update(id, data) {
    const { name, description } = data;

    const { rows } = await pool.query(
      `UPDATE courses
       SET name = $1, description = $2
       WHERE id = $3
       RETURNING *`,
      [name, description, id]
    );

    return rows[0];
  },

  async delete(id) {
    const { rowCount } = await pool.query(
      'DELETE FROM courses WHERE id = $1',
      [id]
    );
    return rowCount > 0;
  }
};


// // course.model.js
// import { pool } from '../config/db.js';

// export const CourseModel = {
//   findAll() {
//     return pool.query('SELECT * FROM courses');
//   },

//   create({ name, description }) {
//     return pool.query(
//       `INSERT INTO courses (name, description)
//        VALUES ($1, $2)
//        RETURNING *`,
//       [name, description]
//     );
//   }
// };
