import express from 'express';
import { recipesRouter } from './routes/recipes.js';
import cookieParser from 'cookie-parser';
import {getUserData} from './middlewares/user.js'
import { userRouter } from './routes/users.js';
import cors from 'cors';
import { deleteNonAdminUsers } from './cron.js';

deleteNonAdminUsers()

const PORT = process.env.PORT ?? 1234

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true,
    sameSite: "None"
  };

const app = express()
app.disable('x-powered-by')
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser())
app.use(getUserData)
app.use(userRouter)
app.use(recipesRouter)
app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})