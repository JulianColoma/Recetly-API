import { Router } from "express"
import { RecipeController } from "../controllers/recipe.js"
export const recipesRouter = Router()

recipesRouter.get("/recipes", RecipeController.getAll)
recipesRouter.get("/recipes/user",RecipeController.getById)
recipesRouter.post('/recipes',RecipeController.postRecipe)
recipesRouter.delete('/recipes/:id', RecipeController.deleteRecipe)
recipesRouter.patch('/recipes/:id', RecipeController.updateRecipe)

  