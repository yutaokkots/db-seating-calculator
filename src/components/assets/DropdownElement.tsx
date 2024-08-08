import React, {useState, useEffect } from 'react'
import { Paddler } from '../../common/types';
import { 
    usePaddlerDataStore, paddlerDataStore, 
    useWeightStore, WeightStore,
    useSelectedPositionStore, SelectedPositionStore,
    } from '../../lib/store';

interface DropdownElementProps {
    paddlerInfo: Paddler;
    onItemClick: (selectedPaddlerId: string) => void;
    closeMenu: () => void;
    searchInput:string;
    idx: number;
    stylingClass: string;
    setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

const DropdownElement = React.forwardRef<HTMLLIElement, DropdownElementProps> (({ 
        paddlerInfo, 
        onItemClick, 
        closeMenu, 
        searchInput,
        idx, 
        stylingClass, 
        setSelectedIndex 
    }, ref) => {

    // The active roster, saved as a list of paddler.id, number[].
    const { boatState }:paddlerDataStore = usePaddlerDataStore()
    // Showing or hiding sensitive information, boolean.
    const { showWeight }:WeightStore = useWeightStore();
    // Stores user-selected seat {row:number, boat_pos: number}.
    const { setSelectedPosition }:SelectedPositionStore = useSelectedPositionStore();
    // Shows or hides a dropdown element/item, boolean.
    const [ showOption, setShowOption ] = useState<boolean>(true); 
    
    useEffect(() => {
        console.log(boatState)
        console.log(searchInput)
        const isInBoatState = boatState.includes(paddlerInfo.id);
        if (isInBoatState) {
            setShowOption(false);
            return
        } 
        setShowOption(true);
        
    }, [boatState, searchInput])

    const handleItemClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
        const selectedPaddlerId = evt.currentTarget.value;
        // Resets the global 'selectedPosition' state that indicates the user's seat selection.
        setSelectedPosition(-1, -1)
        // 'onItemClick' is prop-drilled from parent component, and updates a number of states.
        onItemClick(selectedPaddlerId);
        // Updates the 'boatState' global state 
        closeMenu()
    }

    return (
        <>
            <li 
                ref={ref}>
                <button
                    onMouseEnter={() => setSelectedIndex(idx)}
                    value={paddlerInfo.id}
                    onClick={handleItemClick}
                    
                    className={`${stylingClass} ${!showOption ? "text-gray-400": "" }  w-[100%] border-b-2 px-1 hover:cursor-pointer `}>
                    <div className="flex flex-row justify-between">
                        <div className="w-[35%] text-left">{paddlerInfo.name}</div> 
                        <div className="w-[25%]  flex flex-row justify-between items-center p-1">
                            <div className={`${paddlerInfo.drummer ? 'bg-[#712d46]': ''} w-[12px] h-[12px]   rounded-full`}></div>
                            <div className={`${paddlerInfo.pacer   ? 'bg-[#c01f0d]': ''} w-[12px] h-[12px]   rounded-full`}></div>
                            <div className={`${paddlerInfo.engine  ? 'bg-[#ebc328]': ''} w-[12px] h-[12px]   rounded-full`}></div>
                            <div className={`${paddlerInfo.rocket  ? 'bg-[#a0b6ac]': ''} w-[12px] h-[12px]   rounded-full`}></div>
                            <div className={`${paddlerInfo.stern   ? 'bg-[#163552]': ''} w-[12px] h-[12px]   rounded-full`}></div>
                        </div>
                        <div className="w-[40%] flex flex-row justify-between pl-1">
                            {showWeight ?
                                <div className="text-left">{paddlerInfo.weight} lb</div>
                                :
                                <div className="text-left"><span className="blur-sm">xxx</span> lb</div>
                            }
                            {paddlerInfo.adj_perg_500_sec && 
                            <div className="italic">{paddlerInfo.adj_perg_500_sec} s</div>
                            }
                        </div>
                    </div>
                </button>
            </li>
        </>
    )
})

export default DropdownElement