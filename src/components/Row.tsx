import React from 'react'
import Seating from './Seating'

interface RowProp {
    rowNum: number;
}

const Row:React.FC<RowProp> = ({ rowNum }) => {
    return (
        <>
            <div className="grid grid-cols-11 ">
                <div className="col-span-5">    
                    <Seating 
                        rowNum={ rowNum }
                        position={"left"} />
                </div>
                <div className="col-span-1">
                    {rowNum}
                </div>
                <div className="col-span-5">
                    <Seating 
                        rowNum={ rowNum }
                        position={"right"}  />
                </div>
            </div>
        </>
    )
}

export default Row
