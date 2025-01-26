import { RecipeModel } from "../models/recipe.js"

export class RecipeController {
    static getAll = async (req, res) => {
        const { user } = req.session
        console.log(user)
        if(!user) return res.status(403).send('Access not authorized')
        try{
        const recipes = await RecipeModel.getAll()
        res.json(recipes)
        res.status(200).end()
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }
    
    
    static getById = async (req, res) => {
        const { user } = req.session
        if(!user) return res.status(403).send('Access not authorized')
        try{
        const { user_id }  = user
        const recipe = await RecipeModel.getById(user_id)
        res.json(recipe)
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }
    static postRecipe = async (req, res) => {
        const { user } = req.session
        if(!user) return res.status(403).send('Access not authorized')
        try {
            const input = req.body;
            await RecipeModel.postRecipe(input, user.user_id); 
            res.status(201).end(); 
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }
    static deleteRecipe = async (req, res) => {
        const { user } = req.session
        if(!user) return res.status(403).send('Access not authorized')
        try{
        const { id } = req.params
        await RecipeModel.deleteById(id)
        res.status(200).end()
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }
    static updateRecipe = async (req, res) => {
        const { user } = req.session
        if(!user) return res.status(403).send('Access not authorized')
        try{
        const { id } = req.params
        const input = req.body
        await RecipeModel.updateRecipe(id, input)
        res.status(200).end()
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }
}