import React, {useState, useEffect} from 'react'
import { WindowSize } from '../common/types'
import WeightIndicator from './WeightIndicator';
import { useWeightStore, WeightStore, usePaddlerDataStore, paddlerDataStore, } from '../lib/store.ts'

interface WeightAnalysisProps {
    windowSize: WindowSize;
    leftWeight: number;
    rightWeight: number;
    frontWeight: number;
    backWeight: number;
    totalWeight: number;
    leftStrength: number;
    rightStrength: number;
    frontStrength: number;
    backStrength: number;
    drumSternWeight: number;
}
const WeightAnalysis:React.FC<WeightAnalysisProps> = ({
    windowSize, 
    leftWeight,
    rightWeight,
    frontWeight,
    backWeight,
    totalWeight,
    leftStrength,
    rightStrength,
    frontStrength,
    backStrength,
    drumSternWeight,
}) => {
    // Weight difference
    const [ frontBackDiff, setFrontBackDiff ] = useState<number>(0)
    const [ leftRightDiff, setLeftRightDiff ] = useState<number>(0)

    // Showing or hiding sensitive information
    const { showWeight }:WeightStore = useWeightStore();
    const { paddlerNumState }:paddlerDataStore = usePaddlerDataStore();

    useEffect(() => {
        setFrontBackDiff(frontWeight - backWeight)
        setLeftRightDiff(leftWeight - rightWeight)
    }, [leftWeight, rightWeight, frontWeight, backWeight])

    return (
        <>
            <div className=" border-t-2 border-b-2 rounded-2xl py-2 mt-2 mx-2 ">
                <div className="flex justify-center items-center gap-1">
                    <div className=" flex flex-col gap-1">
                        <div className="w-[10px] flex justify-center">
                            <div className="text-left transform -rotate-90 font-bold text-red-200">
                                {!showWeight && paddlerNumState == 1 ?
                                    <>
                                    {leftRightDiff > 0 &&
                                        <div className="whitespace-nowrap">
                                            <span className="blur-sm">xxx</span> lbs 
                                        </div>
                                    }
                                    </>
                                    :
                                    <span className="whitespace-nowrap">
                                        {leftRightDiff > 0 && `+ ${Math.abs(leftRightDiff)} lbs`} 
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="h-[20px]"></div>
                        <div className=" p-1 w-[95px] sm:w-[130px] h-[90px] ">
                            <WeightIndicator 
                                top={true}
                                left={true}
                                frontBackDiff={frontBackDiff}
                                leftRightDiff={leftRightDiff}
                                />
                        </div>
                        <div className="bg-slate-200 rounded-md p-1 w-[95px] sm:w-[130px] h-[90px] ">
                            <div className="font-bold "> 
                                {windowSize.width >= 640 ?  "Port/Left" : "L"} 
                            </div>
                            <div className="bg-white rounded-sm p-1 h-[57px]">
                                { showWeight 
                                    ?
                                    <div className="font-bold "> 
                                    {leftWeight + (drumSternWeight / 2)} lbs
                                    </div>
                                    :
                                    <div className="font-bold "> 
                                        <span className="blur-sm">xxx</span> lbs
                                    </div>
                                }
                                { leftStrength > 0 && 
                                    <div>
                                    {leftStrength.toFixed(1)} sec
                                </div>
                                }
                            </div>
                        </div>
                        <div className="p-1 w-[95px] sm:w-[130px] h-[90px] ">
                            <WeightIndicator 
                                top={false}
                                left={true}
                                frontBackDiff={frontBackDiff}
                                leftRightDiff={leftRightDiff}
                                />
                        </div>
                        <div className="h-[20px]"></div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="w-[95px] sm:w-[130px] font-bold text-red-200 h-[20px]">
                            {(!showWeight && paddlerNumState == 1) ?
                                <div className="whitespace-nowrap" >
                                    {frontBackDiff > 0 &&
                                        <>
                                            <span className="blur-sm">xxx</span> lbs 
                                        </>
                                    }
                                </div>
                                :
                                <div className="whitespace-nowrap">
                                    <span>{frontBackDiff > 0 && `+ ${Math.abs(frontBackDiff)} lbs` }</span>
                                </div>
                            }
                        </div>
                        <div className="bg-slate-200 rounded-md p-1 w-[95px] sm:w-[130px]  h-[90px] ">
                            <div className="font-bold "> 
                                {windowSize.width >= 640 ?  "Front" : "F"} 
                            </div>
                            <div className="bg-white rounded-sm p-1 h-[57px]">
                                { showWeight 
                                    ?
                                    <div className="font-bold "> 
                                        {frontWeight} lbs
                                    </div>
                                    :
                                    <div className="font-bold "> 
                                        <span className="blur-sm">xxx</span> lbs
                                    </div>
                                }
                                { rightStrength > 0 && 
                                    <div>
                                        {frontStrength.toFixed(1)} sec
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="bg-blue-200 rounded-md p-1 w-[95px] sm:w-[130px] ">
                            <div className="font-bold "> 
                                {windowSize.width >= 640 ?  "Total Weight" : "Total"} 
                            </div>
                            <div className="bg-white rounded-sm p-1 h-[57px]">
                                { showWeight 
                                    ?
                                    <div className="font-bold "> 
                                        {totalWeight} lbs
                                    </div>
                                    :
                                    <div className="font-bold "> 
                                        <span className="blur-sm">xxx</span> lbs
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="bg-slate-200 rounded-md p-1 w-[95px] sm:w-[130px]  h-[90px] ">
                            <div className="font-bold "> 
                                {windowSize.width >= 640 ?  "Back" : "B"} 
                            </div>
                            <div className="bg-white rounded-sm h-[57px]">
                                { showWeight 
                                    ?
                                    <div className="font-bold "> 
                                        {backWeight} lbs
                                    </div>
                                    :
                                    <div className="font-bold "> 
                                        <span className="blur-sm">xxx</span> lbs
                                    </div>
                                }
                                { backStrength > 0 && 
                                    <div>
                                        {backStrength.toFixed(1)} sec
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="w-[95px] sm:w-[130px] font-bold text-red-200 h-[20px]">
                        {!showWeight && paddlerNumState == 1 ?
                            <div className="whitespace-nowrap">
                                {frontBackDiff < 0 &&
                                    <>
                                        <span className="blur-sm">xxx</span> lbs 
                                    </>
                                    }
                            </div>
                                :
                                <span>{frontBackDiff < 0 && `+ ${Math.abs(frontBackDiff)} lbs` }</span>
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="h-[20px]"></div>

                        <div className=" p-1 w-[100px] sm:w-[130px] h-[90px] ">
                        <WeightIndicator 
                                top={true}
                                left={false}
                                frontBackDiff={frontBackDiff}
                                leftRightDiff={leftRightDiff}
                                />
                        </div>
                        <div className="bg-slate-200 rounded-md p-1 w-[100px] sm:w-[130px]  h-[90px] ">
                            <div className="font-bold "> 
                                {windowSize.width >= 640 ?  "Starboard/Right" : "R"}
                            </div>
                            <div className="bg-white rounded-sm p-1 h-[57px]">
                                { showWeight 
                                    ?
                                    <div className="font-bold "> 
                                        {rightWeight + (drumSternWeight / 2)} lbs
                                    </div>
                                    :
                                    <div className="font-bold "> 
                                        <span className="blur-sm">xxx</span> lbs
                                    </div>
                                }
                                { rightStrength > 0 && 
                                    <div>
                                        {rightStrength.toFixed(1)} sec
                                    </div>
                                }
                            </div>
                        </div>  
                        <div className=" p-1 w-[100px] sm:w-[130px] h-[90px] ">
                            <WeightIndicator 
                                top={false}
                                left={false}
                                frontBackDiff={frontBackDiff}
                                leftRightDiff={leftRightDiff}
                                />
                        </div>
                        <div className="h-[20px]"></div>
                    </div>
                    <div className="flex flex-col">
                        <div className="w-[10px] flex justify-center">
                            <div className="transform -rotate-90 text-left font-bold text-red-200 ">
                            {!showWeight && paddlerNumState == 1 ?
                                <>
                                {leftRightDiff < 0 &&
                                    <div className="whitespace-nowrap">
                                        <span className="blur-sm">xxx</span> lbs 
                                    </div>
                                }
                                </>
                                    :
                                <span className="whitespace-nowrap">
                                    {leftRightDiff < 0 && `+ ${Math.abs(leftRightDiff)} lbs` }
                                </span>
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>     
    </>
    )
}

export default WeightAnalysis