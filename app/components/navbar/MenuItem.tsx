'use client'

import React from 'react'

type MenuItemProps = {
    onClick: () => void
    label: string
}

const MenuItem: React.FC<MenuItemProps> = ({
    label,
    onClick,
}) => {
    return (
        <div
            onClick={onClick}
            className='
                px-4
                py-2
                hover:bg-slate-200
                transition
                font-semibold
                cursor-pointer
            '
        >{label}</div>
    )
}

export default MenuItem