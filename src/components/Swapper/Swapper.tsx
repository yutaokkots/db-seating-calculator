import React from 'react'
import Swap from '../icons/Swap'
import { SeatSwapperStore, useSeatSwapperStore } from '../../lib/store'

const Swapper:React.FC = () => {
    const { seatSwapperStatus, setSeatSwapperStatus }: SeatSwapperStore = useSeatSwapperStore()

    const handleClick = () => {
        setSeatSwapperStatus()
    }
    return (
        <>
            <div
                onClick={handleClick} 
                className={`px-1 rounded-md hover:cursor-pointer ${seatSwapperStatus ? "bg-[#113758]" : ""}`}>
                <Swap color={"white"} />
            </div>
        </>
    )
}

export default Swapper