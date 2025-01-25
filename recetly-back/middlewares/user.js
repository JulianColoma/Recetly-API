import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export function getUserData(req, res, next) {
    const token = req.cookies.access_token
    req.session = {user: null}

    try{
        const data = jwt.verify(token, SECRET)
        req.session.user = data
    }catch{
        req.session.user = null
    }
    next()
}