import express from 'express';
import { recipesRouter } from './routes/recipes.js';
import cookieParser from 'cookie-parser';
import {getUserData} from './middlewares/user.js'
import { userRouter } from './routes/users.js';
const PORT = process.env.PORT ?? 1234

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