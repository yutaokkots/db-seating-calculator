import React from 'react'
import Seating from './Seating';
import SeatingWrapper from './Swapper/SeatingWrapper';

const BoatTwo:React.FC = () => {
    const rows = Array.from({ length: 10 }, (_, i) => i + 1 );

    return (
        <div>
            <div className="">
                <div className="relative w-[240px]">
                    <svg 
                        id="Layer_1" 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`text-white w-[240px]`}
                        viewBox="0 0 240 500">
                        <path
                        fill="#fff"
                        strokeLinecap="round"
                        d="m159.75,0h-79.51c-10.28,0-20.28,3.32-28.52,9.46L7.01,42.76c-4.41,3.29-7.01,8.47-7.01,13.97v386.53c0,5.5,2.6,10.68,7.01,13.97l44.71,33.31c8.24,6.14,18.24,9.46,28.52,9.46h79.51c10.28,0,20.28-3.32,28.52-9.46l44.71-33.31c4.41-3.29,7.01-8.47,7.01-13.97V56.74c0-5.5-2.6-10.68-7.01-13.97l-44.71-33.31c-8.24-6.14-18.24-9.46-28.52-9.46Z"                
                        />
                    </svg>
                    <div className="absolute inset-x-0 top-4 flex justify-center ">
                        <div className="flex flex-col w-[50%] mb-2">                       
                            <div className="font-bold">Drummer/Coach</div>
                            <div>
                                <Seating 
                                    rowNum={ 15 }
                                    position={"drum"} />
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-[70px] left-1 ">    
                        <div className="flex flex-col justify-between h-full gap-[10px] w-[230px]">
                            { rows.map((r, idx) => (
                                    <div 
                                        className="grid grid-cols-11 "
                                        key={idx} >
                                        <div className="col-span-5"> 
                                            <SeatingWrapper
                                                key={idx}
                                                disabled={false}
                                                onClick={() => console.log(`clicked ${r}-left`)}>
                                                <Seating 
                                                    rowNum={ r }
                                                    position={"left"}/>
                                            </SeatingWrapper>   
                                        </div>
                                        <div className="col-span-1 text-sm font-bold">
                                            <SeatingWrapper
                                                key={idx}
                                                disabled={true}
                                                onClick={() => console.log(`clicked ${r}-left`)}>
                                            { r }
                                            </SeatingWrapper>
                                        </div>
                                        <div className="col-span-5">
                                            <SeatingWrapper
                                                key={idx}
                                                disabled={true}
                                                onClick={() => console.log(`clicked ${r}-left`)}>
                                                <Seating 
                                                    rowNum={ r }
                                                    position={"right"}/>
                                            </SeatingWrapper>

                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-4 flex justify-center ">
                            <div className="flex flex-col w-[50%] mt-2">                       
                                <div>
                                    <Seating 
                                        rowNum={ 11 }
                                        position={"stern"} />
                                </div>
                                <div className="font-bold">Stern</div>
                            </div>
                        </div>
                </div>
            </div>
        </div>

    )
}


// transform -translate-x-1/2 -translate-y-1/2
export default BoatTwo