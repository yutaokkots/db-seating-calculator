import React from 'react'
import './WeightToggler.css'
import { useWeightStore, WeightStore } from '../../lib/store'

/**
 * WeightToggler, toggle switch for showing or hiding weight information.
 * Currently not in use. 
 */

const WeightToggler:React.FC = () => {
    const { showWeight, setShowWeight }:WeightStore = useWeightStore();

    const handleClick = () => {
        setShowWeight()
        console.log(showWeight)
    }
    return (
        <>
            <label 
                className="cursor-pointer inline-flex"
                >
                <input type="checkbox" className="sr-only peer"/>
                <div 
                    onClick={handleClick}
                    className="relative w-11 h-6 bg-white rounded-full 
                        peer-focus:outline-none 
                        peer-checked:after:translate-x-full
                        peer-checked:after:border-white 
                        peer-checked:bg-white
                        rtl:peer-checked:after:-translate-x-full
                        after:content-[''] 
                        after:absolute 
                        after:top-[2px] 
                        after:start-[2px] 
                        after:bg-pink-200 
                        after:rounded-full 
                        after:h-5 
                        after:w-5 
                        after:transition-all    ">

                </div>
            </label>
        </>    
    )
}

export default WeightToggler