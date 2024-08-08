import React from 'react'

interface WrapperProps {
    onClick: () => void;
    disabled: boolean;
    children: React.ReactNode;
}

const SeatingWrapper:React.FC<WrapperProps> = ({
        onClick,
        disabled,
        children 
    }) => {
    return (
        <>
            <button
                onClick={onClick}
                disabled={disabled}
                className="w-full"
                >
                <div className={`${disabled? "pointer-events-none opacity-80":""}`}>
                    {children}
                </div>
            </button>
        </>
    )
}

export default SeatingWrapper