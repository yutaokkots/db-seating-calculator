import React from 'react'
import { Paddler } from '../lib/store'


interface RosterItemProp{
    paddler:Paddler
}


const RosterItem:React.FC<RosterItemProp> = ({ paddler }) => {
    return (
        <>
            <div className="flex flex-row justify-between">
                <div
                    className={` ${paddler.row && paddler.row > -1 ? "text-gray-300" : "text-black"}` }>
                        {paddler.name} 
                </div>
                <div className={` ${paddler.row && paddler.row > -1 ? "text-gray-300" : "text-black"}` }>
                    {paddler.row && paddler.row > -1 && paddler.row < 11? `row ${paddler.row} -` : ""} {paddler.boat_pos && paddler.boat_pos != "none" ? paddler.boat_pos : ""}
                </div>
            </div>
        </>
    )
}

export default RosterItem