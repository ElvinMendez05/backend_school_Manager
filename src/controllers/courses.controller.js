// courses.controller.js
import { CourseModel } from '../models/course.model.js';

export const getCourses = async (req, res) => {
  const { rows } = await CourseModel.findAll();
  res.json(rows);
};

export const createCourse = async (req, res) => {
  const { rows } = await CourseModel.create(req.body);
  res.status(201).json(rows[0]);
};
