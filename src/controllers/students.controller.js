// students.controller.js
import { StudentModel } from '../models/student.model.js';

//  export const getStudents = async (req, res) => {
//    const students = await StudentModel.findAll();
//    res.json(students);
//  };

export const getStudents = async (req, res) => {
  const { page, limit, active, course_id } = req.query;
  const students = await StudentModel.findAll({
    page: parseInt(page) || 1,
    limit: parseInt(limit) || 10,
    active: active !== undefined ? active === 'true' : undefined,
    course_id
  });
  res.json(students);
};

 export const getStudent = async (req, res) => {
   const student = await StudentModel.findById(req.params.id);
   if (!student) {
     return res.status(404).json({ message: 'Student not found' });
   }
   res.json(student);
 };


export const createStudent = async (req, res) => {
  const { name, email, age, course_id, active } = req.body; // <-- usar course_id

  if (!name || !email) {
    return res.status(400).json({
      message: 'name y email son obligatorios'
    });
  }

  if (course_id) {
    const courseCheck = await pool.query('SELECT * FROM courses WHERE id=$1', [course_id]);
    if (courseCheck.rowCount === 0) {
      return res.status(400).json({ message: 'Curso no existe' });
    }
  }

  const student = await StudentModel.create({
    name, email, age, course_id, active // <-- pasar course_id al modelo
  });

  res.status(201).json(student);
};

export const updateStudent = async (req, res) => {
  const student = await StudentModel.update(req.params.id, req.body);
  res.json(student);
};

export const deleteStudent = async (req, res) => {
  await StudentModel.delete(req.params.id);
  res.status(204).send();
};
