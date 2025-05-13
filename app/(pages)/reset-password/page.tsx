'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Navbar from "@/components/navbar"
import ResetPasswordForm from '@/components/reset-password-form'
import { Suspense } from 'react';

export default function ResetPassword() {

    return (
        <>
            <Navbar />
            <div className="flex min-h-[50vh] h-full w-full items-center justify-center px-4 mt-20">
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Réinitialisation de mot de passe</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Suspense>
                            <ResetPasswordForm />
                        </Suspense>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
