// users.routes.js
import { Router } from 'express';
import { getUsers, deleteUser } from '../controllers/users.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';

const router = Router();

router.use(authMiddleware);
router.use(roleMiddleware('admin'));

router.get('/', getUsers);
router.delete('/:id', deleteUser);

export default router;
