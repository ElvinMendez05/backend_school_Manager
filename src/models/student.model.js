// student.model.js
import { pool } from '../config/db.js';

export const StudentModel = {
  async findAll({ page = 1, limit = 10, active, course_id } = {}) {
    let query = `
      SELECT 
        s.id,
        s.name,
        s.email,
        s.age,
        s.active,
        c.id AS course_id,
        c.name AS course_name
      FROM students s
      LEFT JOIN courses c ON s.course_id = c.id
      WHERE 1=1
    `;
    const params = [];

    if (active !== undefined) {
      params.push(active);
      query += ` AND s.active = $${params.length}`;
    }

    if (course_id) {
      params.push(course_id);
      query += ` AND s.course_id = $${params.length}`;
    }

    const offset = (page - 1) * limit;
    params.push(limit, offset);
    query += ` ORDER BY s.name ASC LIMIT $${params.length - 1} OFFSET $${params.length}`;

    const { rows } = await pool.query(query, params);
    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query(`
      SELECT 
        s.id,
        s.name,
        s.email,
        s.age,
        s.active,
        c.id AS course_id,
        c.name AS course_name
      FROM students s
      LEFT JOIN courses c ON s.course_id = c.id
      WHERE s.id = $1
    `, [id]);
    return rows[0];
  },

  async create({ name, email, age, course_id, active = true }) {
    const { rows } = await pool.query(`
      INSERT INTO students (name, email, age, course_id, active)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [name, email, age, course_id, active]);
    return rows[0];
  },

  async update(id, { name, email, age, course_id, active }) {
    const { rows } = await pool.query(`
      UPDATE students
      SET name=$1, email=$2, age=$3, course_id=$4, active=$5
      WHERE id=$6
      RETURNING *
    `, [name, email, age, course_id, active, id]);
    return rows[0];
  },

  async delete(id) {
    await pool.query(`DELETE FROM students WHERE id=$1`, [id]);
  }
};

// export const StudentModel = {
//   async findAll() {
//     const { rows } = await pool.query(`
//       SELECT 
//         s.id,
//         s.name,
//         s.email,
//         s.age,
//         s.active,
//         c.id AS course_id,
//         c.name AS course
//       FROM students s
//       LEFT JOIN courses c ON s.course_id = c.id
//     `);
//     return rows;
//   },

//   async create({ name, email, age, course_id }) {
//     const { rows } = await pool.query(
//       `INSERT INTO students (name, email, age, course_id)
//        VALUES ($1, $2, $3, $4)
//        RETURNING *`,
//       [name, email, age, course_id]
//     );
//     return rows[0];
//   }
// }

// export const StudentModel = {
//   async findAll() {
//     const { rows } = await pool.query(
//       'SELECT * FROM students ORDER BY created_at DESC'
//     );
//     return rows;
//   },

//   async findById(id) {
//     const { rows } = await pool.query(
//       'SELECT * FROM students WHERE id = $1',
//       [id]
//     );
//     return rows[0];
//   },

//   async create({ name, email, age, course }) {
//     const { rows } = await pool.query(
//       `INSERT INTO students (name, email, age, course)
//        VALUES ($1, $2, $3, $4)
//        RETURNING *`,
//       [name, email, age, course]
//     );
//     return rows[0];
//   },

//   async update(id, { name, email, age, course, active }) {
//     const { rows } = await pool.query(
//       `UPDATE students
//        SET name=$1, email=$2, age=$3, course=$4, active=$5
//        WHERE id=$6
//        RETURNING *`,
//       [name, email, age, course, active, id]
//     );
//     return rows[0];
//   },

//   async delete(id) {
//     await pool.query(
//       'DELETE FROM students WHERE id = $1',
//       [id]
//     );
//   }
// };
