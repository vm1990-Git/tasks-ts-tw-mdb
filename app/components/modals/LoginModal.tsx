'use client'

import React, { useState } from 'react'
import Input from '../inputs/Input'
import Modal from './Modal'
import useLoginModal from '@/app/hooks/useLoginModal'
import useRegisterModal from '@/app/hooks/UseRegisterModal'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const LoginModal = () => {

    const router = useRouter()
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
            email: '',
            password: ''
        },
    });

    const toSignUp = () => {
        loginModal.onClose()
        registerModal.onOpen()
    }

    const onSubmit: SubmitHandler<FieldValues> =
        (data) => {
            setIsLoading(true);

            signIn('credentials', {
                ...data,
                redirect: false,
            })
                .then((callback) => {
                    setIsLoading(false);

                    if (callback?.ok) {
                        toast.success('Logged in');
                        router.refresh();
                        loginModal.onClose();
                    }

                    if (callback?.error) {
                        toast.error(callback.error);
                    }
                });
        }

    const bodyContet = (
        <div className='p-2 flex flex-col gap-3'>
            <Input id='email' disabled={isLoading} errors={errors} register={register} label='Email' type='text' required />
            <Input id='password' disabled={isLoading} errors={errors} register={register} label='Password' type='password' required />
        </div>
    )

    const footerContent = (
        <div>
            <div className='text-sm text-gray-600'>You dont have an account?
                <span
                    className='text-black cursor-pointer hover:text-slate-400'
                    onClick={toSignUp}
                > Sign up</span>
            </div>
        </div>
    )

    return (
        <Modal
            title='Login'
            isOpen={loginModal.isOpen}
            actionLabel='Login'
            disabled={isLoading}
            body={bodyContet}
            footer={footerContent}
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
        />

    )
}

export default LoginModal