// server.js
import 'dotenv/config';
import app from './app.js';
import { pool } from './config/db.js';

const PORT = process.env.PORT || 3000;

app.get('/health', async (req, res) => {
  const result = await pool.query('SELECT 1');
  res.json({ status: 'ok', db: result.rows });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
