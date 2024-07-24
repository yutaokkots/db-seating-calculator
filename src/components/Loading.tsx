import React from 'react'
import { paddlerDataStore, usePaddlerDataStore } from '../lib/store'

const Loading:React.FC = () => {
    const { activeRosterState }:paddlerDataStore = usePaddlerDataStore()

    return (
        <>
        {
            activeRosterState.length == 0 ? 
            <div>Loading</div>
            :
            <div>Ready</div>
        }
        </>
    )
}

export default Loading