import React from 'react'
import { ChangePaddlerStatus } from './Boat';
import { paddlerDataStore, usePaddlerDataStore } from '../lib/store'
import { SeatSelectionType } from './Seating';
import { SeatSelectionStatusType } from './Seating'

interface DropdownProps{
    rowNum: number;
    position:string;
    changePaddlerStatus: ChangePaddlerStatus;
    editSeatSelection: SeatSelectionType;
    selectedPaddlerInfo: SeatSelectionStatusType;
}

const Dropdown:React.FC<DropdownProps> = ({ rowNum, position, changePaddlerStatus, editSeatSelection, selectedPaddlerInfo }) => {
    const { activeRosterState }:paddlerDataStore = usePaddlerDataStore()

    const handleDropdown = (evt: React.ChangeEvent<HTMLSelectElement>): void => {
        const selectedPaddler = evt.target.value
        changePaddlerStatus(selectedPaddler, rowNum, position)
        editSeatSelection(selectedPaddler, rowNum, position)
    }

    return (
        <>
            <select
                className="w-full p-1 rounded-md"
                value={selectedPaddlerInfo.paddlerName}
                onChange={handleDropdown} >
                <option >- -</option> 
                    {activeRosterState.map((paddlerInfo, idx) => (
                        <option 
                            key={ idx }
                            value={paddlerInfo.name ?? ""}
                            disabled={paddlerInfo.row ? paddlerInfo.row > -1  : false} >
                                {paddlerInfo.name} ({paddlerInfo.weight})
                        </option>
                    ))
                    }
            </select>
        </> 
    )
}

export default Dropdown