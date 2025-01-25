import { UserModel } from "../models/user";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()
export class UserController {
    static create = async (req, res) => {
            try {
                const input = req.body;
                await UserModel.create(input); 
                res.status(201).end(); 
            } catch (error) {
                console.error(error);
                res.status(400).json({ error: error.message });
            }
        }
    static login = async (req, res) => {
            try {
                const input = req.body;
                const user = await UserModel.login(input); 
                const exp = user.admin? ADMINEXP : USEREXP
                const token = jwt.sign({id: user.id, name: user.name}, SECRET,{
                    expiresIn: exp
                })
                res
                    .cookie('access_token', token, {
                        httpOnly:true,
                        secure: true
                    })
                    .send({user, token})
            } catch (error) {
                console.error(error);
                res.status(400).json({ error: error.message });
            }
        }
        static logout = async (req, res) =>{
            const { user } = req.session
            if(!user) return res.status(403).send('Access not authorized')
            if(!user.admin){
                try{
                        await RecipeModel.deleteByUser(user.user_id)
                        res.status(200).end()
                        } catch (error) {
                            console.error(error);
                            res.status(400).json({ error: error.message });
                        }
            }
            res
                .clearCookie('access_token')
                .json({message:'Logout successful'})

        }
}