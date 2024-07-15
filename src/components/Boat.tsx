import React from 'react'

const Boat:React.FC = () => {
  return (
    <>
        <div>
            <div className="relative w-[150px] h-[100px]">
                <div className="-z-10 absolute inset-0 border-l-[75px] border-l-transparent border-r-[75px] border-r-transparent border-b-[100px] border-b-red-50 rounded-t-[20px]">
                </div>
                <div className="absolute inset-x-0 bottom-0 flex justify-center ">
                    <div>drummer</div>
                </div>
            </div>
            <div className="w-[150px] h-[400px] bg-red-50">
            </div>
            <div className="-z-10 relative w-[150px] h-[100px]">
                <div className="absolute inset-0 border-l-[75px] border-l-transparent border-r-[75px] border-r-transparent border-t-[100px] border-t-red-50 ">
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