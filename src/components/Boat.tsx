import React from 'react'
import Seating from './Seating'

const Boat:React.FC = () => {
  return (
    <>
        <div>
            <div className="relative w-[300px] h-[70px]">
                <div className="-z-10 absolute inset-0 border-l-[100px] border-l-transparent border-r-[100px] border-r-transparent border-b-[70px] border-b-red-50 rounded-t-[20px]">
                </div>
                <div className="absolute inset-x-0 bottom-0 flex justify-center ">
                    <div>drummer</div>
                </div>
            </div>
            <div className="w-[300px] h-[400px] bg-red-50">

                <div className="grid grid-cols-11">
                    <div className="col-span-5">    
                        <Seating />
                    </div>
                    <div className="col-span-1">
                        1
                    </div>
                    <div className="col-span-5">
                        <Seating />
                    </div>
                </div>

            </div>
            <div className="-z-10 relative w-[300px] h-[70px]">
                <div className="absolute inset-0 border-l-[100px] border-l-transparent border-r-[100px] border-r-transparent border-t-[70px] border-t-red-50 ">
                </div>
                <div className="absolute inset-x-0 top-0 flex justify-center ">
                    <div>stern</div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Boat