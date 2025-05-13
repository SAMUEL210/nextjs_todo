'use client'

import { authClient } from '@/lib/auth-client'
import LoginForm from "@/components/login-form"
import { redirect } from 'next/navigation'

export default function Login() {
    const { data: session, isPending } = authClient.useSession()

    if (isPending == false && session?.session == undefined) {
        return (
            <div className="flex flex-col min-h-[50vh] h-full w-full items-center justify-center px-4 mt-40">
                <LoginForm />
            </div >
        )
    }
    if (isPending == false && session?.session)
        return (
            redirect('/dashboard')
        )
}
