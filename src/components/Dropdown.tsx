import React, { useState, useEffect } from 'react'
import { Selection, ChangePaddlerStatus } from './Boat';
import { paddlerDataStore, usePaddlerDataStore, Paddler } from '../lib/store'


interface DropdownProps{
    rowNum: number;
    position:string;
    paddlerSelection: Selection[];
    changePaddlerStatus: ChangePaddlerStatus;
}

const Dropdown:React.FC<DropdownProps> = ({ rowNum, position, paddlerSelection, changePaddlerStatus }) => {
    const { activeRosterState }:paddlerDataStore = usePaddlerDataStore()
    //const [selectedPaddler, setSelectedPaddler] = useState<string>("");

    const handleDropdown = (evt: React.ChangeEvent<HTMLSelectElement>): void => {
        const selectedPaddler = evt.target.value
        changePaddlerStatus(selectedPaddler, rowNum, position)

    }

    const updateDropdown = () => {

    }


    useEffect(() => {

        // setSelectedPaddler()
        
    }, [activeRosterState])


    return (
        <>
            <select
                className="w-full p-1 rounded-md"
                onChange={handleDropdown}
                >
                <option >Select</option>
                
                {activeRosterState.map((paddlerInfo, idx) => (

                    <option 
                        key={ idx }
                        name={paddlerInfo.name ?? ""}
                        value={paddlerInfo.name ?? ""}
                        disabled={paddlerInfo.row > -1}
                        >
                        {paddlerInfo.name} ({paddlerInfo.weight})
                    </option>
                ))
                }
            </select>
        </> 
    )
}

export default Dropdown