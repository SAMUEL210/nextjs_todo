'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { forgotPassorwSchema } from '@/lib/zod'
import { authClient } from '@/lib/auth-client'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ForgotPassword() {
    const { data: session, isPending } = authClient.useSession()
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const form = useForm<z.infer<typeof forgotPassorwSchema>>({
        resolver: zodResolver(forgotPassorwSchema),
        defaultValues: {
            email: '',
        },
    })

    async function onSubmit(values: z.infer<typeof forgotPassorwSchema>) {
        try {
            setLoading(true)
            await authClient.forgetPassword({
                email: values.email,
                redirectTo: "/reset-password",
            }, {
                onSuccess: () => {
                    setSuccess(true)
                    setLoading(false)
                },
                onError: (ctx) => {
                    if (ctx.error.code == 'INVALID_EMAIL') {
                        setError("Cette adresse email n'est pas valide")
                    } else if (ctx.error.code == 'EMAIL_NOT_FOUND') {
                        setError("Aucun compte n'est associé à cette adresse email")
                    } else {
                        setError("Une erreur est survenue lors de l'envoi de l'email de réinitialisation du mot de passe. Veuillez réessayer svp!")
                    }
                    setLoading(false)
                }
            });
        } catch (error) {
            setLoading(false)
            console.error("Erreur lors de l&apos;envoie du mail", error)
        }
    }

    return (
        (isPending == false && session == null) ? (
            (!success) ? (
                <div className="flex min-h-[40vh] h-full w-full items-center justify-center px-4">
                    <Card className="mx-auto max-w-sm">
                        <CardHeader>
                            <CardTitle className="text-2xl">Mot de passe oublié</CardTitle>
                            <CardDescription>
                                Veuillez saisir votre adresse e-mail pour recevoir un lien de réinitialisation de mot de passe.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <div className="grid gap-4">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem className="grid gap-2">
                                                    <FormLabel htmlFor="email">Email</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            id="email"
                                                            placeholder="johndoe@mail.com"
                                                            type="email"
                                                            autoComplete="email"
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
                                                "Envoyer le lien de réinitialisation"
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
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <div className="flex min-h-[50vh] h-full w-full items-center justify-center px-4">
                    <Card className="mx-auto max-w-sm">
                        <CardHeader>
                            <CardTitle className="text-2xl">Réinitialisation de mot de passe</CardTitle>
                            <CardDescription>
                                Un email de réinitialisation de mot de passe a été envoyé à votre adresse e-mail si un compte existe avec cette adresse mail.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-center text-sm">
                                Veuillez vérifier votre boîte de réception et suivre les instructions pour réinitialiser votre mot de passe.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            )
        ) : router.push('/')
    )
}
