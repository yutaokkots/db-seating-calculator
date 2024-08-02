import React, { useState, useEffect } from 'react'
import { BoatWeight } from './BoatInterface';
import { useWeightStore, WeightStore } from '../lib/store';

interface IndicatorProps {
    colNum: 1 | 2;      // left => 1, right => 2
    rowNum: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    boatWeight: BoatWeight
}

interface IndicatorWeightProps {
    weight: number;
}
const IndicatorWeight:React.FC<IndicatorWeightProps> = ({ weight }) => {
    const {showWeight}:WeightStore = useWeightStore()
    return (
        <>
            <div className={`text-sm text-right text-nowrap font-bold text-red-200 ${showWeight ? "":"blur-sm"}`}>
                +{weight}
            </div>
        </>
    )
}

const Indicator:React.FC<IndicatorProps> = ({ rowNum, colNum, boatWeight }) => {
    const [indicatorOn, setIndicatorOn] = useState<boolean>(false);
    const [weightDiff, setWeightDiff] = useState<number>(0);

    useEffect(() => {
        setIndicatorOn(false)
        setWeightDiff(0)
        const key = rowNum.toString() as keyof Omit<BoatWeight, "d" | "s">;
        const absDiff = Math.abs(boatWeight[key].diff)
        if (colNum == 2 && boatWeight[key].diff < 0 || colNum == 1 && boatWeight[key].diff > 0){
            setIndicatorOn(true)
        } 
        if (absDiff > 0){
            setWeightDiff(absDiff)
        }

    },[boatWeight])

    return (
        <> 
            <div className={`flex flex-row ${colNum== 1 ? 'justify-end':'justify-between'} items-center gap-1 h-5`}>
                { indicatorOn && 
                    <>
                        { colNum== 1 &&
                                <IndicatorWeight 
                                    weight={weightDiff}
                                />
                        }
                            <div className="flex flex-row justify-between items-center gap-[2px]">
                                <div className={`${colNum== 1 ? "h-1" : "h-5" } w-[2px] rounded-md bg-red-50`}></div>
                                <div className={`${colNum== 1 ? "h-3" : "h-3" } w-[2px] rounded-md bg-red-50`}></div>
                                <div className={`${colNum== 1 ? "h-5" : "h-1" } w-[2px] rounded-md bg-red-50`}></div>
                            </div>
                        { colNum== 2 && 
                                <IndicatorWeight 
                                    weight={weightDiff}
                                />
                        }
                    </>
                }
            </div>
        </>
    )
}

export default Indicator