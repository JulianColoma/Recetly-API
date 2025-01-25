import { Router } from "express"
import { UserController } from "../controllers/user"

export const userRouter = Router()

userRouter.post("/login", UserController.create)
userRouter.post("/logout", UserController.logout)
userRouter.post("/register", UserController.login)