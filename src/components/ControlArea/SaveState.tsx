import React from 'react'

interface SaveStateProps {
    setShowSaver: React.Dispatch<React.SetStateAction<boolean>>;
}

const SaveState:React.FC<SaveStateProps> = ({ setShowSaver }) => {
    const handleClick = () => {
        setShowSaver(true)
    }

    return (
        <>
            <button
                className="border-2 bg-slate-100 py-1 px-2 rounded-md shadow-sm"
                onClick={handleClick}>   
                Save    
            </button>
        </>
    )
}

export default SaveState