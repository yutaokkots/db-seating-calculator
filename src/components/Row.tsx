import React from 'react'
import Seating from './Seating'
import { ChangePaddlerStatus } from './Boat';

interface RowProp {
    rowNum: number;
    changePaddlerStatus: ChangePaddlerStatus;
    resetSeat: ChangePaddlerStatus;
}

const Row:React.FC<RowProp> = ({ rowNum, changePaddlerStatus, resetSeat }) => {
    return (
        <>
            <div className="grid grid-cols-11 ">
                <div className="col-span-5">    
                    <Seating 
                        rowNum={ rowNum }
                        position={"left"} 
                        changePaddlerStatus={ changePaddlerStatus } 
                        resetSeat={  resetSeat } />
                </div>
                <div className="col-span-1">
                    {rowNum}
                </div>
                <div className="col-span-5">
                    <Seating 
                        rowNum={ rowNum }
                        position={"right"} 
                        changePaddlerStatus={ changePaddlerStatus }
                        resetSeat={  resetSeat } />
                </div>
            </div>
        </>
    )
}

export default Row
