import React from 'react'


interface SaveStateProps {
    setShowShare: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShareState:React.FC<SaveStateProps> = ({setShowShare}) => {
    const handleClick = () => {
        setShowShare(true)
    }
    return (
        <button
            className="border-2 py-1 px-2 rounded-md shadow-sm"
            onClick={handleClick}>   
            Data
        </button>
    )
}

export default ShareState