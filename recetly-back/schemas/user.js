import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "El nombre no puede estar vacío").max(255, "El nombre no puede exceder 255 caracteres"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  admin: z.boolean().optional(), 
});
