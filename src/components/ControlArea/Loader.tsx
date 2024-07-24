import React, { useState, useEffect } from 'react'
import { retrieveSavedRosters, deleteSingleRoster, RosterResult, RosterKeyObject} from '../../utilities/saveStateSetterGetter';

import LoadDataItem from './LoadDataItem';

interface LoaderProps {
    setShowLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

const Loader:React.FC<LoaderProps> = ({setShowLoader}) => {
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

    const handleClickClose = () => {
        setShowLoader(false)
    }

    const handleInternalClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        event.stopPropagation();
    };

    return (
        <>
            <div
                className="fixed z-50 top-0 left-0 backdrop-blur-md display:none w-screen h-screen hover:cursor-default"
                onClick={handleClickClose}>
                <div 
                    onClick={handleInternalClick}
                    className="rounded-lg p-2 text-black w-[320px] h-[500px] z-60 bg-[#113758]/100 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl">
                    <div className="flex flex-row justify-end">
                        <button 
                            className=" self-end"
                            onClick={handleClickClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div
                        className="text-white font-bold h-[30px]">
                        Load data</div>
                    <div
                        className="p-1 bg-white rounded-md h-[430px] overflow-y-scroll">
                        {retrievedRostersState.length == 0
                            ?
                            <div className="text-center text-gray-300 m-2 italic">Nothing here</div>
                            :
                            <div>

                            {retrievedRostersState.map((dataItem, idx) => 
                                <LoadDataItem
                                key={idx}
                                dataItem={dataItem}
                                deleteRoster={deleteRoster}
                                />
                            )}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Loader