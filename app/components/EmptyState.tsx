'use client'

import React from 'react'
import useLoginModal from '../hooks/useLoginModal'

const EmptyState = () => {

    const loginModal = useLoginModal()

    return (
        <div className='h-full flex flex-col justify-center items-center'>
            <div
                className='cursor-pointer text-lg font-semibold -translate-y-28 px-10'
            >
                This was simple a proyect to practice Typecrypt, Next13, MongoDB and Tailwind.
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