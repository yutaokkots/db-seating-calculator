import React from 'react'
import Row from './Row';
import Seating from './Seating';

export interface ChangePaddlerStatus {
    (
        paddlerName: string,
        newRow?: number, 
        newBoatPos?: number // 0: none, 1: left, 2: right
    ): void;
}

const Boat:React.FC = () => {
    const rows = Array.from({ length: 10 }, (_, i) => i + 1 );
    
    return (
        <>
            <div>

                <div className="relative w-[350px] h-[70px]">
                    <div className=" absolute inset-0 border-l-[100px] border-l-transparent border-r-[100px] border-r-transparent border-b-[70px] border-b-white rounded-t-[20px]">
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex justify-center  ">
                        <div className="flex flex-col w-[50%] mb-2">                       
                            <div>drummer/coach</div>
                            <div>
                                <Seating 
                                    rowNum={ 15 }
                                    position={"drum"} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[350px] h-[400px] bg-white px-1">
                    <div className="flex flex-col justify-between h-full">
                    {
                        rows.map((r, idx) => (
                            <Row 
                                key={idx} 
                                rowNum={r}  />
                        ))
                    }
                    </div>
                </div>
                <div className="relative w-[350px] h-[70px]">
                    <div className="absolute inset-0 border-l-[100px] border-l-transparent border-r-[100px] border-r-transparent border-t-[70px] border-t-white ">
                    </div>
                    <div className="absolute inset-x-0 top-0 flex justify-center ">
                        <div className="flex flex-col w-[50%] mt-2">                       
                            <div>
                                <Seating 
                                    rowNum={ 11 }
                                    position={"stern"} />
                            </div>
                            <div>stern</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Boat
