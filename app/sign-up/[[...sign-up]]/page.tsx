import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className='w-full h-full flex flex-row justify-center items-center mt-15'>
            <SignUp />
        </div>
    )
}