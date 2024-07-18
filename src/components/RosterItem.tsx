import React from 'react'
import { Paddler } from '../lib/store'
import { WindowSize } from './BoatInterface'

interface RosterItemProp{
    paddler:Paddler;
    windowSize: WindowSize;
}

const RosterItem:React.FC<RosterItemProp> = ({ paddler, windowSize }) => {
    return (
        <>
            <div className="flex flex-row justify-between">
                <div
                    className={` ${paddler.row && paddler.row > -1 ? "text-[#712a48]" : "text-gray-400"}` }>
                        {paddler.name} 
                </div>
                { windowSize.width > 768 &&
                <div className={` ${paddler.row && paddler.row > -1 ? "text-[#712a48]" : "text-gray-400"}` }>
                    {paddler.row && paddler.row > -1 && paddler.row < 11? `row ${paddler.row} -` : ""} {paddler.boat_pos && paddler.boat_pos != "none" ? paddler.boat_pos : ""}
                </div>
                }
            </div>
        </>
    )
}

export default RosterItem
