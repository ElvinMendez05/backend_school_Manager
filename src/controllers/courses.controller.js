// courses.controller.js
import { CourseModel } from '../models/course.model.js';

/**
 * GET /courses
 * Devuelve un ARRAY de cursos
 */
export const getCourses = async (req, res) => {
  try {
    const courses = await CourseModel.findAll();
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener cursos' });
  }
};

/**
 * GET /courses/:id
 */
export const getCourse = async (req, res) => {
  try {
    const course = await CourseModel.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener curso' });
  }
};

/**
 * POST /courses
 */
export const createCourse = async (req, res) => {
  try {
    const { name, description, active } = req.body;

    if (!name) {
      return res.status(400).json({
        message: 'El nombre del curso es obligatorio'
      });
    }

    const course = await CourseModel.create({
      name,
      description,
      active
    });

    res.status(201).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear curso' });
  }
};

/**
 * PUT /courses/:id
 */
export const updateCourse = async (req, res) => {
  try {
    const course = await CourseModel.update(req.params.id, req.body);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar curso' });
  }
};

/**
 * DELETE /courses/:id
 */
export const deleteCourse = async (req, res) => {
  try {
    const deleted = await CourseModel.delete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar curso' });
  }
};
