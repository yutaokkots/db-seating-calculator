import React from 'react'
import { Paddler } from '../lib/store'


interface RosterItemProp{
    paddler:Paddler
}

const RosterItem:React.FC<RosterItemProp> = ({ paddler }) => {
    return (
        <div>{paddler.name} ({paddler.weight} lb)</div>
    )
}

export default RosterItem