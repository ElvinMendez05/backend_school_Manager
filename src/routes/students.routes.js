// students.routes.js
import { Router } from 'express';
import {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
} from '../controllers/students.controller.js';

import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware); 

router.get('/', getStudents);
router.get('/:id', getStudent);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router;