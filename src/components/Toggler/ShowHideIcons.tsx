import React from 'react'
import EyeHide from '../icons/EyeHide'
import EyeShow from '../icons/EyeShow'
import { useWeightStore, WeightStore } from '../../lib/store'

/**
 * ShowHideIcons, icon toggler for showing or hiding sensitive weight information.
 */

const ShowHideIcons:React.FC = () => {
    const { showWeight,  setShowWeight }:WeightStore = useWeightStore();

    const handleClick = () => {
        setShowWeight()
    }
    const handleKeyDown = (evt: React.KeyboardEvent<HTMLDivElement>) => {
        if (evt.key === 'Enter') {
            setShowWeight()
        }
    }
    return (
        <>
            <div 
                tabIndex={0} 
                onKeyDown={handleKeyDown}
                onClick={handleClick}>
            {
                showWeight 
                ? 
                <EyeShow 
                color={"white"} />
                :
                <EyeHide 
                color={"white"} />
            }
            </div>
        </>
    )
}

export default ShowHideIcons