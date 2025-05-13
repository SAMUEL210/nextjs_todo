import Image from 'next/image'
import { cn } from '@/lib/utils'

export default function Logo({ className }: { className?: string }) {
    return (
        <>
            <Image
                src="/logo.png"
                width={100}
                height={100}
                alt="Logo"
                className={cn('h-15 w-auto', className)}
            />
        </>
    )
}