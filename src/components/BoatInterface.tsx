import React, { useState, useEffect } from 'react'
import { paddlerDataStore, usePaddlerDataStore } from '../lib/store'
import Roster from './Roster';
import WeightAnalysis from './WeightAnalysis';
import { WindowSize } from '../common/types';
import ControlArea from './ControlArea/ControlArea';
import BoatDisplay from './BoatDisplay';

/** 
 * Boat interface contains the main portions of the app. 
 * WeightAnalysis - displays paddler information.
 * ControlArea - allows user to save, clear, and load data.
 * Boat - interface for entering and deleting paddlers from the boat.
 * Roster - secondary display for paddler information in list form.
*/

interface BoatInterfaceProps {
    windowSize: WindowSize;
}

export type BoatWeight = {
    "d": number;
    "1": RowWeight;
    "2": RowWeight;
    "3": RowWeight;
    "4": RowWeight;
    "5": RowWeight;
    "6": RowWeight;
    "7": RowWeight;
    "8": RowWeight;
    "9": RowWeight;
    "10": RowWeight;
    "s": number;
}

type RowWeight = {
    "left": number;
    "right": number;
    "diff":number;
}

const defaultBoatWeight = {
    "d":  0,
    "1":  {"left": 0, "right": 0, "diff": 0},
    "2":  {"left": 0, "right": 0, "diff": 0},
    "3":  {"left": 0, "right": 0, "diff": 0},
    "4":  {"left": 0, "right": 0, "diff": 0},
    "5":  {"left": 0, "right": 0, "diff": 0},
    "6":  {"left": 0, "right": 0, "diff": 0},
    "7":  {"left": 0, "right": 0, "diff": 0},
    "8":  {"left": 0, "right": 0, "diff": 0},
    "9":  {"left": 0, "right": 0, "diff": 0},
    "10": {"left": 0, "right": 0, "diff": 0},
    "s":  0
    }

const BoatInterface:React.FC<BoatInterfaceProps> = ({ windowSize }) => {
    const { activeRosterState }:paddlerDataStore = usePaddlerDataStore()
    // Weights
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
    // Weights by Row
    const [boatWeight, setBoatWeight] = useState<BoatWeight>(defaultBoatWeight);


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

        const filteredLeftPaddlers = activeRosterState
            .filter((paddler) => 
                paddler.row 
                && paddler.row > 0
                && paddler.row < 11
                && paddler.boat_pos 
                && paddler.boat_pos == 1
                && paddler.adj_perg_500_sec > 0);

        const leftStr = filteredLeftPaddlers.reduce((sum, paddler) => sum + paddler.adj_perg_500_sec, 0) / filteredLeftPaddlers.length;

        const filteredRightPaddlers = activeRosterState
            .filter((paddler) => 
                paddler.row 
                && paddler.row > 0
                && paddler.row < 11
                && paddler.boat_pos 
                && paddler.boat_pos == 2
                && paddler.adj_perg_500_sec > 0);

        const rightStr = filteredRightPaddlers.reduce((sum, paddler) => sum + paddler.adj_perg_500_sec, 0) / filteredRightPaddlers.length;

        const filteredFrontPaddlers = activeRosterState
            .filter((paddler) => 
                paddler.row 
                && paddler.row > 0 
                && paddler.row < 6
                && paddler.adj_perg_500_sec > 0)

        const frontStr = filteredFrontPaddlers.reduce((sum, paddler) => sum + paddler.adj_perg_500_sec, 0) / filteredFrontPaddlers.length;

        const filteredBackPaddlers = activeRosterState
            .filter((paddler) => 
                paddler.row 
                && paddler.row > 5 
                && paddler.row < 11
                && paddler.adj_perg_500_sec > 0);

        const backStr = filteredBackPaddlers.reduce((sum, paddler) => sum + paddler.adj_perg_500_sec, 0) / filteredBackPaddlers.length;
                            
        const newBoatWeight = {
            "d":  0,
            "1":  {"left": 0, "right": 0, "diff": 0},
            "2":  {"left": 0, "right": 0, "diff": 0},
            "3":  {"left": 0, "right": 0, "diff": 0},
            "4":  {"left": 0, "right": 0, "diff": 0},
            "5":  {"left": 0, "right": 0, "diff": 0},
            "6":  {"left": 0, "right": 0, "diff": 0},
            "7":  {"left": 0, "right": 0, "diff": 0},
            "8":  {"left": 0, "right": 0, "diff": 0},
            "9":  {"left": 0, "right": 0, "diff": 0},
            "10": {"left": 0, "right": 0, "diff": 0},
            "s":  0
            }

        activeRosterState.forEach(paddler => {
            if (paddler.row && paddler.boat_pos && paddler.row > 0 && paddler.weight > 0) {
                if (paddler.row === 15) {
                    newBoatWeight.d = paddler.weight;
                } else if (paddler.row === 11) {
                    newBoatWeight.s = paddler.weight;
                } else if (paddler.row >= 1 && paddler.row <= 10) {
                    const side = paddler.boat_pos === 1 ? 'left' : 'right';
                    const key = paddler.row.toString() as keyof typeof newBoatWeight;
                    if (typeof newBoatWeight[key] === 'object') {
                        (newBoatWeight[key] as { left: number; right: number })[side] = paddler.weight;
                    }
                }
            }
        });

        for (let r = 1; r < 11; r++){
            const key = r.toString() as keyof Omit<BoatWeight, "d" | "s">;
            newBoatWeight[key].diff = newBoatWeight[key].left - newBoatWeight[key].right;
        }

        setBoatWeight(newBoatWeight);
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
            <div className="shadow-2xl flex flex-col pb-4 mb-3  bg-[#113758]/80 rounded-xl w-[370px] sm:w-[500px] md:w-[600px] justify-center">
                <div className="mb-3  ">
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
                </div>
                <div className="flex mb-3 justify-evenly ">
                    <div className="w-[350px] sm:w-[350px] md:w-[350px] flex justify-evenly">
                        <BoatDisplay 
                            boatWeight={boatWeight}
                        />
                    </div>
                    {windowSize.width >= 640 && 
                        <div className="w-[95px] sm:w-[120px] md:w-[200px] h-[540px] ">
                            <Roster 
                                windowSize={windowSize}/>
                        </div>
                    }
                </div>
                <ControlArea />
            </div>
        </>
    )
}

export default BoatInterface
