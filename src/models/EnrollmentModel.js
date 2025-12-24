import { pool } from '../config/db.js';

export const EnrollmentModel = {
  async enroll(student_id, course_id) {
    const { rows } = await pool.query(`
      INSERT INTO enrollments (student_id, course_id)
      VALUES ($1, $2)
      RETURNING *
    `, [student_id, course_id]);
    return rows[0];
  },

  async getCoursesByStudent(student_id) {
    const { rows } = await pool.query(`
      SELECT c.id, c.name, c.description
      FROM courses c
      JOIN enrollments e ON c.id = e.course_id
      WHERE e.student_id = $1
    `, [student_id]);
    return rows;
  },

  async getStudentsByCourse(course_id) {
    const { rows } = await pool.query(`
      SELECT s.id, s.name, s.email
      FROM students s
      JOIN enrollments e ON s.id = e.student_id
      WHERE e.course_id = $1
    `, [course_id]);
    return rows;
  }
};
