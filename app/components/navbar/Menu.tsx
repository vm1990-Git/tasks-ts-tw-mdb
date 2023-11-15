import React, { useCallback, useState, useEffect, useRef } from 'react';
import MenuItem from './MenuItem';
import { HiMenu } from 'react-icons/hi';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/UseRegisterModal';
import { SafeUser } from '@/app/types';
import { signOut } from 'next-auth/react';
import useTaskCreationModal from '@/app/hooks/useTaskCreationModal';

interface UserMenuProps {
    currentUser?: SafeUser | null;
}

const Menu: React.FC<UserMenuProps> = ({ currentUser }) => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const taskCreationModal = useTaskCreationModal();
    const [isOpen, setIsOpen] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const closeMenu = useCallback(() => {
        setIsOpen(false);
    }, []);

    const handleClickOutside = (event: MouseEvent) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target as Node)
        ) {
            closeMenu();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className='flex gap-2 relative px-4' ref={menuRef}>
            {currentUser ? (
                <div className='font-semibold translate-y-1'>{currentUser.name}</div>
            ) : null}
            <div
                onClick={toggleOpen}
                className='border-[1px] rounded-full p-1.5 hover:bg-slate-200 transition'
            >
                <HiMenu />
            </div>
            {isOpen && (
                <div className='absolute rounded-md w-[40vw] md:w-[20vw] bg-gray-100 right-0 border-2 translate-y-12 translate-x-1'>
                    {currentUser ? (
                        <div>
                            <MenuItem
                                label='Create Task'
                                onClick={taskCreationModal.onOpen}
                            />
                            <MenuItem label='Logout' onClick={() => signOut()} />
                        </div>
                    ) : (
                        <>
                            <MenuItem label='Login' onClick={loginModal.onOpen} />
                            <MenuItem label='Sign up' onClick={registerModal.onOpen} />
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Menu;
