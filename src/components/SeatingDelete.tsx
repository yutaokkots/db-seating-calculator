import React from 'react'
import { SeatSelectionType } from './Seating';
import { Paddler } from '../common/types';

interface SeatingDeleteProps{
    rowNum: number;
    position: string;
    deleteSeatSelection: SeatSelectionType; 
    selectedPaddler: Paddler;
}

const SeatingDelete:React.FC<SeatingDeleteProps> = ({ rowNum, position, deleteSeatSelection, selectedPaddler }) => {
    const handleDelete = () => {
        deleteSeatSelection(selectedPaddler.name, rowNum, position)
    }

    return (
        <>
            <button 
                onClick={handleDelete}
                className="rounded-sm bg-red-300 flex justify-center items-center w-4 h-4">
                <div className="flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>  
            </button>
        </>
    )
}

export default SeatingDelete
