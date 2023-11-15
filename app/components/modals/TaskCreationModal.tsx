'use client'

import React, { useState } from 'react'
import Input from '../inputs/Input'
import Modal from './Modal'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import useTaskCreationModal from '@/app/hooks/useTaskCreationModal'
import axios from 'axios';

const TaskCreationModal = () => {

    const router = useRouter()
    const TaskCreationModal = useTaskCreationModal()
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            title: '',
            description: '',
            state: 'Pending'
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/task', data)
            .then(() => {
                toast.success('Task created!');
                router.refresh();
                reset();
                TaskCreationModal.onClose();
            })
            .catch(() => {
                toast.error('Something went wrong.');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const bodyContet = (
        <div className='p-2 flex flex-col gap-3'>
            <Input id='title' disabled={isLoading} errors={errors} register={register} label='Title' type='text' required />
            <Input id='description' disabled={isLoading} errors={errors} register={register} label='Description' type='text' required big />
        </div>
    )

    return (
        <Modal
            title='New Task'
            isOpen={TaskCreationModal.isOpen}
            actionLabel='Create'
            disabled={isLoading}
            body={bodyContet}
            onClose={TaskCreationModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            secondaryActionLabel='Cancel'
            secondaryAction={TaskCreationModal.onClose}
        />

    )
}

export default TaskCreationModal