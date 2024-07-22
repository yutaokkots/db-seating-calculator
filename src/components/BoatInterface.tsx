import React, { useState, useEffect } from 'react'
import { paddlerDataStore, usePaddlerDataStore } from '../lib/store'
import Boat from './Boat'
import Roster from './Roster';
import WeightAnalysis from './WeightAnalysis';
import { WindowSize } from '../common/types';

interface BoatInterfaceProps {
    windowSize: WindowSize;
}

const BoatInterface:React.FC<BoatInterfaceProps> = ({ windowSize }) => {
    const { activeRosterState }:paddlerDataStore = usePaddlerDataStore()
    const [leftWeight, setLeftWeight] = useState<number>(0);
    const [rightWeight, setRightWeight] = useState<number>(0);
    const [frontWeight, setFrontWeight] = useState<number>(0);
    const [backWeight, setBackWeight] = useState<number>(0);
    const [totalWeight, setTotalWeight] = useState<number>(0);
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
                && paddler.boat_pos == 1)
            .reduce((sum, paddler) => sum + paddler.weight, 0);

        const right = activeRosterState
            .filter((paddler) => 
                paddler.row 
                && paddler.row > -1 
                && paddler.boat_pos 
                && paddler.boat_pos == 2)
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
        
        const total = activeRosterState
            .filter((paddler) => 
                paddler.row 
                && paddler.row > 0)
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
                && paddler.boat_pos == 1)
            .reduce((sum, paddler) => sum + paddler.adj_perg_500_sec, 0);

        const rightStr = activeRosterState
            .filter((paddler) => 
                paddler.row 
                && paddler.row > 0 
                && paddler.row < 11
                && paddler.boat_pos 
                && paddler.boat_pos == 2)
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
        setTotalWeight(total)
        setLeftStrength(leftStr)
        setRightStrength(rightStr)
        setFrontStrength(frontStr)
        setBackStrength(backStr)
        setDrumSternWeight(drumStern)
    }, [activeRosterState])

    return (
        <>
            <div className="flex flex-col border-2 pb-1 pt-1 border-[#113758] bg-[#113758] rounded-xl w-[370px] sm:w-[500px] md:w-[600px] justify-center">
                <WeightAnalysis 
                    windowSize={windowSize}
                    leftWeight={leftWeight}
                    rightWeight={rightWeight}
                    frontWeight={frontWeight}
                    backWeight={backWeight}
                    totalWeight={totalWeight}
                    leftStrength={leftStrength}
                    rightStrength={rightStrength}
                    frontStrength={frontStrength}
                    backStrength={backStrength}
                    drumSternWeight={drumSternWeight}
                    />
                <div className="flex  justify-evenly ">
                    <div className="w-[350px] sm:w-[350px] md:w-[350px] flex justify-evenly">
                        <Boat/>
                    </div>
                    {windowSize.width >= 640 && 
                        <div className="w-[95px] sm:w-[120px] md:w-[200px] h-[540px] ">
                            <Roster 
                                windowSize={windowSize}/>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default BoatInterface
