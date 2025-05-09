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
//import { PhoneInput } from '@/components/ui/phone-input'
import { registrationSchema } from "@/lib/zod";
import { Loader2, X, AlertTriangle } from "lucide-react"
import { authClient, signUp } from "@/lib/auth-client"
import { useState } from 'react'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default function Register() {
    const { data: session, isPending } = authClient.useSession()

    const form = useForm<z.infer<typeof registrationSchema>>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            //phone: '',
            password: '',
            confirmPassword: '',
        },
    })

    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }

    async function convertImageToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    async function onSubmit(values: z.infer<typeof registrationSchema>) {
        try {
            setError(null)
            setLoading(true)
            await signUp.email({
                email: values.email,
                password: values.password,
                name: `${values.firstName} ${values.lastName}`,
                //phone: values.phone,
                image: image ? await convertImageToBase64(image) : "",
                callbackURL: "/login",
                fetchOptions: {
                    onError: (ctx) => {
                        if (ctx.error.code === "USER_ALREADY_EXISTS") {
                            setError(ctx.error.code);
                            setErrorMessage("Cet email est déjà utilisé.");
                            setLoading(false);
                        } else {
                            setError("UNKNOWN_ERROR");
                            setErrorMessage("Une erreur inconnue s'est produite.");
                            setLoading(false);
                        }
                    },
                    onSuccess: () => {
                        redirect("/login");
                    }
                },
            });
        } catch (err) {
            console.error('Form submission error', err)
        }
    }

    return (
        (isPending == false && session == null) ? (
            <div className="flex min-h-[60vh] h-full w-full items-center justify-center px-4 mt-10">
                <Card className="mx-auto max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl">Inscription</CardTitle>
                        <CardDescription>
                            Veuillez remplir le formulaire ci-dessous pour vous inscrire.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                                <div className="grid grid-cols-12 gap-2 my-2">
                                    <div className='col-span-6'>
                                        <FormField
                                            control={form.control}
                                            name="firstName"
                                            render={({ field }) => (
                                                <FormItem className="grid gap-2">
                                                    <FormLabel htmlFor="firstName">Prénom</FormLabel>
                                                    <FormControl>
                                                        <Input id="firstName" placeholder="Jean Pierre" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className='col-span-6'>
                                        <FormField
                                            control={form.control}
                                            name="lastName"
                                            render={({ field }) => (
                                                <FormItem className="grid gap-2">
                                                    <FormLabel htmlFor="lastName">Nom</FormLabel>
                                                    <FormControl>
                                                        <Input id="lastName" placeholder="Dupont" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel htmlFor="email">Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="email"
                                                    placeholder="jp.dupont@exemple.com"
                                                    type="email"
                                                    autoComplete="email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/*<FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel htmlFor="phone">N° Téléphone</FormLabel>
                                    <FormControl>
                                        <PhoneInput {...field} defaultCountry="FR" />

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />*/}
                                <div className="grid grid-cols-12 gap-2 my-2">
                                    <div className='col-span-6'>
                                        {/* Password Field */}
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem className="grid gap-2">
                                                    <FormLabel htmlFor="password">Mot de passe</FormLabel>
                                                    <FormControl>
                                                        <PasswordInput
                                                            id="password"
                                                            placeholder="********"
                                                            autoComplete="new-password"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className='col-span-6'>
                                        <FormField
                                            control={form.control}
                                            name="confirmPassword"
                                            render={({ field }) => (
                                                <FormItem className="grid gap-2">
                                                    <FormLabel htmlFor="confirmPassword">
                                                        Confirmer Mot de passe
                                                    </FormLabel>
                                                    <FormControl>
                                                        <PasswordInput
                                                            id="confirmPassword"
                                                            placeholder="********"
                                                            autoComplete="new-password"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 w-full border border-gray-300 rounded-md p-2">
                                    <div>
                                        <label htmlFor="#" className="text-sm">Photo de profil</label>
                                    </div>
                                    <div className='flex flex-row items-center gap-2'>
                                        {imagePreview && (
                                            <div className="relative w-16 h-16 rounded-full overflow-hidden">
                                                <Image
                                                    src={imagePreview}
                                                    alt="Profile preview"
                                                    layout="fill"
                                                    objectFit="cover"
                                                />
                                            </div>
                                        )}
                                        <Input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="w-full"
                                        />
                                        {imagePreview && (
                                            <X
                                                className="cursor-pointer"
                                                onClick={() => {
                                                    setImage(null);
                                                    setImagePreview(null);
                                                }}
                                            />
                                        )}
                                    </div>

                                </div>
                                <Button type="submit" className="w-full bg-green-800 hover:bg-green-700" disabled={loading} >
                                    {loading ? (
                                        <Loader2 size={16} className="animate-spin" />
                                    ) : (
                                        "Créer un compte"
                                    )}
                                </Button>
                            </form>
                        </Form>
                        <div className="mt-4 text-center text-sm">
                            Déjà un compte?{' '}
                            <Link href="/login" className="underline">
                                Se connecter
                            </Link>
                        </div>

                    </CardContent>
                </Card>
                {error && (
                    <div className="mt-4 text-red-500 text-sm mx-auto max-w-md">
                        <div className="flex flex-row items-center gap-2">
                            <AlertTriangle /> {errorMessage}
                        </div>
                    </div>
                )}
            </div >
        ) : redirect('/')
    )
}
