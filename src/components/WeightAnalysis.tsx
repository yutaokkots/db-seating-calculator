import React from 'react'
import { WindowSize } from '../common/types'


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
    return (
        <>
            <div className=" bg-slate-50 rounded-lg p-2 mt-2 mx-2">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="bg-slate-200 rounded-md p-1 w-[100px] sm:w-[130px] ">
                            <div className="font-bold "> 
                                {windowSize.width >= 640 ?  "Port/Left" : "L"} 
                            </div>
                            <div className="bg-white rounded-sm p-1">
                                <div className="font-bold "> 
                                    {leftWeight + (drumSternWeight / 2)} lbs
                                </div>
                                { leftStrength > 0 && 
                                    <div>
                                    {leftStrength.toFixed(1)} sec
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="bg-slate-200 rounded-md p-1 w-[100px] sm:w-[130px] ">
                            <div className="font-bold "> 
                                {windowSize.width >= 640 ?  "Front" : "F"} 
                            </div>
                            <div className="bg-white rounded-sm p-1">
                                <div className="font-bold "> 
                                    {frontWeight} lbs
                                </div>
                                { rightStrength > 0 && 
                                    <div>
                                        {frontStrength.toFixed(1)} sec
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="bg-blue-200 rounded-md p-1 w-[100px] sm:w-[130px] ">
                            <div className="font-bold "> 
                                {windowSize.width >= 640 ?  "Total Weight" : "Total"} 
                            </div>
                            <div className="bg-white rounded-sm p-1">
                                <div className="font-bold ">   
                                    {totalWeight} lbs
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-200 rounded-md p-1 w-[100px] sm:w-[130px] ">
                            <div className="font-bold "> 
                                {windowSize.width >= 640 ?  "Back" : "B"} 
                            </div>
                            <div className="bg-white rounded-sm ">
                                <div className="font-bold ">    
                                    {backWeight} lbs
                                </div>
                                { backStrength > 0 && 
                                    <div>
                                        {backStrength.toFixed(1)} sec
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="bg-slate-200 rounded-md p-1 w-[100px] sm:w-[130px] ">
                            <div className="font-bold "> 
                                {windowSize.width >= 640 ?  "Starboard/Right" : "R"}
                            </div>
                            <div className="bg-white rounded-sm p-1">
                                <div className="font-bold "> 
                                    {rightWeight + (drumSternWeight / 2)} lbs
                                </div>
                                { rightStrength > 0 && 
                                    <div>
                                        {rightStrength.toFixed(1)} sec
                                    </div>
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