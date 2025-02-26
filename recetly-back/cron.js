import cron from 'node-cron';
import pool from './db/db.js';
import { RecipeModel } from './models/recipe.js';
const deleteUser = async (user) => {
    try{
        const recipes = await RecipeModel.getAll(user.user_id)
        recipes.forEach((recipe) => {
            fs.unlink(recipe.photo,(err) => {
                        if (err) {
                          console.error('Error on delete', err);
                        } else {
                          console.log('File deleted');
                        }
                      })
        })
        const name = user.name
        await UserModel.deleteUser(name)
        return {ok:true, message:'user deleted succesfuly'}
        } catch (error) {
            console.log(error)
        }
}

export const deleteNonAdminUsers = () => {
    cron.schedule('*/10 * * * *', async () => {
        try{
            const {rows: expiredUsers} = await pool.query(`
                SELECT * FROM users
                WHERE admin = false
                AND created_at < NOW() - INTERVAL '1 hour';
              `);
            if(expiredUsers.length < 1) return 'There is no expired session'
            expiredUsers.forEach(async (user) => {
                await deleteUser(user);
            })
            return {ok:true, message:'users deleted succesfuly'}
        }catch(e){
            console.log("Error on delete: ", e)
        }
      });
}
