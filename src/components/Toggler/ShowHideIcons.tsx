import React from 'react'
import EyeHide from '../icons/EyeHide'
import EyeShow from '../icons/EyeShow'
import { useWeightStore, WeightStore } from '../../lib/store'

const ShowHideIcons:React.FC = () => {
    const { showWeight,  setShowWeight }:WeightStore = useWeightStore();

    const handleClick = () => {
        setShowWeight()
    }
    return (
        <>
            <div 
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