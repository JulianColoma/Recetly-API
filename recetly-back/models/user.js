import { pool } from "../db/db.js";


export class  UserModel{
static create = async (input) =>{
    
    const { name, password } = await input
    
    const user = await pool.query(`SELECT * FROM users WHERE name = $1`, [name])
    if(user) throw new Error('Duplicated username');

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
    
    const user = await pool.query(`SELECT * FROM users WHERE name = $1`, [name])
    if(!user) throw new Error('User not found');

    const valid = await bcrypt.compare(password, user.password)
    if(!valid) throw new Error('invalid password');
    
    const {password: _, ...publicUser} = user
    return publicUser
}

}
