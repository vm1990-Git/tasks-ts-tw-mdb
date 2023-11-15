'use client'

type ButtonProps = {
    label: string
    onClick: () => void
    type: 'red' | 'slate'
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    type

}) => {

    return (
        <div
            className={`
                    border-gray-200
                    rounded-lg
                    w-24
                    text-white
                    text-center
                    ${type == 'red' ? 'hover:bg-rose-500' : 'hover:bg-slate-500'}
                    ${type == 'slate' ? ' bg-slate-400' : 'bg-rose-400'}
                    cursor-pointer
                `}
            onClick={onClick}>{label}
        </div>
    )
}

export default Button