'use client'

import NavUser from "@/components/nav-user"
import { authClient } from "@/lib/auth-client"
import { useState, useEffect } from "react"
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import Logo from "./logo"
//import { menuItems } from "@/lib/data"
import { Skeleton } from "./ui/skeleton"

export default function Navbar() {
    const { data: session, isPending } = authClient.useSession()

    const [menuState, setMenuState] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className="mx-auto flex max-w-full items-center justify-between p-6 lg:px-8 mb-10">
            <header>
                {(isPending) ? (
                    <Skeleton className="fixed z-20 w-full px-2 group" />
                ) : (
                    <nav
                        data-state={menuState && 'active'}
                        className="fixed z-20 w-full px-2 group">
                        <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', isScrolled && 'bg-background/50 max-w-4xl rounded-2xl border border-green-800 backdrop-blur-lg lg:px-5')}>
                            <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4 w-full">
                                <div className="flex w-full justify-between lg:w-auto">
                                    <Link
                                        href="/"
                                        aria-label="home"
                                        className="flex items-center space-x-2">
                                        <Logo />
                                    </Link>

                                    <button
                                        onClick={() => setMenuState(!menuState)}
                                        aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                        className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                        <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                        <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                                    </button>
                                </div>
                                {/* 
                                <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                                    <ul className="flex gap-8 text-sm">
                                        {menuItems.map((item, index) => (
                                            <li key={index}>
                                                <Link
                                                    href={item.href}
                                                    className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                    <span>{item.name}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                */}
                                <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                                    {/*
                                    <div className="lg:hidden">
                                        <ul className="space-y-6 text-base">
                                            {menuItems.map((item, index) => (
                                                <li key={index}>
                                                    <Link
                                                        href={item.href}
                                                        className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                        <span>{item.name}</span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>*/}
                                    {(session) ? (
                                        <NavUser user={{
                                            name: session?.user.name,
                                            email: session?.user.email,
                                            avatar: session?.user.image != null ? session.user.image : ''
                                        }} />
                                    ) : (
                                        <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                            <Button
                                                asChild
                                                variant="outline"
                                                size="sm"
                                                className={cn(isScrolled ? 'lg:hidden' : 'border-green-800 text-green-800 hover:text-white hover:bg-green-600 hover:border-green-600')}>
                                                <Link href="/login">
                                                    <span>Se connecter</span>
                                                </Link>
                                            </Button>
                                            <Button
                                                asChild
                                                size="sm"
                                                className={cn(isScrolled ? 'lg:hidden' : 'bg-green-800 hover:bg-green-600')}>
                                                <Link href="/register">
                                                    <span>S&apos;inscrire</span>
                                                </Link>
                                            </Button>
                                            <Button
                                                asChild
                                                size="sm"
                                                className={cn(isScrolled ? 'lg:inline-flex bg-green-800 hover:bg-green-600' : 'hidden')}>
                                                <Link href="/dashboard">
                                                    <span>Commencer</span>
                                                </Link>
                                            </Button>
                                        </div>
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                    </nav>
                )}
            </header>
        </nav>
    )
};