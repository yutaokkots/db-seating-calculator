import React, { useState, useEffect } from 'react'
import { ChangePaddlerStatus } from './Boat';
import { paddlerDataStore, usePaddlerDataStore, Paddler, useModalDataStore, ModalDataStore } from '../lib/store'
import { SeatSelectionType } from './Seating';
import PopupForm from './PopupForm';

interface DropdownProps {
    rowNum: number;
    position:string;
    changePaddlerStatus: ChangePaddlerStatus;
    editSeatSelection: SeatSelectionType;
    dropdownPaddlerList: Paddler[];
    setDropDownPaddlerList: React.Dispatch<React.SetStateAction<Paddler[]>>;
    selected:string;
}

interface DropdownElementProps {
    paddlerInfo: Paddler;
    dropdownPosition: string;
}
type PaddlerKeys = keyof Paddler;

const DropdownElement:React.FC<DropdownElementProps> = ({ paddlerInfo, dropdownPosition }) => {
    const { activeRosterState }:paddlerDataStore = usePaddlerDataStore()

    const [ showOption, setShowOption ] = useState<boolean>(true); 

    useEffect(()=>{
        if (dropdownPosition && (dropdownPosition in paddlerInfo)) {
            const propertyValue = paddlerInfo[dropdownPosition as PaddlerKeys];
            propertyValue ? setShowOption(true) : setShowOption(false)
        }
    },[activeRosterState])

    return(
        <>
            {showOption &&
                <option
                value={paddlerInfo.name}
                >
                            {paddlerInfo.name} ({paddlerInfo.weight})
                </option>
            }
            
        </>
    )
}

export type SelectedPosition = {
    row: number,
    boat_pos: string
}

const Dropdown:React.FC<DropdownProps> = ({ rowNum, position, changePaddlerStatus, editSeatSelection, dropdownPaddlerList, setDropDownPaddlerList, selected }) => {
    const { activeRosterState }:paddlerDataStore = usePaddlerDataStore()
    const [ dropdownPosition, setdropdownPosition ] = useState<string>("");
    const [ selectedPosition, setSelectedPosition ] = useState<SelectedPosition>({row: -1, boat_pos: ""})
    const { setModalState }:ModalDataStore = useModalDataStore();
    

    useEffect(()=>{
        if (position == "drum"){
            setdropdownPosition("drummer")
        }
        if (position == "stern"){
            setdropdownPosition("stern")
        }
        if (rowNum > 0 && rowNum < 5){
            setdropdownPosition("pacer")
        } else if (rowNum > 4 && rowNum < 8){
            setdropdownPosition("engine")
        } else if (rowNum > 7 && rowNum < 11){
            setdropdownPosition("rocket")
        }
    },[activeRosterState])

    const openModal = () => {
        console.log("modal opened")
        setModalState(true)
    }

    const handleDropdown = (evt: React.ChangeEvent<HTMLSelectElement>): void => {
        const selectedPaddler = evt.target.value

        if (selectedPaddler == "add-paddler"){
            setSelectedPosition({...selectedPosition, row: rowNum, boat_pos: position })
            openModal()
        } else{
            // Updates the 'activeRosterState' global state
            changePaddlerStatus(selectedPaddler, rowNum, position)
            // 
            editSeatSelection(selectedPaddler)
        }
    }

    return (
        <>
            <PopupForm 
                rowNum={ rowNum }
                position={ position } 
                selectedPosition={ selectedPosition }/>
            <select
                className="w-full p-1 rounded-md"
                value={selected}
                onChange={handleDropdown} 
                >
                <option value=""> - - </option> 
                <option value="add-paddler">- new paddler -</option> 
                { activeRosterState.map((paddlerInfo, idx) => (
                    <DropdownElement
                        key={ idx } 
                        paddlerInfo={ paddlerInfo } 
                        dropdownPosition={ dropdownPosition }
                        />
                ))}
            </select>
        </> 
    )
}

export default Dropdown
