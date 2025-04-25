'use client'

import Image from "next/image"
import NavUser from "@/components/nav-user";
import { authClient } from "@/lib/auth-client";

export default function NavBar() {
    const { data: session } = authClient.useSession()
    return (
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
            <div className="flex lg:flex-1">
                <a href="/" className="-m-2 p-1.5 flex flex-row gap-2 items-center">
                    <span className="sr-only">Tâches SM</span>
                    <Image
                        src="/favicon.ico"
                        width={50}
                        height={50}
                        alt="Tâche SM"
                    />
                </a>
            </div>
            {(session) &&
                <NavUser user={{
                    name: session?.user.name,
                    email: session?.user.email,
                    avatar: session?.user.image != null ? session.user.image : ''
                }} />
            }
        </nav>
    )
};
