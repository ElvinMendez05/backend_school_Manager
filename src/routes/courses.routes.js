// courses.routes.js
import { Router } from 'express';
import { getCourses, createCourse } from '../controllers/courses.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getCourses);
router.post('/', roleMiddleware('admin'), createCourse);

export default router;
