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
    const handleOpenMenu = () => {
    //
    }
    
    
    const handleKeyDown = (evt: React.KeyboardEvent<HTMLDivElement>) => {
        if (evt.key === "Enter"){
            console.log("open")
            handleOpenMenu()
        }
    }

    return (
        <>
            <div
                tabIndex={0} 
                onKeyDown={handleKeyDown}
                className=" flex flex-row items-center ">
                <DropdownCustom 
                    rowNum={ rowNum }
                    position={ position } 
                    />
            </div>
        </>
    )
}

export default Seating
