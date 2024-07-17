import React from 'react'
import Boat from './Boat'
import { paddlerDataStore, usePaddlerDataStore, Paddler } from '../lib/store'
import RosterItem from './RosterItem';



interface BoatInterfaceProps {
    windowSize: WindowSize;
}

interface WindowSize{
    width: number;
    height: number;
}

const BoatInterface:React.FC<BoatInterfaceProps> = ({ windowSize }) => {
    const { activeRosterState }:paddlerDataStore = usePaddlerDataStore()

    return (
        <>
            <div className="flex flex-col border-2 pb-4 pt-4 border-black rounded-md w-[370px] sm:w-[500px] md:w-[600px] justify-center">
                <div className="m-2 flex justify-between">
                    <div>{windowSize.width >= 640 ?  "Port/Left" : "L"} </div>
                    <div>{windowSize.width >= 640 ?  "Starboard/Right" : "R"}</div>
                </div>
                <div className="flex p-1 justify-evenly ">
                    <div className="w-[300px] sm:w-[300px] md:w-[300px] flex justify-center">
                        <Boat/>
                    </div>
                    {windowSize.width >= 640 && 
                        <div className="w-[95px] sm:w-[140px] md:w-[250px] border-2 border-gray-100 ">
                            <div>Roster</div>
                            <div className="text-left">
                            { activeRosterState.length == 0 
                            ? (
                                <div></div>
                            )
                                :
                                ( 
                                    activeRosterState.map((p, idx) => (
                                        <RosterItem key={idx} paddler={p}/>  
                                ))
                            )
                            }
                            </div>
                        </div>
                    }

                </div>
            </div>

        </>
    )
}

export default BoatInterface