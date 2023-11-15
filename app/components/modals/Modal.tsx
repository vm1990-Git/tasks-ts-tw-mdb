'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io';
import Button from '../Button';
import { useRouter } from 'next/navigation';

type ModalProps = {
    actionLabel: string
    isOpen: boolean
    disabled: boolean
    onClose: () => void
    onSubmit: () => void

    title?: string
    body?: React.ReactElement
    footer?: React.ReactElement

    secondaryActionLabel?: string
    secondaryAction?: () => void
}

const Modal: React.FC<ModalProps> = ({
    actionLabel,
    isOpen,
    disabled,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    secondaryActionLabel,
    secondaryAction
}) => {

    const router = useRouter()

    const handleClose = () => {
        if (disabled) {
            return;
        }
        router.push('/')
        onClose();
    }

    const handleSubmit = () => {
        if (disabled) {
            return
        }
        onSubmit()
    }

    if (!isOpen) {
        return null
    }

    return (
        <div
            className='
                justify-center 
                items-center 
                flex 
                overflow-x-hidden 
                overflow-y-auto 
                fixed 
                inset-0 
                z-50 
                outline-none 
                focus:outline-none
                bg-neutral-700/70
            '
        >
            <div className='bg-gray-200 rounded-md p-7'>
                <button className='
                            hover:opacity-70
                            transiton
                            absolute
                            -translate-y-5
                            -translate-x-5
                        '
                    onClick={handleClose}
                >
                    <IoMdClose />
                </button>
                <div className='
                        text-center
                        text-lg
                        font-semibold
                        border-b-2
                        border-gray-100
                        -translate-y-2
                    '>
                    {title}</div>
                <div className='-translate-y-1'>{body}</div>
                <div className='flex flex-row justify-evenly'>
                    {secondaryAction && secondaryActionLabel && (
                        <Button
                            label={secondaryActionLabel}
                            onClick={secondaryAction}
                            type='red'
                        />
                    )}
                    <Button
                        label={actionLabel}
                        onClick={handleSubmit}
                        type='slate'
                    />
                </div>
                <div className='border-t-2 translate-y-4 border-gray-100'>{footer}</div>
            </div>
        </div>
    )
}

export default Modal