import React, {useState} from 'react'
import { RosterKeyObject, parseIDLocalTime } from '../../utilities/saveStateSetterGetter'
import { usePaddlerDataStore, paddlerDataStore } from '../../lib/store';

interface LoadDataItemProps {
    dataItem: RosterKeyObject;
    deleteRoster: (dataItem: RosterKeyObject) => void;
}

interface DateData  {
    localYear: string;
    localMonth: string;
    localDay: string;
    localHours: string;
    localMinutes: string;
}

const LoadDataItem:React.FC<LoadDataItemProps> = ({ dataItem, deleteRoster }) => {
    const dateData:DateData = parseIDLocalTime(dataItem.rosterKey)
    const [ deleteConfirm, setDeleteConfirm ] = useState<boolean>(false);
    const { setRosterState }:paddlerDataStore = usePaddlerDataStore()

    const handleClickLoad = () => {
        setRosterState(dataItem.data)
    }

    const handleClickCancel = () => {
        setDeleteConfirm(false)
    }

    const handleClickDelete = () => {
        if (deleteConfirm){
            deleteRoster(dataItem)
            setDeleteConfirm(false)
        } else {
            setDeleteConfirm(true)
        }
    }

    return (
        <>
            <div className="flex flex-row items-center justify-between gap-1 mb-1">
                <div className="flex flex-row justify-start gap-1">
                    <div className="rounded-md mr-1 flex justify-center items-center">
                        <button
                            onClick={handleClickLoad}
                            className="flex justify-center items-center  h-7 w-7">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-blue-500 size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
                            </svg>
                        </button>
                    </div>
                    <div
                        className="w-[80px] text-left">
                        <div className="text-xs font-bold">
                            <span>{dateData.localYear}</span>-<span>{dateData.localMonth}</span>-<span>{dateData.localDay}</span>
                        </div>
                        <div className="text-xs">
                            <span>{dateData.localHours}</span>:<span>{dateData.localMinutes}</span>
                        </div>
                    </div>

                    <div className="text-left text-sm w-[100px] text-wrap">
                        {dataItem.rosterName}
                    </div>
                </div>
                <div className={`flex flex-row w-[70px] ${deleteConfirm ? 'justify-between': 'justify-end'}`}>
                    <button
                        onClick={handleClickDelete}
                        className={`flex justify-end items-center rounded-md  px-1 h-7 w-7 ${deleteConfirm ? 'bg-red-400' : 'text-white' }`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={` size-6 ${deleteConfirm ? 'text-white' : 'text-red-400' }`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                    {deleteConfirm &&
                        <button
                            onClick={handleClickCancel}
                            className="">

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-yellow-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>
                    }
                </div>
            </div>
        </>
    )
}

export default LoadDataItem