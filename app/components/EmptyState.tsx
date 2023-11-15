'use client'

import React from 'react'
import useLoginModal from '../hooks/useLoginModal'
import Link from 'next/link'

const EmptyState = () => {

    const loginModal = useLoginModal()

    return (
        <div className='h-full flex flex-col justify-center items-center'>
            <div
                className='cursor-pointer text-lg font-semibold -translate-y-52 px-10'
            >
                This was simple a proyect to practice Typecrypt, Next13, MongoDB and Tailwind
                <div className='text-sm'>
                    <br />
                    <Link target='_blank' href={'https://github.com/vm1990-Git'} className='cursor-pointer hover:text-slate-400'>Link to GitHub</Link>
                    <br />
                    <Link target='_blank' href={'https://www.linkedin.com/in/valentin-miranda-b508a1297/'} className='cursor-pointer hover:text-slate-400'>Link to LinkedIn</Link>
                </div>
            </div>
            <div
                className='cursor-pointer text-lg font-semibold bg-slate-200 hover:bg-slate-300 transition p-2 rounded-md shadow-md'
                onClick={loginModal.onOpen}
            >
                Login to access your tasks
            </div>

        </div>
    )
}

export default EmptyState