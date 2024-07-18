import React from 'react'
import Dropdown from './Dropdown';
import { Selection, ChangePaddlerStatus } from './Boat';
import SeatingDelete from './SeatingDelete';

interface SeatingProps{
    rowNum: number;
    position:string;
    paddlerSelection: Selection[];
    changePaddlerStatus: ChangePaddlerStatus;
}

const Seating:React.FC<SeatingProps> = ({ rowNum, position, paddlerSelection, changePaddlerStatus }) => {
    return (
        <>
            <div className="border-2 border-gray-300 rounded-md flex flex-row items-center ">
                <div className="w-[20%] flex justify-center items-center">
                    <SeatingDelete />
                </div>
                <div className="w-[80%]">
                    <Dropdown 
                        rowNum={ rowNum }
                        position={ position } 
                        paddlerSelection={ paddlerSelection }
                        changePaddlerStatus={ changePaddlerStatus } />
                </div>

            </div>
        </>
    )
}

export default Seating