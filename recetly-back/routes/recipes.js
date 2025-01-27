import { Router } from "express"
import { RecipeController } from "../controllers/recipe.js"
import { upload } from "../multer.js"

export const recipesRouter = Router()

recipesRouter.get("/recipes", RecipeController.getAll)
recipesRouter.get("/recipes/:id",RecipeController.getById)
recipesRouter.post('/recipes',upload.single('photo'), RecipeController.postRecipe)
recipesRouter.delete('/recipes/:id', RecipeController.deleteRecipe)
recipesRouter.patch('/recipes/:id',upload.single('photo'), RecipeController.updateRecipe)

  