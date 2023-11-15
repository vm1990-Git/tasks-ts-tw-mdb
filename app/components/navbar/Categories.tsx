'use client'

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { HiOutlineClock } from 'react-icons/hi';
import { MdOutlinePending } from 'react-icons/md';
import { MdOutlineTaskAlt } from 'react-icons/md';
import CategoryBox from '../CategoryBox';

export const categories = [
    {
        label: 'All',
        icon: MdOutlinePending,
        description: 'Pending Tasks',
    },
    {
        label: 'Pending',
        icon: HiOutlineClock,
        description: 'Pending Tasks',
    },
    {
        label: 'Completed',
        icon: MdOutlineTaskAlt,
        description: 'Completed tasks'
    },
]

const Categories = () => {
    const path = usePathname()

    return (
        <div
            className="
                flex 
                flex-row 
                items-center 
                justify-evenly
                overflow-x-auto
                lg:justify-center
                lg:gap-12
            "
        >
            {categories.map((item) => {
                return (
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                        selected={path === `/tasks/${item.label}`}
                    />
                );
            })}
        </div>
    );
}

export default Categories;