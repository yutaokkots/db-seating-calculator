import React from 'react'

const SaveState:React.FC = () => {
    const handleClick = () => {
        // save current activeRosterState
    }
    return (
        <>
            <button
                className="border-2 py-1 px-2 rounded-md"
                onClick={handleClick}>   
                Save    
            </button>
        </>
    )
}

export default SaveState