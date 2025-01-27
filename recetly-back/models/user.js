import  pool  from "../db/db.js";
import bcrypt from "bcrypt"
export class  UserModel{
static create = async (input) =>{
    
    const { name, password } = await input
    
    const {rows:user} = await pool.query(`SELECT * FROM users WHERE name = $1`, [name])
    if(user[0]) throw new Error('Duplicated username');

    if (!name || !password)  throw new Error('Missing required fields');
    
    const cryptPass = await bcrypt.hash(password, 10)

    await pool.query(
        `INSERT INTO users (name, password, admin)
         VALUES ($1, $2, $3);`,
        [name, cryptPass, false]
    );
    return true
} 
static login = async (input) =>{
    const { name, password } = await input
    
    const {rows:user} = await pool.query(`SELECT * FROM users WHERE name = $1`, [name])
    if(!user) throw new Error('User not found');

    const valid = await bcrypt.compare(password, user[0].password)
    if(!valid) throw new Error('invalid password');
    
    const {password: _, ...publicUser} = user[0]
    return publicUser
}
static deleteUser = async (name) => {
    try{
        await pool.query(`DELETE FROM users WHERE name = $1`, [name])
        }catch(e){
            console.log(e)
        }
}
}
