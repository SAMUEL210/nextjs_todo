'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ResetPasswordForm from '@/components/reset-password-form'
import { useSearchParams } from 'next/navigation';

export default function ResetPassword() {

    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    return (
        (token) ? (
            <div className="flex min-h-[50vh] h-full w-full items-center justify-center px-4" >
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Réinitialisation de mot de passe</CardTitle>
                        <CardDescription>
                            Veuillez entrer votre nouveau mot de passe ci-dessous.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResetPasswordForm
                            token={token}
                        />
                    </CardContent>
                </Card>
            </div>
        ) : (
            <div className="flex min-h-[50vh] h-full w-full items-center justify-center px-4">
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Réinitialisation de mot de passe</CardTitle>
                        <CardDescription>
                            Vous n&apos;êtes pas autorisé à accéder à cette page. Veuillez passer par le lien de réinitialisation de mot de passe que vous avez reçu par e-mail.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    )
}
