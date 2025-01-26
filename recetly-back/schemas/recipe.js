import { z } from 'zod'
export const recipeSchema = z.object({
    title: z.string().min(1, "El título no puede estar vacío").max(255, "El título no puede exceder 255 caracteres"),
    photo: z.instanceof(Buffer).optional(),
    difficulty: z.number().int().min(1).max(5).optional(),
    comments: z.string().optional(), 
    ingredients: z.array(ingredientSchema).min(1, "Debe incluir al menos un ingrediente"),
    steps: z.array(z.string()).min(1, "Debe incluir al menos un paso"),
    elaboration_time: z.number().min(1, "El tiempo de elaboración debe ser al menos 1 minuto"), 
  });