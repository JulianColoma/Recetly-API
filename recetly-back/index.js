import express from 'express';
import { recipesRouter } from './routes/recipes.js';
import cookieParser from 'cookie-parser';
import {getUserData} from './middlewares/user.js'
import { userRouter } from './routes/users.js';
import cors from 'cors';

const PORT = process.env.PORT ?? 1234

app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:5173',
      'http://localhost:1234'
    ]

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}))
const app = express()
app.disable('x-powered-by')
app.use(express.json())
app.use(cookieParser())
app.use(getUserData)
app.use(userRouter)
app.use(recipesRouter)
app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})