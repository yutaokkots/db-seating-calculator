import React from 'react'
import BoatTwo from './BoatTwo'
import Indicator from './Indicator';
import { BoatWeight } from './BoatInterface';
import ShowHideIcons from './Toggler/ShowHideIcons';
import Toggler from './Toggler/Toggler';
import { useWeightStore, WeightStore } from '../lib/store';

interface BoatDisplayProps {
    boatWeight: BoatWeight
}

const BoatDisplay:React.FC<BoatDisplayProps> = ({ boatWeight }) => {
    const rows = Array.from({ length: 10 }, (_, i) => i + 1 as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10);
    const {showWeight}:WeightStore = useWeightStore()

    return (
        <>
            <div className=" border-t-2 border-b-2 rounded-2xl">
                <div className="flex flex-row gap-2 justify-center p-2">
                    <ShowHideIcons />
                </div>
                <div className="flex flex-row justify-center items-center gap-1">
                    <div className="flex flex-row ">
                        <div className="flex flex-col items-center justify-center w-[52px] h-[400px] ">
                            <div className="flex flex-col justify-between gap-3 h-[350px] w-[50px] pr-[2px]">
                            { showWeight &&
                                rows.map((r, idx) => (
                                    <Indicator 
                                        key={idx}
                                        boatWeight={boatWeight}
                                        colNum={1}
                                        rowNum={r}/>
                                    )
                                )
                            }
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <BoatTwo />
                    </div>
                    <div className="flex flex-row ">
                        <div className="flex flex-col items-center justify-center w-[52px]  h-[400px] ">
                            <div className="flex flex-col justify-between gap-3 h-[350px] w-[50px] pl-[2px]">
                            { showWeight &&
                                rows.map((r, idx) => (
                                    <Indicator 
                                        key={idx}
                                        boatWeight={boatWeight}
                                        colNum={2}
                                        rowNum={r}/>
                                    )
                                )
                            }
                            </div>
                        </div>
                    </div>
                </div> 
                <div className="flex flex-row gap-2 justify-center p-2">
                    <Toggler />
                </div>  
            </div>
        </>
    )
}

export default BoatDisplay