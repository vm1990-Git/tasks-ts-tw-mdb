'use client'

import React from 'react'
import useTaskCreationModal from '../hooks/useTaskCreationModal'
import { MdAdd } from "react-icons/md";

const EmptyTask = () => {

    const TaskCreationModal = useTaskCreationModal()
    return (
        <div
            onClick={TaskCreationModal.onOpen}
            className={`
                rounded-lg
                h-56 w-full
                flex 
                flex-col
                justify-center
                items-center
                bg-white
                shadow-md
                text-slate-500
                border-2
                hover:bg-slate-100
            `
            }
        >
            <div className='
                font-semibold
                rounded-lg
               '
            >
                <div>New task</div>
                <div className='translate-x-4'><MdAdd size={42} /></div>

            </div>
        </div>
    )
}

export default EmptyTask