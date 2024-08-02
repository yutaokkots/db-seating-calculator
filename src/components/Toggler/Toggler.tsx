import React from 'react'
import { useWeightStore, WeightStore } from '../../lib/store'

const Toggler:React.FC = () => {
    const { setToggleWeightDiff, toggleWeightDiff }:WeightStore = useWeightStore();
    
    const handleClick = () => {
        setToggleWeightDiff()
        console.log(toggleWeightDiff)
    }

    return (
        <>
            <label 
                className="cursor-pointer inline-flex"
                >
                <input type="checkbox" className="sr-only peer"/>
                <div 
                    onClick={handleClick}
                    className="relative w-11 h-6 bg-transparent rounded-full border-[1.5px] border-white
                        peer-focus:outline-none 
                        peer-checked:after:translate-x-full
                        peer-checked:after:border-white 
                        peer-checked:bg-transparent
                        rtl:peer-checked:after:-translate-x-full
                        after:content-[''] 
                        after:absolute 
                        after:top-[0.5px] 
                        after:start-[0.5px] 
                        after:bg-transparent
                        after:rounded-full 
                        after:border-[1.5px]
                        after:border-white
                        after:h-5 
                        after:w-5 
                        after:transition-all    ">
                </div>
            </label>
        </>    
    )
}

export default Toggler