'use client'

import React, { useState } from 'react'
import Modal from './Modal'
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import axios from 'axios';
import useTaskDeleteModal from '@/app/hooks/useTaskDeleteModal'
import useTaskEditionModal from '@/app/hooks/useTaskEditionModal';

const TaskDeleteModal = () => {

    const router = useRouter()
    const TaskDeleteModal = useTaskDeleteModal()
    const TaskEditionModal = useTaskEditionModal()
    const [isLoading, setIsLoading] = useState(false)

    const handleDelete = () => {
        setIsLoading(true);

        axios.delete('/api/task/delete', { data: { id: TaskDeleteModal.id } })
            .then(() => {
                toast.success('Task deleted!');
            })
            .catch(() => {
                console.log({ data: { id: TaskDeleteModal.id } })
                toast.error('Something went wrong.');
            })
            .finally(() => {
                setIsLoading(false);
                TaskDeleteModal.onClose()
                TaskEditionModal.onClose()
                router.refresh()
            });


    }

    const bodyContet = (
        <div className='p-2 flex flex-col gap-3'>
            <div>Are you sure that you want to delete this task?</div>
        </div>
    )

    return (
        <Modal
            title='Delete'
            isOpen={TaskDeleteModal.isOpen}
            actionLabel='Cancel'
            disabled={isLoading}
            body={bodyContet}
            onClose={TaskDeleteModal.onClose}
            onSubmit={TaskDeleteModal.onClose}
            secondaryActionLabel='Delete'
            secondaryAction={handleDelete}
        />
    )
}

export default TaskDeleteModal