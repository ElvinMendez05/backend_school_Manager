// auth.routes.js
import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { register, login, checkStatus } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.get('/check-status', authMiddleware, checkStatus);
export default router;
