// auth.controller.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db.js';
import { v4 as uuid } from 'uuid';

export const register = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Datos incompletos' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      `INSERT INTO users (id, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, role`,
      [uuid(), email, hashedPassword, role]
    );
    

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error); 
    res.status(500).json({
        message: 'Error registrando usuario',
        error: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );

  const user = result.rows[0];
  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({ token });
};

export const checkStatus = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      'SELECT id, email, role FROM users WHERE id = $1',
      [userId]
    );

    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ message: 'Usuario no existe' });
    }

    const newToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      token: newToken,
    });

  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token inválido' });
  }
};

