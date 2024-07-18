import React, { useState, useEffect } from 'react'
import { paddlerDataStore, usePaddlerDataStore, Paddler } from '../lib/store'
import Row from './Row';


export interface Selection {
    name: string | null;
    row: number | null;
    boat_pos: string | null;
    weight: number | null;
}

export interface ChangePaddlerStatus {
    (
        paddlerName: string,
        newRow?: number, 
        newBoatPos?: string
    ): void;
}

const Boat:React.FC = () => {
    const { activeRosterState, setRosterState }:paddlerDataStore = usePaddlerDataStore()
    const [ paddlerSelection, setPaddlerSelection ] = useState<Selection[]>([])

    const rows = Array.from({ length: 10 }, (_, i) => i + 1 );

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
        const updatedSelection = activeRosterState
            .filter((item) => item.row == -1)
            .map((item) => ({
                name: item.name ?? null,
                row: item.row ?? null,
                boat_pos: item.boat_pos ?? null,
                weight: item.weight ?? null
            }))

        setPaddlerSelection(updatedSelection)
    }, [])

    return (
        <>
            <div>
                <div className="relative w-[300px] h-[70px]">
                    <div className="-z-10 absolute inset-0 border-l-[100px] border-l-transparent border-r-[100px] border-r-transparent border-b-[70px] border-b-red-50 rounded-t-[20px]">
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex justify-center ">
                        <div>drummer</div>
                    </div>
                </div>
                <div className="w-[300px] h-[400px] bg-red-50 ">
                    <div className="flex flex-col justify-between h-full">
                    {
                        rows.map((r, idx) => (
                            <Row 
                                key={idx} 
                                rowNum={r} 
                                paddlerSelection={ paddlerSelection } 
                                changePaddlerStatus={ changePaddlerStatus }/>
                        ))
                    }
                    </div>
                </div>
                <div className="-z-10 relative w-[300px] h-[70px]">
                    <div className="absolute inset-0 border-l-[100px] border-l-transparent border-r-[100px] border-r-transparent border-t-[70px] border-t-red-50 ">
                    </div>
                    <div className="absolute inset-x-0 top-0 flex justify-center ">
                        <div>stern</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Boat