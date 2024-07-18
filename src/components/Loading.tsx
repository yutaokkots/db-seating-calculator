import React from 'react'
import { paddlerDataStore, usePaddlerDataStore } from '../lib/store'

const Loading:React.FC = () => {
    const { paddlersState }:paddlerDataStore = usePaddlerDataStore()

    return (
        <>
        {
            paddlersState.length == 0 ? 
            <div>Loading</div>
            :
            <div>Ready</div>
        }
        </>
    )
}

export default Loading