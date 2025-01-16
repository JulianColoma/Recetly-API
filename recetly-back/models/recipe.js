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
        steps TEXT[] NOT NULL
);
    `);
    console.log('Tablas creadas o ya existentes');
  } catch (err) {
    console.error('Error al crear las tablas:', err.message);
  }


export class  RecipeModel{
static getAll = async () =>{
    const { rows: recipes } = await pool.query('SELECT * FROM recipes')
    return recipes
}
static getById = async (id) =>{
    console.log(id)
    const { rows: recipes } = await pool.query('SELECT * FROM recipes WHERE id = $1', [id])
    return recipes[0]
}
static postRecipe = async (input) =>{
    
    const { title, difficulty, comments, ingredients, steps } = await input
    
    if (!title || !ingredients || !steps) {
            throw new Error('Missing required fields');
    }

    await pool.query(
        `INSERT INTO recipes (title, difficulty, comments, ingredients, steps)
         VALUES ($1, $2, $3, $4, $5);`,
        [title, difficulty || 0, comments || '', ingredients, steps]
    );
    return true
} 
static deleteById = async (id) => {
    try{
    await pool.query(`DELETE FROM recipes WHERE id = $1`, [id])
    }catch(e){
        console.log(e)
    }
    
}
static updateRecipe = async (id, input) => {
    const { rows: recipes } = await pool.query('SELECT * FROM recipes WHERE id = $1', [id])
    const newRecipe ={
        ...recipes[0],
        ...input
    }
    await pool.query(`
        UPDATE recipes
        SET (title, photo, difficulty, comments, ingredients, steps) = ($1, $2, $3, $4, $5, $6)
        WHERE id = $7
        `, [newRecipe.title, newRecipe.photo, newRecipe.difficulty, newRecipe.comments, newRecipe.ingredients, newRecipe.steps, newRecipe.id])
}
}