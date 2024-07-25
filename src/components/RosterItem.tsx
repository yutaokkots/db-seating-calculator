import React from 'react'
import { Paddler } from '../lib/store';
import { WindowSize } from '../common/types';

interface RosterItemProp{
    paddler:Paddler;
    windowSize: WindowSize;
}

const RosterItem:React.FC<RosterItemProp> = ({ paddler, windowSize }) => {

    return (
        <>
            <div className="flex flex-row justify-between">
                <div
                    className={`${paddler.row && paddler.row > -1 ? "text-[#712a48] font-bold " : "text-gray-400"}` }>
                        {paddler.name} 
                </div>
                { windowSize.width > 768 &&
                    <div className={` ${paddler.row && paddler.row > -1 ? "text-[#712a48]" : "text-gray-400"}` }>
                        {paddler.row && paddler.row > -1 && paddler.row < 11 ? `${paddler.row}-`: ""}
                        {
                            paddler.row && paddler.row == 15 ? "drum" :
                            paddler.row && paddler.row == 11 ? "stern" :
                            paddler.boat_pos && paddler.boat_pos == 1 ? "L" :
                            paddler.boat_pos && paddler.boat_pos == 2 ? "R" : ""
                            }
                    </div>
                }
            </div>
        </>
    )
}

export default RosterItem
