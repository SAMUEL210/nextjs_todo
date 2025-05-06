'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { PasswordInput } from '@/components/ui/password-input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { resetPasswordSchema } from '@/lib/zod'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { redirect } from 'next/navigation'

interface ResetPasswordFormProps {
    token: string | null;
}

export default function ResetPasswordForm({
    token,
}: ResetPasswordFormProps) {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    })

    async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
        try {
            setLoading(true)
            if (token) {
                await authClient.resetPassword(
                    {
                        newPassword: values.password,
                        token,
                    }, {
                    onSuccess: () => {
                        redirect("/login")
                    },
                    onError: (ctx) => {
                        if (ctx.error.code == 'INVALID_TOKEN') {
                            setError("Le lien de réinitialisation de mot de passe est invalide ou a expiré.")
                        } else {
                            setError("Une erreur est survenue lors de la vérification du lien de réinitialisation de mot de passe. Veuillez réessayer svp!")
                        }
                        setLoading(false)
                    }
                });
            }
        } catch (error) {
            console.error('Error resetting password', error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-4">
                    {/* New Password Field */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="grid gap-2">
                                <FormLabel htmlFor="password">New Password</FormLabel>
                                <FormControl>
                                    <PasswordInput
                                        id="password"
                                        placeholder="******"
                                        autoComplete="new-password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem className="grid gap-2">
                                <FormLabel htmlFor="confirmPassword">
                                    Confirm Password
                                </FormLabel>
                                <FormControl>
                                    <PasswordInput
                                        id="confirmPassword"
                                        placeholder="******"
                                        autoComplete="new-password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="w-full bg-green-800 hover:bg-green-700"
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            "Réinitialiser le mot de passe"
                        )}
                    </Button>
                </div>
                {error && (
                    <div className="text-red-500 text-sm mt-2">
                        {error}
                    </div>
                )}
            </form>
        </Form>
    )
};
