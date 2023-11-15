import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

type InputProps = {
    id: string;
    label: string;
    type?: string;
    disabled: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    big?: boolean
};

const Input: React.FC<InputProps> = ({
    id,
    label,
    type,
    disabled,
    required,
    register,
    errors,
    big
}) => {
    return (
        <>{
            big ? (
                <textarea
                    id={id}
                    disabled={disabled}
                    {...register(id, { required: required })}
                    className={`
                        border-2
                        rounded-lg
                        bg-slate-50
                        px-1
                        hover:border-gray-300
                        placeholder:translate-x-1
                        h-28
                        text-sm
                        overflow-y-scroll
                        scrollbar-thin
                        scrollbar-track-gray-300
                        scrollbar-thumb-gray-400
                        resize-none
                    `}
                    placeholder={label}
                />
            ) : (
                <input
                    id={id}
                    disabled={disabled}
                    {...register(id, { required: required })}
                    className={`
                    border-2
                    rounded-lg
                    px-1
                    hover:border-gray-300
                    placeholder:translate-x-1
                    ${errors[id] ? 'bg-rose-200' : 'bg-slate-50'}
                `}
                    type={type}
                    placeholder={label}
                />
            )
        }
        </>
    );
};

export default Input;
