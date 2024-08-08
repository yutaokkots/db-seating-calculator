import React from 'react'

interface SwapProps {
    color:string
}
const Swap:React.FC<SwapProps> = ({ color }) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-6 text-${color}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V13.499 " />
                <path strokeLinecap="round" stroke-Lnejoin="round" d="m16.49 12 3.75-3.751m0 0-3.75-3.75m3.75  3.75H3.74V9.5 " />
            </svg>
        </>
    )
}

export default Swap