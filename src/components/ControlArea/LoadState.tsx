import React from 'react'

interface LoadStateProps {
    setShowLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoadState:React.FC<LoadStateProps> = ({ setShowLoader }) => {
    const handleClick = () => {
        setShowLoader(true)
    }
    
    return (
        <button
            className="border-2 py-1 px-2 rounded-md shadow-sm"
            onClick={handleClick}>   
            Load
        </button>
    )
}

export default LoadState