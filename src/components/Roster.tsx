import React from 'react'
import { paddlerDataStore, usePaddlerDataStore } from '../lib/store'
import RosterItem from './RosterItem'
import { WindowSize } from '../common/types';

/**
 * Roster, displays the roster information in list format. 
 */

interface BoatInterfaceProps {
    windowSize: WindowSize;
}

const Roster:React.FC<BoatInterfaceProps> = ({windowSize}) => {
    const { activeRosterState }:paddlerDataStore = usePaddlerDataStore()  
    return (
        <div className=" border-2 rounded-md border-gray-100 p-2  bg-slate-200 ">
            <div className="font-bold pb-1">Roster</div>
            <div className="text-left bg-white p-1 rounded-md h-[500px] overflow-y-scroll ">
                {   activeRosterState.length == 0 
                    ? 
                        (
                            <div></div>
                        )
                    :
                        ( 
                            <div className="">
                                { activeRosterState.map((p, idx) => (
                                        <RosterItem key={idx} paddler={p} windowSize={windowSize}/>  
                                    ))
                                }
                            </div>
                        )
                }
            </div>
        </div>
    )
}

export default Roster
