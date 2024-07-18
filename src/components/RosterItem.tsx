import React from 'react'
import { Paddler } from '../lib/store'


interface RosterItemProp{
    paddler:Paddler
}

// {paddler.row && paddler.row > 0 
//     ?
//     <div>{paddler.name}</div>
//     :
//     <div>{paddler.name} ({paddler.weight} lb)</div>
//     }

const RosterItem:React.FC<RosterItemProp> = ({ paddler }) => {
    return (
        <>
            <div
                className={` ${paddler.row && paddler.row > 0 ? "text-gray-300" : "text-black"}` }
                >{paddler.name} {paddler.row && paddler.row > 0 ? paddler.row : ""} {paddler.boat_pos && paddler.boat_pos != "none" ? paddler.boat_pos : ""}</div>

        </>
    )
}

export default RosterItem