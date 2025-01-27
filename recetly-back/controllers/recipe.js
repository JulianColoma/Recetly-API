import { RecipeModel } from "../models/recipe.js"
import recipeSchema from "../schemas/recipe.js"
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

export class RecipeController {
    static getAll = async (req, res) => {
        const { user } = req.session
        console.log(user)
        if(!user) return res.status(403).send('Access not authorized')
        try{
        const { user_id }  = user
        const recipes = await RecipeModel.getAll(user_id)
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
        const { id } = req.params
        const recipe = await RecipeModel.getById(id)
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
            const photo = req.file 
            const validated_input = recipeSchema.parse(req.body);
            validated_input.photo = photo.filename
            await RecipeModel.postRecipe(validated_input, user.user_id); 
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
        const recipe = await RecipeModel.getById(id)
        fs.unlink(`${process.env.BASEPATH + recipe.photo}`,(err) => {
            if (err) {
              console.error('Error al eliminar el archivo', err);
            } else {
              console.log('Archivo eliminado');
            }
          })
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
        const photo = req.file 
        const validated_input = recipeSchema.parse(req.body);
        validated_input.photo = photo.filename
        const recipe = await RecipeModel.getById(id)
        fs.unlink(`${process.env.BASEPATH + recipe.photo}`,(err) => {
            if (err) {
              console.error('Error al eliminar el archivo', err);
            } else {
              console.log('Archivo eliminado');
            }
          })
        await RecipeModel.updateRecipe(id, validated_input)
        res.status(200).end()
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }
}