import React, { useState, useEffect } from 'react'
import { retrieveSavedRosters, deleteSingleRoster, RosterResult, RosterKeyObject} from '../../utilities/saveStateSetterGetter';
import LoadDataLine from './LoadDataLine';

interface LoaderProps {
}

const LoaderModal:React.FC<LoaderProps> = () => {
    const [retrievedRostersState, setRetrievedRosters] = useState<RosterKeyObject[]>([])
    const [updateList, setUpdateList] = useState<number>(-1);

    useEffect(() => {
        const retrievedRosters: RosterResult<RosterKeyObject> = retrieveSavedRosters()
        if (retrievedRosters.success){
            const sortedRetrievedData = [...retrievedRosters.rosterArray].sort((a, b) => b.rosterKey.localeCompare(a.rosterKey));
            setRetrievedRosters(sortedRetrievedData)
        } else {
            //
        }
    }, [updateList])

    const deleteRoster = (dataItem: RosterKeyObject) => {
        deleteSingleRoster(dataItem.rosterKey)
        setUpdateList(-updateList)
    }

    return (
        <>
            <div
                className="p-1 py-4 rounded-md h-full  overflow-y-scroll">
                {retrievedRostersState.length == 0
                    ?
                    <div className="text-center text-gray-300 m-2 italic">Nothing here</div>
                    :
                    <div>

                    {retrievedRostersState.map((dataItem, idx) => 
                        <LoadDataLine
                            key={idx}
                            dataItem={dataItem}
                            deleteRoster={deleteRoster}
                        />
                    )}
                    </div>
                }
            </div>
        </>
    )
}

export default LoaderModal
