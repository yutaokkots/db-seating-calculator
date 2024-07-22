import React from 'react'
import DropdownCustom from './assets/DropdownCustom';

export type SeatSelectionType = (
    paddlerName: string, 
    row?: number, 
    pos?: string) 
        => void;
    
export type SeatSelectionStatusType = { selected: string } 

interface SeatingProps{
    rowNum: number;
    position: string; // "drum", "stern", "left", "right"
}

const Seating:React.FC<SeatingProps> = ({ rowNum, position }) => {
    return (
        <>
            <div className=" flex flex-row items-center">
                <DropdownCustom 
                    rowNum={ rowNum }
                    position={ position } 
                    />
            </div>
        </>
    )
}

export default Seating
