import Link from 'next/link'
import React from 'react'
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="fixed w-full bg-gray-100 shadow-inner z-10 bottom-0">
            <div className='text-sm font-semibold flex gap-2 p-1 justify-center -translate-x-3'> My Social
                <Link target='_blank' href={'https://github.com/vm1990-Git'} className='cursor-pointer hover:text-slate-400'><FaGithub size={20} /></Link>
                <Link target='_blank' href={'https://www.linkedin.com/in/valentin-miranda-b508a1297/'} className='cursor-pointer hover:text-slate-400'><FaLinkedin size={20} /></Link>
            </div>
        </div>
    )
}

export default Footer