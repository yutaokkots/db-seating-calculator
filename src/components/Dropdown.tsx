import React, { useState, useEffect } from 'react'
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
    const [ drummerTrue, setDrummerTrue ] = useState<boolean>(false);
    const [ sternTrue, setSternTrue ] = useState<boolean>(false);
    const [ paddlerTrue, setPaddlerTrue ] = useState<boolean>(false);
    useEffect(()=>{

        if (position == "drum"){
            setDrummerTrue(true)
        }
        if (position == "stern"){
            setSternTrue(true)
        }
        if (position == "left" || position=="right"){
            setPaddlerTrue(true)
        }
    },[])

    /// I want disabled to be true if
    //  the component has drummerTrue=true
    // and 
    // paddlerInfo.drummer == false <= means this paddler is not a drummer


    // || !(paddlerInfo.drummer && drummerTrue) 
    //                             || !(paddlerInfo.stern && sternTrue)

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
                            disabled={!!(paddlerInfo.row && paddlerInfo.row > -1)
                                || drummerTrue && paddlerInfo.drummer == false
                                || sternTrue && paddlerInfo.stern == false
                                || paddlerTrue && !(paddlerInfo.engine || paddlerInfo.rocket  || paddlerInfo.pacer || paddlerInfo.stroke )
                            }>
                                {paddlerInfo.name} ({paddlerInfo.weight}) 
                        </option>
                    ))
                    }
            </select>
        </> 
    )
}

export default Dropdown