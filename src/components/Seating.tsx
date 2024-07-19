import React, { useState, useEffect } from 'react'
import Dropdown from './Dropdown';
import { ChangePaddlerStatus } from './Boat';
//import SeatingDelete from './SeatingDelete';
import { Paddler } from '../lib/store';

interface SeatingProps{
    rowNum: number;
    position:string;
    changePaddlerStatus: ChangePaddlerStatus;
    resetSeat: ChangePaddlerStatus;
}

export type SeatSelectionType = (paddlerName: string, row?: number, pos?: string) => void;
export type SeatSelectionStatusType = { selected: string } 

const Seating:React.FC<SeatingProps> = ({ rowNum, position, changePaddlerStatus, resetSeat }) => {
    const [dropdownPaddlerList, setDropDownPaddlerList] = useState<Paddler[]>([]);
    const [selected, setSelected] = useState<string>("");

    const editSeatSelection: SeatSelectionType = (paddlerName) => {
        // updates the local state 'selectedPaddlerInfo'
        //setSelectedPaddlerInfo({...selectedPaddlerInfo })
        setSelected(paddlerName)
    }

    const deleteSeatSelection: SeatSelectionType = (paddlerName, row, pos) => {
        resetSeat(paddlerName, row, pos)
        //setSelectedPaddlerInfo( {...selectedPaddlerInfo})
        setSelected(paddlerName)
    }

    const handleDelete = () => {
        deleteSeatSelection("", rowNum, position)
    }

    // useEffect(()=>{
    //     console.log(selectedPaddlerInfo)
    // },[selectedPaddlerInfo])

    return (
        <>
            <div className="border-2 border-gray-300 rounded-md flex flex-row items-center">
                <div className='w-[20%]'>

                    <div className="flex justify-center items-center">
                        <button 
                            onClick={handleDelete}
                            className="rounded-sm bg-red-300">
                            <div className="flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </div>  
                        </button>
                        {/* <SeatingDelete 
                            rowNum={ rowNum }
                            position={ position } 
                        deleteSeatSelection={ deleteSeatSelection } /> */}
                    </div>
                </div>

                <div className="w-[80%]">
                    <div>
                        <Dropdown 
                            rowNum={ rowNum }
                            position={ position } 
                            changePaddlerStatus={ changePaddlerStatus } 
                            editSeatSelection={ editSeatSelection }
                            dropdownPaddlerList={ dropdownPaddlerList } 
                            setDropDownPaddlerList={ setDropDownPaddlerList }
                            selected={ selected }
                            />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Seating
