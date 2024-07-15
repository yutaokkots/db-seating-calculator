import React from 'react'
import Boat from './Boat'

interface BoatInterfaceProps {
    windowSize: windowSize
}

interface windowSize{
    width: number;
    height: number;
}

const BoatInterface:React.FC<BoatInterfaceProps> = ({ windowSize }) => {
  return (
    <>
        <div className="flex border-2 pb-4 pt-4 border-black w-[370px] sm:w-[500px] md:w-[600px] justify-center ">
            <div className="flex p-1 justify-evenly ">
                <div className="w-[95px] sm:w-[140px] md:w-[200px] border-2 border-gray-100">
                    {windowSize.width >= 640 ?  "Port/Left" : "L"}
                </div>
                <div className="w-[175px] sm:w-[175px] md:w-[175px] flex justify-center">
                    <Boat/>
                </div>
                <div className="w-[95px] sm:w-[140px] md:w-[200px] border-2 border-gray-100">
                    {windowSize.width >= 640 ?  "Starboard/Right" : "R"}
                </div>
            </div>
        </div>
    </>
  )
}

export default BoatInterface