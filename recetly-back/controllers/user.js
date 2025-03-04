import { UserModel } from "../models/user.js";
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
                        httpOnly:true,
                        secure: process.env.ENV == 'production',
                        sameSite: process.env.ENV == 'production'? 'None' : 'Lax'
                    })
                    .send({user, token})
            } catch (error) {
                console.error(error);
                res.status(400).json({ error: error.message });
            }
        }
        
        static getUser = async (req, res) => {
            const { user } = req.session
            if(!user) return res.status(403).send('Session expired')
                try{
                        res.status(200).json({"ok": true, "user":user})
                        } catch (error) {
                            console.error(error);
                            res.status(400).json({ error: error.message });
                        }
        }
        
        static logout = async (req, res) =>{
            res
                .clearCookie('access_token')
                .json({ok:true, message:'Logout successful'})

        }
}