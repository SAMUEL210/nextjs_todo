import {z} from "zod";

export const todoSchema = z.object({
    title: z.string().min(1, "Le titre est requis!").max(100, "Le titre ne doit pas dépasser 100 caractères"),
    description: z.string().max(500, "La description de doit pas dépasser 500 caractères").optional(),
    isCompleted: z.boolean().default(false),
    userId: z.string()
})

export const registrationSchema = z
    .object({
        firstName: z.string().min(2, { message: 'Le prénom est trop court'}),
        lastName: z.string().min(2, { message: 'Le nom est trop court' }),
        email: z.string().email({ message:"L'adresse email est incorrecte!" }),
        //phone: z.string().min(10, { message: 'Le N° Téléphone doit être correcte' }),
        password: z.string()
            .min(8, { message: 'Le mot de passe doit faire au moin 8 caractères' })
            .regex(/[a-zA-Z0-9]/, { message: 'Le mot de passe doit être composéde chiffre et de lettre!' }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'les mots de passe ne correspondent pas!',
    })
export const loginSchema = z.object({
    email: z.string().email({ message: "Veuillez saisir une adresse mail correcte svp!" }),
    password: z.string()
})

export const forgotPassorwSchema = z.object({
    email: z.string().email({ message: 'Veuillez saisir une adresse mail valide svp!' }),
})

export const resetPasswordSchema = z
    .object({
        password: z.string()
            .min(8, { message: 'Le mot de passe doit faire au moin 8 caractères' })
            .regex(/[a-zA-Z0-9]/, { message: 'Le mot de passe doit être composéde chiffre et de lettre!' }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Les mots de passe ne correspondent pas!',
    })

export type TodoSchema = z.infer<typeof todoSchema>;