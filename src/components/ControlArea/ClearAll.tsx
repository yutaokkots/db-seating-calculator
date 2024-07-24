import React from 'react'
import { paddlerDataStore, usePaddlerDataStore } from '../../lib/store'

const ClearAll:React.FC = () => {
    const { activeRosterState,  setRosterState, toggleClear }:paddlerDataStore = usePaddlerDataStore()

    const clearAllData = () => {
        const updatedRosterState = activeRosterState.map((paddler) => ({
            ...paddler,
            row:-1,
            boat_pos: -1
        }))
        setRosterState(updatedRosterState)
    }

    const handleClick = () => {
        // clears local states (dropdown, roster) related to paddlers
        toggleClear(1)
        // clears global states related to paddlers
        toggleClear(0)
        clearAllData()
    }

    return (
        <>
            <button
                className="border-2 py-1 px-2 rounded-md"
                onClick={handleClick}>   
                Clear All     
            </button>
        </>
    )
}

export default ClearAll