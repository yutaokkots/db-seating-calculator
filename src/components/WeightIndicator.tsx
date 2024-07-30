import React, {useEffect, useState} from 'react'

interface WeightIndicatorProps {
    top: boolean;
    left: boolean;
    frontBackDiff:number;
    leftRightDiff:number;
}

const WeightIndicator:React.FC<WeightIndicatorProps> = ({ top, left, frontBackDiff, leftRightDiff }) => {
    const [levelLR, setLevelLR] = useState<number>(0);
    const [levelFB, setLevelFB] = useState<number>(0);

    useEffect(() => {
        const absLeftRightDiff = leftRightDiff < 0 ? -leftRightDiff : leftRightDiff
        const absfrontBackDiff = frontBackDiff < 0 ? -frontBackDiff : frontBackDiff
        setLevelLR(0)
        setLevelFB(0)

        if (absLeftRightDiff > 0){
            setLevelLR(30)
        }
        if (absfrontBackDiff > 0){
            setLevelFB(30)
        }

    }, [frontBackDiff, leftRightDiff])

    return (
        <>
            <div className="relative w-full h-full">    
                {top == true && frontBackDiff > 0 &&
                    <>
                        <div className={`absolute ${top ?' top-0' : 'bottom-0'} ${left ? 'right-0' : 'left-0'}  bg-red-500  ${levelFB > 0 ? 'w-[30px]' : ""}    h-[4px]     rounded-md`}>
                            <div className={`${ frontBackDiff > 0 ? "" : ""} `}></div>
                        </div>
                        <div className={`absolute ${top ?' top-2' : 'bottom-2'} ${left ? 'right-0' : 'left-0'}  bg-red-500  ${levelFB > 0 ? 'w-[10px]' : ""}    h-[4px]     rounded-md`}>
                            <div className={`${ frontBackDiff > 0 ? "" : ""} `}></div>
                        </div>
                    </>
                }
                {top == false && frontBackDiff < 0 &&
                    <>
                        <div className={`absolute ${top ?' top-0' : 'bottom-0'} ${left ? 'right-0' : 'left-0'}  bg-red-500  ${levelFB > 0 ? 'w-[30px]' : ""}    h-[4px]     rounded-md`}>
                            <div className={`${ frontBackDiff > 0 ? "" : ""} `}></div>
                        </div>
                        <div className={`absolute ${top ?' top-2' : 'bottom-2'} ${left ? 'right-0' : 'left-0'}  bg-red-500  ${levelFB > 0 ? 'w-[10px]' : ""}    h-[4px]     rounded-md`}>
                            <div className={`${ frontBackDiff > 0 ? "" : ""} `}></div>
                        </div>
                    </>
                }
                {left == true && leftRightDiff > 0 &&
                    <>
                        <div className={`absolute ${top ?' bottom-0' : 'top-0'} ${left ? 'left-0' : 'right-0'}  bg-red-500 ${levelLR > 0 ? 'h-[30px]' : ""} rounded w-[4px]`}>
                            <div className={``}></div>
                        </div>
                        <div className={`absolute ${top ?' bottom-0' : 'top-0'} ${left ? 'left-2' : 'right-2'}  bg-red-500 ${levelLR > 0 ? 'h-[10px]' : ""} rounded w-[4px]`}>
                            <div className={``}></div>
                        </div>
                    </>
                }
                {left == false && leftRightDiff < 0 &&
                    <>
                        <div className={`absolute ${top ?' bottom-0' : 'top-0'} ${left ? 'left-0' : 'right-0'}  bg-red-500 ${levelLR > 0 ? 'h-[30px]' : ""} rounded w-[4px]`}>
                            <div className={``}></div>
                        </div>
                        <div className={`absolute ${top ?' bottom-0' : 'top-0'} ${left ? 'left-2' : 'right-2'}  bg-red-500 ${levelLR > 0 ? 'h-[10px]' : ""} rounded w-[4px]`}>
                            <div className={``}></div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default WeightIndicator
