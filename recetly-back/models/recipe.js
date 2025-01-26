import pool from "../db/db.js";

export class  RecipeModel{
static getAll = async () =>{
    const { rows: recipes } = await pool.query('SELECT * FROM recipes')
    return recipes
}
static getById = async (id) =>{
    console.log(id)
    const { rows: recipes } = await pool.query('SELECT * FROM recipes WHERE user_id = $1', [id])
    return recipes[0]
}
static postRecipe = async (input, user_id) =>{
    
    const { title, difficulty, comments, ingredients, steps } = await input

    await pool.query(
        `INSERT INTO recipes (title, difficulty, comments, ingredients, steps, user_id)
         VALUES ($1, $2, $3, $4, $5);`,
        [title, difficulty || 0, comments || '', ingredients, steps, user_id]
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