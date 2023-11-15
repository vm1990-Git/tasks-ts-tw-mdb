'use client'

import { useRouter } from "next/navigation"

const Logo = () => {

    const router = useRouter()
    return (
        <h1
            className='font-semibold px-2 cursor-pointer'
            onClick={() => router.push('/')} >Tasks Organizer</h1>
    )
}

export default Logo