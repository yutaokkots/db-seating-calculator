import React, { useState, useEffect } from 'react'
import { paddlerDataStore, usePaddlerDataStore } from '../lib/store'
import Boat from './Boat'
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
    const [leftStrength, setLeftStrength] = useState<number>(0);
    const [rightStrength, setRightStrength] = useState<number>(0);
    const [frontStrength, setFrontStrength] = useState<number>(0);
    const [backStrength, setBackStrength] = useState<number>(0);
    const [drumSternWeight, setDrumSternWeight] = useState<number>(0);

    useEffect(() => {
        // Following calculates the weights/strength of paddlers for left, right, front, and back of boat.
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

        const leftStr = activeRosterState
            .filter((paddler) => 
                paddler.row 
                && paddler.row > 0
                && paddler.row < 11
                && paddler.boat_pos 
                && paddler.boat_pos == "left")
            .reduce((sum, paddler) => sum + paddler.adj_perg_500_sec, 0);

        const rightStr = activeRosterState
            .filter((paddler) => 
                paddler.row 
                && paddler.row > 0 
                && paddler.row < 11
                && paddler.boat_pos 
                && paddler.boat_pos == "right")
            .reduce((sum, paddler) => sum + paddler.adj_perg_500_sec, 0);

        const frontStr = activeRosterState
            .filter((paddler) => 
                paddler.row 
                && paddler.row > 0 
                && paddler.row < 6)
            .reduce((sum, paddler) => sum + paddler.adj_perg_500_sec, 0);

        const backStr = activeRosterState
            .filter((paddler) => 
                paddler.row 
                && paddler.row > 5 
                && paddler.row < 11)
            .reduce((sum, paddler) => sum + paddler.adj_perg_500_sec, 0);

        setLeftWeight(left)
        setRightWeight(right)
        setFrontWeight(front)
        setBackWeight(back)
        setLeftStrength(leftStr)
        setRightStrength(rightStr)
        setFrontStrength(frontStr)
        setBackStrength(backStr)
        setDrumSternWeight(drumStern)
    }, [activeRosterState])

    return (
        <>
            <div className="flex flex-col border-2 pb-1 pt-1 border-[#113758] bg-[#113758] rounded-xl w-[370px] sm:w-[500px] md:w-[600px] justify-center">
                <div className="m-2 flex justify-between items-center  border-2 bg-slate-50 rounded-lg p-2">
                    <div>
                        <div className="bg-slate-200 rounded-md p-1 w-[75px] sm:w-[130px] ">
                            <div>
                                {windowSize.width >= 640 ?  "Port/Left" : "L"} 
                            </div>
                            <div className="bg-white rounded-sm p-1">
                                <div>
                                    {leftWeight + (drumSternWeight / 2)} lbs
                                </div>
                                { leftStrength > 0 && 
                                    <div>
                                    {leftStrength} units
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="bg-slate-200 rounded-md p-1 w-[75px] sm:w-[130px] ">
                            <div>
                                {windowSize.width >= 640 ?  "Front" : "F"} 
                            </div>
                            <div className="bg-white rounded-sm p-1">
                                <div>
                                    {frontWeight} lbs
                                </div>
                                { rightStrength > 0 && 
                                    <div>
                                        {frontStrength} units
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="bg-slate-200 rounded-md p-1 w-[75px] sm:w-[130px] ">
                            <div>
                                {windowSize.width >= 640 ?  "Back" : "B"} 
                            </div>
                            <div className="bg-white rounded-sm p-1">
                                <div>    
                                    {backWeight} lbs
                                </div>
                                { backStrength > 0 && 
                                    <div>
                                        {backStrength} units
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="bg-slate-200 rounded-md p-1 w-[75px] sm:w-[130px] ">
                            <div>
                                {windowSize.width >= 640 ?  "Starboard/Right" : "R"}
                            </div>
                            <div className="bg-white rounded-sm p-1">
                                <div>
                                    {rightWeight + (drumSternWeight / 2)} lbs
                                </div>
                                { rightStrength > 0 && 
                                    <div>
                                        {rightStrength} units
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex p-1 justify-evenly ">
                    <div className="w-[300px] sm:w-[300px] md:w-[300px] flex justify-center">
                        <Boat/>
                    </div>
                    {windowSize.width >= 640 && 
                        <div className="w-[95px] sm:w-[140px] md:w-[250px] border-2 rounded-md border-gray-100 p-2 bg-white">
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
