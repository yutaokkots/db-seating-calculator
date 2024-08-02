import React from 'react'

interface MiniBoatProps {
    rowNum: number;
    leftRightPosition: number;
}

const MiniBoat:React.FC<MiniBoatProps> = ({ rowNum, leftRightPosition}) => {
    return (
        <div>
            <div className="relative">
                <svg 
                    id="Layer_1" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`text-black w-[240px]`}
                    viewBox="0 0 170 70">
                    <path
                    fill="ff"
                    strokeLinecap="round"
                    d="m0,21.72c0-3.13.33-6.26.99-9.32h0C1.95,7.96,4.3,3.94,7.71.93h0c1.41-1.24,3.52-1.24,4.92,0h0c3.41,3.01,5.76,7.03,6.72,11.47h0c.66,3.06.99,6.19.99,9.32v26.55c0,3.13-.33,6.26-.99,9.32h0c-.96,4.44-3.31,8.46-6.72,11.47h0c-1.41,1.24-3.52,1.24-4.92,0h0c-3.41-3.01-5.76-7.03-6.72-11.47h0C.33,54.53,0,51.41,0,48.28v-26.55Z"              
                    />
                </svg>
            </div>
            <div className={`absolute top-[2px] left-[11.5px] ${rowNum == 15? "bg-red-400": "bg-white"} h-[6px] w-[6px] rounded-full `}></div>
            <div className={`absolute top-2 left-1`}>
                <div className={`absolute top-0 left-[3px]    ${rowNum == 1 && leftRightPosition == 1? "bg-red-400": "bg-white"}  h-[6px] w-[6px] rounded-full `}></div>
                <div className={`absolute top-0 left-3        ${rowNum == 1 && leftRightPosition == 2? "bg-red-400": "bg-white"}  h-[6px] w-[6px] rounded-full `}></div>
            </div>
            <div className={`absolute top-4 left-1`}>
                <div className={`absolute top-0 left-[3px]    ${rowNum == 2 && leftRightPosition == 1? "bg-red-400": "bg-white"}  h-[6px] w-[6px] rounded-full `}></div>
                <div className={`absolute top-0 left-3        ${rowNum == 2 && leftRightPosition == 2? "bg-red-400": "bg-white"}  h-[6px] w-[6px] rounded-full `}></div>
            </div>
            <div className={`absolute top-6 left-1`}>
                <div className={`absolute top-0 left-[3px]    ${rowNum == 3 && leftRightPosition == 1? "bg-red-400": "bg-white"}  h-[6px] w-[6px] rounded-full `}></div>
                <div className={`absolute top-0 left-3        ${rowNum == 3 && leftRightPosition == 2? "bg-red-400": "bg-white"}  h-[6px] w-[6px] rounded-full `}></div>
            </div>
            <div className={`absolute top-8 left-1`}>
                <div className={`absolute top-0 left-[3px]    ${rowNum == 4 && leftRightPosition == 1? "bg-red-400": "bg-white"}  h-[6px] w-[6px] rounded-full `}></div>
                <div className={`absolute top-0 left-3        ${rowNum == 4 && leftRightPosition == 2? "bg-red-400": "bg-white"}  h-[6px] w-[6px] rounded-full `}></div>
            </div>
            <div className={`absolute top-10 left-1`}>
                <div className={`absolute top-0 left-[3px]    ${rowNum == 5 && leftRightPosition == 1? "bg-red-400": "bg-white"}  h-[6px] w-[6px] rounded-full `}></div>
                <div className={`absolute top-0 left-3        ${rowNum == 5 && leftRightPosition == 2? "bg-red-400": "bg-white"}  h-[6px] w-[6px] rounded-full `}></div>
            </div>
            <div className={`absolute top-[52px] left-1`}>
                <div className={`absolute top-0 left-[3px]    ${rowNum == 6 && leftRightPosition == 1? "bg-red-400": "bg-white"}  h-[6px] w-[6px] rounded-full `}></div>
                <div className={`absolute top-0 left-3        ${rowNum == 6 && leftRightPosition == 2? "bg-red-400": "bg-white"}  h-[6px] w-[6px] rounded-full `}></div>
            </div>
            <div className={`absolute top-[60px] left-1`}>
                <div className={`absolute top-0 left-[3px]    ${rowNum == 7 && leftRightPosition == 1? "bg-red-400": "bg-white"}  h-[6px] w-[6px] rounded-full `}></div>
                <div className={`absolute top-0 left-3        ${rowNum == 7 && leftRightPosition == 2? "bg-red-400": "bg-white"}  h-[6px] w-[6px] rounded-full `}></div>
            </div>
            <div className={`absolute top-[68px] left-1`}>
                <div className={`absolute top-0 left-[3px]    ${rowNum == 8 && leftRightPosition == 1? "bg-red-400": "bg-white"}  h-[6px] w-[6px] rounded-full `}></div>
                <div className={`absolute top-0 left-3        ${rowNum == 8 && leftRightPosition == 2? "bg-red-400": "bg-white"}  h-[6px] w-[6px] rounded-full `}></div>
            </div>
            <div className={`absolute top-[76px] left-1`}>
                <div className={`absolute top-0 left-[3px]    ${rowNum == 9 && leftRightPosition == 1? "bg-red-400": "bg-white"}  h-[6px] w-[6px] rounded-full`}></div>
                <div className={`absolute top-0 left-3        ${rowNum == 9 && leftRightPosition == 2? "bg-red-400": "bg-white"}  h-[6px] w-[6px] rounded-full`}></div>
            </div>
            <div className={`absolute top-[84px] left-1`}>
                <div className={`absolute top-0 left-[3px]     ${rowNum == 10 && leftRightPosition == 1? "bg-red-400": "bg-white"}  h-[6px] w-[6px] rounded-full`}></div>
                <div className={`absolute top-0 left-3         ${rowNum == 10 && leftRightPosition == 2? "bg-red-400": "bg-white"}  h-[6px] w-[6px] rounded-full`}></div>
            </div>
            <div className={`absolute top-[90px] left-[11.5px]   ${rowNum == 11? "bg-red-400": "bg-white"}  h-[6px] w-[6px] rounded-full`}></div>

        </div>
    )
}

export default MiniBoat