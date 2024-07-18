import React, { useState, useEffect } from 'react'
import Boat from './Boat'
import { paddlerDataStore, usePaddlerDataStore } from '../lib/store'
import RosterItem from './RosterItem';

interface BoatInterfaceProps {
    windowSize: WindowSize;
}

interface WindowSize{
    width: number;
    height: number;
}

const BoatInterface:React.FC<BoatInterfaceProps> = ({ windowSize }) => {
    const { activeRosterState }:paddlerDataStore = usePaddlerDataStore()
    const [leftWeight, setLeftWeight] = useState<number>(0);
    const [rightWeight, setRightWeight] = useState<number>(0);
    const [frontWeight, setFrontWeight] = useState<number>(0);
    const [backWeight, setBackWeight] = useState<number>(0);
    const [drumSternWeight, setDrumSternWeight] = useState<number>(0);

    useEffect(() => {
        const left = activeRosterState
            .filter((paddler) => 
                paddler.row 
                && paddler.row > -1 
                && paddler.boat_pos 
                && paddler.boat_pos == "left")
            .reduce((sum, paddler) => sum + paddler.weight, 0);

        const right = activeRosterState
            .filter((paddler) => 
                paddler.row 
                && paddler.row > -1 
                && paddler.boat_pos 
                && paddler.boat_pos == "right")
            .reduce((sum, paddler) => sum + paddler.weight, 0);

        const front = activeRosterState
            .filter((paddler) => 
                paddler.row 
                && paddler.row > -1 
                && paddler.row < 6
                || paddler.row 
                && paddler.row == 15)
            .reduce((sum, paddler) => sum + paddler.weight, 0);

        const back = activeRosterState
            .filter((paddler) => 
                paddler.row 
                && paddler.row > 5 
                && paddler.row < 12)
            .reduce((sum, paddler) => sum + paddler.weight, 0);

        const drumStern = activeRosterState
            .filter((paddler) => 
                paddler.row
                && paddler.row == 15
                || paddler.row == 11)
            .reduce((sum, paddler) => sum + paddler.weight, 0)

        setLeftWeight(left)
        setRightWeight(right)
        setFrontWeight(front)
        setBackWeight(back)
        setDrumSternWeight(drumStern)


    }, [activeRosterState])


    return (
        <>
            <div className="flex flex-col border-2 pb-1 pt-1 border-black rounded-md w-[370px] sm:w-[500px] md:w-[600px] justify-center">
                <div className="m-2 flex justify-between items-center border-2 rounded-lg p-2">
                    <div>
                        <div className="bg-slate-200 rounded-md p-1">
                            <div>
                                {windowSize.width >= 640 ?  "Port/Left" : "L"} 
                            </div>
                            <div className="bg-white rounded-sm p-1">
                                {leftWeight + (drumSternWeight / 2)} lbs
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="bg-slate-200 rounded-md p-1">
                            <div>
                                {windowSize.width >= 640 ?  "Front" : "F"} 
                            </div>
                            <div className="bg-white rounded-sm p-1">
                                {frontWeight} lbs
                            </div>
                        </div>
                        <div className="bg-slate-200 rounded-md p-1">
                            <div>
                                {windowSize.width >= 640 ?  "Back" : "B"} 
                            </div>
                            <div className="bg-white rounded-sm p-1">
                                {backWeight} lbs
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="bg-slate-200 rounded-md p-1">
                            <div>
                                {windowSize.width >= 640 ?  "Starboard/Right" : "R"}
                            </div>
                            <div className="bg-white rounded-sm p-1">
                                {rightWeight + (drumSternWeight / 2)} lbs
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex p-1 justify-evenly ">
                    <div className="w-[300px] sm:w-[300px] md:w-[300px] flex justify-center">
                        <Boat/>
                    </div>
                    {windowSize.width >= 640 && 
                        <div className="w-[95px] sm:w-[140px] md:w-[250px] border-2 border-gray-100 ">
                            <div>Roster</div>
                            <div className="text-left">
                            { activeRosterState.length == 0 
                                ? 
                                (
                                    <div></div>
                                )
                                :
                                ( 
                                    activeRosterState.map((p, idx) => (
                                        <RosterItem key={idx} paddler={p}/>  
                                    ))
                                )
                            }
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default BoatInterface