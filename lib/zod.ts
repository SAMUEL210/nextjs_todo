import {z} from "zod";

export const todoSchema = z.object({
    title: z.string().min(1, "Le titre est requis!").max(100, "Le titre ne doit pas dépasser 100 caractères"),
    description: z.string().max(500, "La description de doit pas dépasser 500 caractères").optional(),
    isCompleted: z.boolean().default(false),
    userId: z.string()
})

export const loginSchema = z.object({
    email: z.string().email({ message: "Veuillez saisir une adresse mail correcte svp!" }),
    password: z
        .string()
})

export const forgotPassorwSchema = z.object({
    email: z.string().email({ message: 'Veuillez saisir une adresse mail valide svp!' }),
})

export const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(6, { message: 'Password must be at least 6 characters long' })
            .regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match',
    })

export type TodoSchema = z.infer<typeof todoSchema>;