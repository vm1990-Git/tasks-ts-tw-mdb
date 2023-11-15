'use client'

import {
    SafeTask,
    SafeUser
} from "@/app/types";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';
import React, { useState } from 'react'
import axios from 'axios';
import useTaskEditionModal from "../hooks/useTaskEditionModal";
import useTaskDeleteModal from "../hooks/useTaskDeleteModal";
import Button from './Button';

interface TaskCardProps {
    data: SafeTask;
    currentUser?: SafeUser | null
};

const TaskCard: React.FC<TaskCardProps> = ({ data }) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const TaskEditionModal = useTaskEditionModal()
    const TaskDeleteModal = useTaskDeleteModal()

    const updateTask = () => {
        setIsLoading(true);
        axios.post('/api/task/update', TaskEditionModal.data)
            .then(() => {
                toast.success('Task updated!');
                router.refresh();
                TaskEditionModal.onClose();
            })
            .catch(() => {
                toast.error('Something went wrong.');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const handleEdit = () => {
        TaskEditionModal.data = data
        TaskEditionModal.onOpen()
    }

    const handleDelete = () => {
        TaskDeleteModal.id = data.id
        TaskDeleteModal.onOpen()
    }

    const handleCompleted = () => {
        TaskEditionModal.data = { ...data, state: 'Completed' }
        updateTask()
    }

    const handlePending = () => {
        TaskEditionModal.data = { ...data, state: 'Pending' }
        updateTask()
    }


    return (
        <div
            className={`
            border-2
            rounded-lg
            bg-gray-100
            shadow-md
            h-56 w-full
            flex flex-col
            justify-between
            ${data.state === 'Completed' ? 'border-lime-300/70' : 'border-gray-200'}`}
        >
            <div>
                <div className={`flex justify-center text-sm rounded-t-md ${data.state === 'Completed' ? 'bg-lime-300/70' : 'bg-gray-200'}`}>
                    {data.state}
                </div>
                <div className="font-semibold border-b-2 flex justify-center ">
                    {data.title.toUpperCase()}
                </div>
            </div>
            <div
                className="
                    flex
                    justify-center
                    text-sm
                    overflow-y-scroll
                    scrollbar-thin
                    scrollbar-track-gray-200
                    scrollbar-thumb-gray-300
                    px-4
                ">{data.description}</div>
            <div className="flex justify-evenly">
                <div className="flex justify-evenly p-2 border-t-2 w-full">
                    {data.state === 'Completed' ? (
                        <>
                            <Button label="Delete" onClick={handleDelete} type="red" />
                            <Button label="Pending" onClick={handlePending} type="slate" />
                        </>
                    ) : (
                        <>
                            <Button label="Edit" onClick={handleEdit} type="red" />
                            <Button label="Complete" onClick={handleCompleted} type="slate" />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TaskCard