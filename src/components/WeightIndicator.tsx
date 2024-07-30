import React, {useEffect, useState} from 'react'

interface WeightIndicatorProps {
    top: boolean;
    left: boolean;
    frontBackDiff:number;
    leftRightDiff:number;
}

const WeightIndicator:React.FC<WeightIndicatorProps> = ({ top, left, frontBackDiff, leftRightDiff }) => {
    const [levelLR1, setLevelLR1] = useState<number>(0);
    // const [levelLR2, setLevelLR2] = useState<number>(0);
    // const [levelLR3, setLevelLR3] = useState<number>(0);

    const [levelFB1, setLevelFB1] = useState<number>(0);

    useEffect(() => {
        const absLeftRightDiff = leftRightDiff < 0 ? -leftRightDiff : leftRightDiff
        const absfrontBackDiff = frontBackDiff < 0 ? -frontBackDiff : frontBackDiff
        setLevelLR1(0)
        setLevelFB1(0)
        if (absLeftRightDiff > 0 && absLeftRightDiff <= 10){
            setLevelLR1(5)
            // setLevelLR2(0)
            // setLevelLR3(0)
        } else if (absLeftRightDiff > 10 && absLeftRightDiff <= 25){
            setLevelLR1(10)

            // setLevelLR2(0)
            // setLevelLR3(0)
        } else if (absLeftRightDiff > 25 && absLeftRightDiff <= 100){
            setLevelLR1(15)
            // setLevelLR2(5)
            // setLevelLR3(0)
        } else {
            setLevelLR1(30)
            // setLevelLR2(15)
            // setLevelLR3(5)
        }
        if (absfrontBackDiff > 0 && absfrontBackDiff <= 10){
            setLevelFB1(5)
            // setLevelFB2(0)
            // setLevelFB3(0)
        } else if (absfrontBackDiff > 10 && absfrontBackDiff <= 25){
            setLevelFB1(10)
            // setLevelFB2(0)
            // setLevelFB3(0)
        } else if (absfrontBackDiff > 25 && absfrontBackDiff <= 100){
            setLevelFB1(15)
            // setLevelFB2(5)
            // setLevelFB3(0)
        } else {
            setLevelFB1(30)
            // setLevelFB2(15)
            // setLevelFB3(5)
        }
    }, [frontBackDiff, leftRightDiff])

    return (
        <>
            <div className="relative w-full h-full">    
                {top == true && frontBackDiff > 0 &&
                    <>
                        <div className={`absolute ${top ?' top-0' : 'bottom-0'} ${left ? 'right-0' : 'left-0'}  bg-red-500  w-[${levelFB1}px]    h-[4px]     rounded-md`}>
                            <div className={`${ frontBackDiff > 0 ? "" : ""} `}></div>
                        </div>
                    </>
                }
                {top == false && frontBackDiff < 0 &&
                    <>
                        <div className={`absolute ${top ?' top-0' : 'bottom-0'} ${left ? 'right-0' : 'left-0'}  bg-red-500  w-[${levelFB1}px]    h-[4px]     rounded-md`}>
                            <div className={`${ frontBackDiff > 0 ? "" : ""} `}></div>
                        </div>
                    </>
                }
                {left == true && leftRightDiff > 0 &&
                    <>
                        <div className={`absolute ${top ?' bottom-0' : 'top-0'} ${left ? 'left-0' : 'right-0'} h-[${levelLR1}px] bg-red-500 rounded w-[4px]`}>
                            <div className={``}></div>
                        </div>
                    </>
                }
                {left == false && leftRightDiff < 0 &&
                    <>
                        <div className={`absolute ${top ?' bottom-0' : 'top-0'} ${left ? 'left-0' : 'right-0'} h-[${levelLR1}px] bg-red-500 rounded w-[4px]`}>
                            <div className={``}></div>
                        </div>

                    </>
                }
            </div>
        </>
    )
}

export default WeightIndicator


{/* <div className={`absolute ${top ?' bottom-0' : 'top-0'} ${left ? 'left-2' : 'right-2'} h-[${levelLR2}px] bg-red-500 rounded w-[4px]`}>
<div className={``}></div>
</div>
<div className={`absolute ${top ?' bottom-0' : 'top-0'} ${left ? 'left-4' : 'right-4'} h-[${levelLR3}px] bg-red-500 rounded w-[4px]`}>
<div className={``}></div>
</div> */}

{/* <div className={`absolute ${top ?' bottom-0' : 'top-0'} ${left ? 'left-2' : 'right-0'} h-[${levelLR2}px] bg-red-500 rounded w-[4px]`}>
<div className={``}></div>
</div>
<div className={`absolute ${top ?' bottom-0' : 'top-0'} ${left ? 'left-4' : 'right-0'} h-[${levelLR3}px] bg-red-500 rounded w-[4px]`}>
<div className={``}></div>
</div> */}

{/* <div className={`absolute ${top ?' top-2' : 'bottom-2'} ${left ? 'right-0' : 'left-0'}  bg-red-500  w-[${levelFB2}px]    h-[4px]     rounded-md`}>
<div className={`${ frontBackDiff > 0 ? "" : ""} `}></div>
</div>
<div className={`absolute ${top ?' top-4' : 'bottom-4'} ${left ? 'right-0' : 'left-0'}  bg-red-500  w-[${levelFB3}px]     h-[4px]     rounded-md`}>
<div className={`${ frontBackDiff > 0 ? "" : ""} `}></div>
</div> */}

{/* <div className={`absolute ${top ?' top-2' : 'bottom-2'} ${left ? 'right-0' : 'left-0'}  bg-red-500  w-[${levelFB2}px]    h-[4px]     rounded-md`}>
<div className={`${ frontBackDiff > 0 ? "" : ""} `}></div>
</div>
<div className={`absolute ${top ?' top-4' : 'bottom-4'} ${left ? 'right-0' : 'left-0'}  bg-red-500  w-[${levelFB3}px]     h-[4px]     rounded-md`}>
<div className={`${ frontBackDiff > 0 ? "" : ""} `}></div>
</div> */}