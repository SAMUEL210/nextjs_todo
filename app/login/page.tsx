'use client'

import Link from 'next/link'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { loginSchema } from '@/lib/zod'
import { Loader2 } from 'lucide-react'
import { signIn } from '@/lib/auth-client'
import { useState } from 'react'


export default function Login() {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const [loading, setLoading] = useState(false)

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        try {
            await signIn.email(
                {
                    email: values.email,
                    password: values.password,
                    callbackURL: "/",
                },
                {
                    onRequest: () => {
                        setLoading(true);
                    },
                    onResponse: () => {
                        setLoading(false);
                    }
                },
            );
        } catch (error) {
            console.error('Form submission error', error)
            toast.error('Failed to submit the form. Please try again.')
        }
    }

    return (
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
                                                    href="#"
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
        </div>
    )
}
