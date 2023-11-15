'use client'

import { SafeUser } from '@/app/types'
import Menu from './Menu'
import Categories from './Categories'
import Logo from './Logo'

interface NavbarProps {
    currentUser?: SafeUser | null
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
    return (
        <div className="fixed w-full bg-white shadow-sm z-10">
            <div className="py-4 border-b-[1px] bg-gray-100 shadow-md">
                <div className="flex flex-row justify-between items-center gap-5 md:gap-0 w-100 px-0 md:px-2">
                    <Logo />
                    <Menu currentUser={currentUser} />
                </div>
            </div>
            {currentUser ? (
                <Categories />
            ) : null}
        </div>
    );
};

export default Navbar