// app.js
import express from 'express';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import authRouter from './routes/auth.routes.js';

import { authMiddleware } from './middlewares/auth.middleware.js';

import studentRouter from './routes/students.routes.js';
import userRouter from './routes/users.routes.js';
import courseRouter from './routes/courses.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// GUI API
const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'School API', version: '1.0.0' },
  },
  apis: ['./routes/*.js', './models/*.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', (req, res) => {
  res.json({
    message: 'API running',
    status: 'OK'
  });
});

//Login Routes 
app.use('/api/auth', authRouter);

//Middlewares 
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({
    message: 'Acceso permitido',
    user: req.user,
  });
});

//Actions Students
app.use('/api/students', studentRouter);
//Actions Users
app.use('/api/users', userRouter);
//Action Courses
app.use('/api/courses', courseRouter);

app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found'
  });
});

export default app;
