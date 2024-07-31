import React from 'react'
import { paddlerDataStore, usePaddlerDataStore } from '../lib/store'

/** 
 * Loading interface for when the app is initialized.
 * Checks activeRosterState for data.
*/

const Loading:React.FC = () => {
    const { activeRosterState }:paddlerDataStore = usePaddlerDataStore()
    return (
        <>
            { activeRosterState.length == 0 ? 
                <div 
                    className="fixed z-50 top-0 left-0 bg-white w-screen h-screen hover:cursor-default"
                    >
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <img src="/db-load-icon-white.gif" className="rounded-full animate-spin-slow w-[100px] h-[100px]" alt="RPT Logo" />
                        <div className="text-[#712d47] font-bold">Loading<span>...</span></div>
                    </div>
                </div>
                :
                <></>
            }
        </>
    )
}

export default Loading
