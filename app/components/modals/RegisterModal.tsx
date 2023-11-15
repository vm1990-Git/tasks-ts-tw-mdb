'use client'

import React, { useState } from 'react'
import Input from '../inputs/Input'
import Modal from './Modal'
import useRegisterModal from '@/app/hooks/UseRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from 'axios'
import toast from 'react-hot-toast'

const RegisterModal = () => {

    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        },
    });

    const toLogin = () => {
        registerModal.onClose()
        loginModal.onOpen()
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(data.email)) {
            toast.error('Invalid email address');
            setIsLoading(false);
            return;
        }

        axios
            .post('api/register', data)
            .then(() => {
                registerModal.onClose();
                loginModal.onOpen()
                toast.success('Registered!');
            })
            .catch((error) => {
                toast.error('Something went wrong');
            })
            .finally(() => setIsLoading(false));
    }


    const bodyContet = (
        <div className='p-2 flex flex-col gap-3'>
            <Input id='name' disabled={isLoading} errors={errors} register={register} label='Name' type='text' required />
            <Input id='email' disabled={isLoading} errors={errors} register={register} label='Email' type='text' required />
            <Input id='password' disabled={isLoading} errors={errors} register={register} label='Password' type='password' required />
        </div>
    )

    const footerContent = (
        <div>
            <div className='text-sm text-gray-600'>You already have an account?
                <span
                    className='text-black cursor-pointer hover:text-slate-400'
                    onClick={toLogin}
                > Login</span>
            </div>
        </div>
    )

    return (
        <Modal
            title='Sign up'
            isOpen={registerModal.isOpen}
            disabled={isLoading}
            actionLabel='Continue'
            body={bodyContet}
            footer={footerContent}
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
        />

    )
}

export default RegisterModal