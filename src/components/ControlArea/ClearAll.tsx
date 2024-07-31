import React, { useState } from 'react'
import { 
    paddlerDataStore, usePaddlerDataStore,
    useBoatStore, BoatStore  
    } from '../../lib/store'

const ClearAll:React.FC = () => {
    const { activeRosterState,  setRosterState, toggleClear }:paddlerDataStore = usePaddlerDataStore()
    const [ deleteConfirm, setDeleteConfirm ] = useState<boolean>(false);
    const { clearBoatState }:BoatStore = useBoatStore();

    const clearAllData = () => {
        const updatedRosterState = activeRosterState.map((paddler) => ({
            ...paddler,
            row:-1,
            boat_pos: -1
        }))
        setRosterState(updatedRosterState)
        clearBoatState()
    }
    
    const handleClickDelete = () => {
        setDeleteConfirm(true)
    }
    
    const handleClickConfirm = () => {
        // clears local states (dropdown, roster) related to paddlers
        toggleClear(1)
        // clears global states related to paddlers
        toggleClear(0)
        clearAllData()
        setDeleteConfirm(false)
    }
    const handleClickCancel = () => {
        setDeleteConfirm(false)
    }

    return (
        <>
            { !deleteConfirm &&
            <button
                className="border-2 py-1 px-2 rounded-md shadow-sm"
                onClick={handleClickDelete}>   
                Clear All     
            </button>
            }
            { deleteConfirm &&
                <>
                    <button
                        className="border-2 py-1 px-2 rounded-md bg-red-500 text-white shadow-sm"
                        onClick={handleClickConfirm}>   
                        Clear All     
                    </button>
                    <button
                        onClick={handleClickCancel }
                        className="border-2 py-1 px-2 rounded-md shadow-sm">
                        Cancel
                    </button>
                </>
            }
        </>
    )
}

export default ClearAll