import React, { useState, useEffect } from 'react'
import { paddlerDataStore, usePaddlerDataStore } from '../lib/store'
import Row from './Row';
import Seating from './Seating';

export interface ChangePaddlerStatus {
    (
        paddlerName: string,
        newRow?: number, 
        newBoatPos?: string
    ): void;
}

const Boat:React.FC = () => {
    const { setRosterState }:paddlerDataStore = usePaddlerDataStore()

    const rows = Array.from({ length: 10 }, (_, i) => i + 1 );

    // resetSeat() clears the particular seat in the Roster in the global state.
    const resetSeat: ChangePaddlerStatus = (
        paddlerName,
        newRow = -1,
        newBoatPos = "none",
    ) => {
        setRosterState(prevSelection => 
            prevSelection.map(paddler => 
                paddler.name == paddlerName
                    ? {...paddler, row: -1, boat_pos: "none"}
                    : paddler
            )
        )
        setRosterState(prevSelection => 
            prevSelection.map(paddler => 
                paddler.row == newRow && paddler.boat_pos == newBoatPos
                    ? {...paddler, row: -1, boat_pos: "none"}
                    : paddler
            )
        )
    }

    // changePaddlerStatus() makes a change to the global state for the Roster.
    const changePaddlerStatus: ChangePaddlerStatus = (
            paddlerName,
            newRow = -1,
            newBoatPos = "none",
        ) => {
            resetSeat(paddlerName, newRow, newBoatPos)

            setRosterState(prevSelection => 
                prevSelection.map(paddler => 
                    paddler.name == paddlerName 
                        ? {...paddler, row: newRow, boat_pos: newBoatPos}
                        : paddler
                )
            )
        }
    
    useEffect(() => {

    }, [])

    return (
        <>
            <div>
                <div className="relative w-[300px] h-[70px]">
                    <div className="absolute inset-0 border-l-[100px] border-l-transparent border-r-[100px] border-r-transparent border-b-[70px] border-b-red-50 rounded-t-[20px]">
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex justify-center ">
                        <div className="flex flex-col w-[50%] mb-2">                       
                            <div>drummer</div>
                            <div>
                                <Seating 
                                    rowNum={ 15 }
                                    position={"drum"} 
                                    changePaddlerStatus={ changePaddlerStatus } 
                                    resetSeat={  resetSeat } />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[300px] h-[400px] bg-red-50 ">
                    <div className="flex flex-col justify-between h-full">
                    {
                        rows.map((r, idx) => (
                            <Row 
                                key={idx} 
                                rowNum={r} 
                                changePaddlerStatus={ changePaddlerStatus }
                                resetSeat={  resetSeat }/>
                        ))
                    }
                    </div>
                </div>
                <div className="relative w-[300px] h-[70px]">
                    <div className="absolute inset-0 border-l-[100px] border-l-transparent border-r-[100px] border-r-transparent border-t-[70px] border-t-red-50 ">
                    </div>
                    <div className="absolute inset-x-0 top-0 flex justify-center ">
                        <div className="flex flex-col w-[50%] mt-2">                       
                            <div>
                                <Seating 
                                    rowNum={ 11 }
                                    position={"stern"} 
                                    changePaddlerStatus={ changePaddlerStatus } 
                                    resetSeat={  resetSeat } />
                            </div>
                            <div>stern</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Boat