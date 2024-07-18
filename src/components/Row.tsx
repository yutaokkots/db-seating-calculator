import React from 'react'
import Seating from './Seating'
import { Selection, ChangePaddlerStatus } from './Boat';

interface RowProp {
    rowNum: number;
    paddlerSelection: Selection[];
    changePaddlerStatus: ChangePaddlerStatus
}

const Row:React.FC<RowProp> = ({ rowNum, paddlerSelection, changePaddlerStatus }) => {
    return (
        <>
            <div className="grid grid-cols-11">
                <div className="col-span-5">    
                    <Seating 
                        rowNum={ rowNum }
                        position={"left"} 
                        paddlerSelection={ paddlerSelection }
                        changePaddlerStatus={ changePaddlerStatus } />
                </div>
                <div className="col-span-1">
                    {rowNum}
                </div>
                <div className="col-span-5">
                    <Seating 
                        rowNum={ rowNum }
                        position={"right"} 
                        paddlerSelection = { paddlerSelection }
                        changePaddlerStatus={ changePaddlerStatus } />
                </div>
            </div>
        </>
    )
}

export default Row