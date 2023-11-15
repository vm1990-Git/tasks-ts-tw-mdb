'use client'

import React, { useState } from 'react'
import Input from '../inputs/Input'
import Modal from './Modal'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import axios from 'axios';
import useTaskEditionModal from '@/app/hooks/useTaskEditionModal'
import useTaskDeleteModal from '@/app/hooks/useTaskDeleteModal'

const TaskEditionModal = () => {

    const router = useRouter()
    const TaskEditionModal = useTaskEditionModal()
    const TaskDeleteModal = useTaskDeleteModal()
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
        reset,
    } = useForm<FieldValues>({
        values: {
            id: TaskEditionModal.data.id,
            title: TaskEditionModal.data.title,
            description: TaskEditionModal.data.description,
            state: TaskEditionModal.data.state
        }
    });

    const handleDelete = () => {
        console.log('handleDelete')
        TaskDeleteModal.id = TaskEditionModal.data.id,
        TaskDeleteModal.onOpen()
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/task/update', data)
            .then(() => {
                toast.success('Task updated!');
                router.refresh();
                reset();
                TaskEditionModal.onClose();
            })
            .catch(() => {
                toast.error('Something went wrong.');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const bodyContet = (
        <div className='py-2 flex flex-col gap-1'>
            <Input id='title' disabled={isLoading} errors={errors} register={register} label='Title' type='text' required />
            <Input id='description' disabled={isLoading} errors={errors} register={register} label='Description' type='text' required big />
        </div>
    )

    return (
        <Modal
            title='New Task'
            isOpen={TaskEditionModal.isOpen}
            actionLabel='Edit'
            disabled={isLoading}
            body={bodyContet}
            onClose={TaskEditionModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            secondaryActionLabel='Delete'
            secondaryAction={handleDelete}
        />

    )
}

export default TaskEditionModal