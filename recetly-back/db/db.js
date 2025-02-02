import pkg from 'pg';
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pkg
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool.connect()
  .then(() => console.log('Connected'))
  .catch(err => console.error('Connection failed', err));

try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        password TEXT NOT NULL,
        admin BOOLEAN
     );
      CREATE TABLE IF NOT EXISTS recipes (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        photo TEXT,
        difficulty INT,
        comments TEXT,
        ingredients TEXT[] NOT NULL,
        elaboration_time INT NOT NULL,
        steps TEXT[] NOT NULL,
        user_id INT,
        CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
    );  
    `);
    console.log('Tablas creadas o ya existentes');
  } catch (err) {
    console.error('Error al crear las tablas:', err.message);
  }
export default pool