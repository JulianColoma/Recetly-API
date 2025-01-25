import pkg from 'pg';
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pkg
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.HOSTNAME, 
  database: process.env.DB_NAME,
  password: process.env.DB_PWD,
  port: 5432, 
});
try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS recipes (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        photo BYTEA,
        difficulty INT,
        comments TEXT,
        ingredients TEXT[] NOT NULL,
        steps TEXT[] NOT NULL,
        CONSTRAINT user_id FORGEIN KEY (user_id) REFERENCES users(user_id)
    );  
     CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        password TEXT NOT NULL,
        admin BOOLEAN
     );
    `);
    console.log('Tablas creadas o ya existentes');
  } catch (err) {
    console.error('Error al crear las tablas:', err.message);
  }
export default pool