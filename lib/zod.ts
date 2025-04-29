import {z} from "zod";

export const todoSchema = z.object({
    title: z.string().min(1, "Le titre est requis!").max(100, "Le titre ne doit pas dépasser 100 caractères"),
    description: z.string().max(500, "La description de doit pas dépasser 500 caractères").optional(),
    isCompleted: z.boolean().default(false),
    userId: z.string()
})

export const loginSchema = z.object({
    email: z.string().email({ message: 'Identifiants incorrects' }),
    password: z
        .string()
        .min(6, { message: 'Identifiants incorrects' })
        .regex(/[a-zA-Z0-9]/, { message: 'Identifiants incorrects' }),
})

export type TodoSchema = z.infer<typeof todoSchema>;