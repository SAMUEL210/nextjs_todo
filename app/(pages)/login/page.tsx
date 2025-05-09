'use client'

import Link from 'next/link'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { loginSchema } from '@/lib/zod'
import { Loader2, AlertTriangle } from 'lucide-react'
import { authClient, signIn } from '@/lib/auth-client'
import { useState } from 'react'
import { redirect } from 'next/navigation'

export default function Login() {
    const { data: session, isPending } = authClient.useSession()

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        try {
            setError(null)
            setLoading(true)
            await signIn.email(
                {
                    email: values.email,
                    password: values.password,
                    callbackURL: "/",
                },
                {
                    onError: (ctx) => {
                        setLoading(false)
                        if (ctx.error.code === "INVALID_EMAIL_OR_PASSWORD") {
                            setError(ctx.error.code)
                            setErrorMessage(" Identifiants incorrects")
                        } else if (ctx.error.code === "EMAIL_NOT_VERIFIED") {
                            setError(ctx.error.code)
                            setErrorMessage("Votre adresse email n'est pas vérifiée. Veuillez vérifier votre boîte mail.")
                        } else {
                            setError(ctx.error.code)
                            setErrorMessage("Une erreur est survenue. Veuillez réessayer.")
                        }
                    }
                },
            );
        } catch (err) {
            console.error('Form submission error', err)
            setErrorMessage("Une erreur est survenue. Veuillez réessayer.")
        }
    }

    return (
        (isPending == false && session == null) ? (
            <div className="flex flex-col min-h-[50vh] h-full w-full items-center justify-center px-4 pt-10">
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Se connecter</CardTitle>
                        <CardDescription>
                            Entrer votre adresse mail et mot de passe pour vous connecter
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
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem className="grid gap-2">
                                                <div className="flex justify-between items-center">
                                                    <FormLabel htmlFor="password">Mot de passe</FormLabel>
                                                    <Link
                                                        href="/forgot-password"
                                                        className="ml-auto inline-block text-sm underline"
                                                    >
                                                        Mot de passe oublié?
                                                    </Link>
                                                </div>
                                                <FormControl>
                                                    <PasswordInput
                                                        id="password"
                                                        placeholder="******"
                                                        autoComplete="current-password"
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
                                            "Se connecter"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                        <div className="mt-4 text-center text-sm">
                            Pas de compte?{' '}
                            <Link href="/register" className="underline">
                                Créer un compte
                            </Link>
                        </div>
                    </CardContent>
                </Card>
                {error && (
                    <div className="mt-4 text-red-500 text-sm mx-auto max-w-md">
                        <div className="flex flex-row items-center">
                            <AlertTriangle /> {errorMessage}{error === "EMAIL_NOT_VERIFIED" && (
                                <Button variant="ghost" className="underline ml-1" onClick={async () => {
                                    await authClient.sendVerificationEmail({
                                        email: form.getValues("email"),
                                        callbackURL: "/login",
                                    });
                                }}>
                                    Rennvoyer l&apos;email de vérification
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div >
        ) : redirect('/')
    )
}
