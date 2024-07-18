import React, { useState } from 'react'
import Dropdown from './Dropdown';
import { ChangePaddlerStatus } from './Boat';
import SeatingDelete from './SeatingDelete';

interface SeatingProps{
    rowNum: number;
    position:string;
    changePaddlerStatus: ChangePaddlerStatus;
    resetSeat: ChangePaddlerStatus;
}

export type SeatSelectionType = (paddlerName: string, row: number, pos: string) => void;
export type SeatSelectionStatusType = { paddlerName: string, row: number, pos:string}


const Seating:React.FC<SeatingProps> = ({ rowNum, position, changePaddlerStatus, resetSeat }) => {
    const [selectedPaddlerInfo, setSelectedPaddlerInfo] = useState<SeatSelectionStatusType>({ paddlerName: "", row: -1 , pos: ""});

    const editSeatSelection: SeatSelectionType = (paddlerName, row, pos) => {
        // updates the local state 'selectedPaddlerInfo'
        setSelectedPaddlerInfo({...selectedPaddlerInfo, paddlerName: paddlerName, row: row , pos: pos})
    }

    const deleteSeatSelection: SeatSelectionType = (paddlerName, row, pos) => {
        resetSeat(paddlerName, row, pos)
        setSelectedPaddlerInfo({...selectedPaddlerInfo, paddlerName: "", row: row , pos: pos})
    }

    return (
        <>
            <div className="border-2 border-gray-300 rounded-md flex flex-row items-center ">
                <div className="w-[20%] flex justify-center items-center">
                    <SeatingDelete 
                        rowNum={ rowNum }
                        position={ position } 
                        deleteSeatSelection={ deleteSeatSelection } />
                </div>
                <div className="w-[80%]">
                    <Dropdown 
                        rowNum={ rowNum }
                        position={ position } 
                        changePaddlerStatus={ changePaddlerStatus } 
                        editSeatSelection={ editSeatSelection }
                        selectedPaddlerInfo={ selectedPaddlerInfo } />
                </div>

            </div>
        </>
    )
}

export default Seating