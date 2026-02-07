// courses.routes.js
import { Router } from 'express';
import { getCourses, createCourse, getCourse, updateCourse, deleteCourse } from '../controllers/courses.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getCourses);
router.get('/:id', getCourse);
router.post('/', roleMiddleware('admin'), createCourse);
router.put('/:id', roleMiddleware('admin'), updateCourse);
router.delete('/:id', roleMiddleware('admin'), deleteCourse);

export default router;
