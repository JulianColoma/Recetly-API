import { UserModel } from "../models/user.js";
import { RecipeModel } from "../models/recipe.js"
import { userSchema } from "../schemas/user.js"
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export class UserController {
    static create = async (req, res) => {
            try {
                const validated_input = userSchema.parse(req.body);
                await UserModel.create(validated_input); 
                res.status(201).json({"ok": true}).end(); 
            } catch (error) {
                console.error(error);
                res.status(400).json({ error: error.message });
            }
        }
    static login = async (req, res) => {
            try {
                const validated_input = userSchema.parse(req.body);
                const user = await UserModel.login(validated_input)
                const exp = user.admin? process.env.ADMINEXP : process.env.USEREXP
                const token = jwt.sign({name: user.name, user_id: user.user_id}, process.env.SECRET,{
                    expiresIn: exp
                })
                res
                    .cookie('access_token', token, {
                        httpOnly:true
                    })
                    .send({user, token})
            } catch (error) {
                console.error(error);
                res.status(400).json({ error: error.message });
            }
        }
        static deleteUser = async (req, res) => {
            const { user } = req.session
            if(!user) return res.status(403).send('Access not authorized')
            if(!user.admin){
                try{
                        const recipes = await RecipeModel.getAll(user.user_id)
                        recipes.forEach((recipe) =>{
                            fs.unlink(`${process.env.BASEPATH + recipe.photo}`,(err) => {
                                        if (err) {
                                          console.error('Error al eliminar el archivo', err);
                                        } else {
                                          console.log('Archivo eliminado');
                                        }
                                      })
                        })
                        const name = user.name
                        await UserModel.deleteUser(name)
                        res.status(200).json({"ok": true})
                        } catch (error) {
                            console.error(error);
                            res.status(400).json({ error: error.message });
                        }
            }
        }
        static logout = async (req, res) =>{
            res
                .clearCookie('access_token')
                .json({ok:true, message:'Logout successful'})

        }
}