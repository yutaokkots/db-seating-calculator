import React, {useEffect, useState} from 'react'
import { usePaddlerDataStore, Paddler, paddlerDataStore} from '../lib/store';
import { WindowSize } from '../common/types';

interface RosterItemProp{
    paddler:Paddler;
    windowSize: WindowSize;
}

const RosterItem:React.FC<RosterItemProp> = ({ paddler, windowSize }) => {
    const [description, setDescription] = useState<string>();
    const { activeRosterState, clearStateToggle, clearAllToggle }: paddlerDataStore = usePaddlerDataStore();
    
    useEffect(() => {
        setDescription("")
    },[clearAllToggle, clearStateToggle])

    useEffect(() => {
        if (paddler.row == 15){
            setDescription("drum")
        } else if (paddler.row == 11){
            setDescription("stern")
        } else if (paddler.boat_pos == 1){
            setDescription("left")
        } else if (paddler.boat_pos == 2){
            setDescription("right")
        }
        },[activeRosterState ])
    return (
        <>
            <div className="flex flex-row justify-between">
                <div
                    className={` ${paddler.row && paddler.row > -1 ? "text-[#712a48]" : "text-gray-400"}` }>
                        {paddler.name} 
                </div>
                { windowSize.width > 768 &&
                    <div className={` ${paddler.row && paddler.row > -1 ? "text-[#712a48]" : "text-gray-400"}` }>
                        {paddler.row && paddler.row > -1 && paddler.row < 11? `row ${paddler.row} -`: ""} {description}
                    </div>
                }
            </div>
        </>
    )
}

export default RosterItem
