import React, {useState, useEffect, useRef} from 'react'
import { usePaddlerDataStore, paddlerDataStore, useModalDataStore, ModalDataStore } from '../../lib/store';
import SeatingDelete from '../SeatingDelete';
import PopupForm from '../PopupForm';
import { Paddler, PaddlerKeys } from '../../common/types';

const defaultPaddler: Paddler = {
    id: 0,
    name: '',
    weight: 0,
    adj_perg_500_sec: 0,
    position: '',
    stroke: false,
    pacer: false,
    engine: false,
    rocket: false,
    drummer: false,
    stern: false,
    side_preference: 0,
    roster: false,
};

interface IconProps {
    isOpen: boolean;
}

const Icon:React.FC<IconProps> = ({ isOpen }) => {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="#222" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className={isOpen ? 'translate' : ''}>
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    );
};

interface DropdownCustom {
    placeHolder: string;
    options: Paddler[];
    isSearchable: boolean;
    onChange: () => void;
}

export type SeatSelectionType = (paddlerName: string, row?: number, pos?: string) => void;

interface DropdownElementProps {
    paddlerInfo: Paddler;
    dropdownPosition: string;
    onItemClick: (selectedPaddlerId: string) => void;
}

const DropdownElement:React.FC<DropdownElementProps> = ({ paddlerInfo, dropdownPosition, onItemClick }) => {
    const { activeRosterState  }:paddlerDataStore = usePaddlerDataStore()
    const [ showOption, setShowOption ] = useState<boolean>(true); 

    useEffect(()=>{
        // 'dropdownPosition' is a state that holds information about this component's type of position.
        // If the Paddler is able to be in this particular position (e.g. stern: true), then
        //      showOption is set to true. 
        if (dropdownPosition && (dropdownPosition in paddlerInfo) ) {
            const propertyValue = paddlerInfo[dropdownPosition as PaddlerKeys];
            propertyValue ? setShowOption(true) : setShowOption(false)
        } 
        if (paddlerInfo.row && paddlerInfo.row > 0){
            setShowOption(false)
        }
    },[activeRosterState])

    //onClick={() => onItemClick(paddlerInfo)} 

    const handleItemClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
        const selectedPaddlerId = evt.currentTarget.value;
        onItemClick(selectedPaddlerId);
    }

    return(
        <>
            {showOption &&
                <li>
                    <button
                        value={paddlerInfo.id}
                        onClick={handleItemClick}
                        className="w-[100%] border-b-2 border-gray-100  pl-2 flex flex-start border-md hover:cursor-pointer hover:bg-gray-500 hover:text-white">
                                {paddlerInfo.name} ({paddlerInfo.weight})
                    </button>
                </li>
            }
        </>
    )
}

export type SelectedPosition = {
    row: number,
    boat_pos: number
}

interface DropdownProps {
    rowNum: number;
    position:string;    //  "drum", "stern", "left", "right"
}

const DropdownCustom:React.FC<DropdownProps> = ({ rowNum, position }) => {
    const { activeRosterState, resetSeat, toggleClear, clearAllToggle, changePaddlerStatus }:paddlerDataStore  = usePaddlerDataStore() 
    const [showMenu, setShowMenu] = useState<boolean>(false)
    // 
    const [selectedPaddler, setSelectedPaddler] = useState<Paddler>(defaultPaddler)
    // stores string value in the search
    const searchRef = useRef<HTMLInputElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // The row and boat-position information for the Dropdown Item. 
    const [ selectedPosition, setSelectedPosition ] = useState<SelectedPosition>({row: -1, boat_pos: -1})
    const { setModalState }:ModalDataStore = useModalDataStore();

    // Stores the position (drummer, pacer, etc) of the paddler in the boat.
    const [ dropdownPosition, setdropdownPosition ] = useState<string>("");
    // Stores the 'left', 'right' information; -1:default, 1="left", 2="right"
    const [ leftRightPosition, setLeftRightPosition ] = useState<number>(-1);

    useEffect(()=>{
        if (position == "drum"){
            setdropdownPosition("drummer")
        } else if (position == "stern"){
            setdropdownPosition("stern")
        } else if (position == "left"){
            setLeftRightPosition(1)
        } else if (position == "right"){
            setLeftRightPosition(2)
        }
        if (rowNum > 0 && rowNum < 5){
            setdropdownPosition("pacer")
        } else if (rowNum > 4 && rowNum < 8){
            setdropdownPosition("engine")
        } else if (rowNum > 7 && rowNum < 11){
            setdropdownPosition("rocket")
        }
    },[activeRosterState])

    const placeHolder = "paddler"

    useEffect(() => {
        if (showMenu && searchRef.current){
            searchRef.current.focus();
        }
    }, [ showMenu ])

    useEffect(() => {
        const handler = (e: MouseEvent | TouchEvent) => {
            if (inputRef.current && !inputRef.current.contains(e.target as Node)){
                setShowMenu(false)
            }
        } 
        window.addEventListener("click", handler)
        return () => {
            window.removeEventListener("click", handler)
        }
    }, [])

    const handleInputClick = () => {
        setShowMenu(!showMenu)
    }

    const getDisplay = () => {
        if (!selectedPaddler) {
            return placeHolder
        }
        return selectedPaddler.name
    };

    useEffect(() => {
        setSelectedPaddler(defaultPaddler)
    },[clearAllToggle])

    // const isSelected = (option) => {
    //     if (!selectedPaddler) {
    //         return placeHolder;
    //     }
    //     return selectedPaddler.value === option.value;
    // };

    const onItemClick = (selectedPaddlerId: string) => {
        const selectedPaddler = activeRosterState.find((paddler) => paddler.id && paddler.id.toString() == selectedPaddlerId)
        if (selectedPaddler){   
            setSelectedPaddler(selectedPaddler);
            if (selectedPaddlerId == "add-paddler"){
                openModal()
            } else{
                // Updates the 'activeRosterState' global state
                changePaddlerStatus(selectedPaddler.name, rowNum, leftRightPosition)
            }
        }
    }

    const deleteSeatSelection: SeatSelectionType = (paddlerName, row, pos) => {
        resetSeat(paddlerName, row, pos)
        // helps to clear the useState in "RosterItem"
        toggleClear(0)
        setSelectedPaddler(defaultPaddler)
    }

    const openModal = () => {
        setModalState(true)
        setSelectedPosition({...selectedPosition, row: rowNum, boat_pos: leftRightPosition })
    }

    return (
        <>
            <div className=" flex justify-center">
                <div className="flex flex-row w-[150px] h-[25px] px-1 border-2 rounded-md items-center justify-between relative hover:cursor-pointer">
                    <SeatingDelete 
                        rowNum={rowNum}
                        position={position}
                        selectedPaddler={selectedPaddler}
                        deleteSeatSelection={deleteSeatSelection}/>
                    <div 
                        ref={inputRef} 
                        onClick={handleInputClick} 
                        className="dropdown-input w-[80%]">
                            <div className="flex flex-row justify-between">
                                <div 
                                    className={`dropdown-selected-value ${!selectedPaddler ? 'placeholder' : ''}`}
                                    >{getDisplay()}
                                </div>
                                <div className="dropdown-tools">
                                    <div className="dropdown-tool">
                                        <Icon isOpen={showMenu} />
                                    </div>
                                </div>
                            </div>
                    </div>
                    <PopupForm 
                        rowNum={ rowNum }
                        leftRightPosition={ leftRightPosition } 
                        selectedPosition={ selectedPosition }
                        setSelectedPaddler={setSelectedPaddler}/>
                    { showMenu && (
                            <div className="absolute top-0 left-0 bg-white z-20">
                                <div>

                                </div>
                                <ul className="border-2 w-[150px] rounded-md">
                                    <li>
                                        <div
                                            className={` border-b-2 border-gray-100  pl-2 text-left border-md hover:cursor-pointer hover:bg-gray-500 hover:text-white`} >
                                                { selectedPaddler.name }
                                        </div>
                                    </li>
                                    <li>
                                        <button
                                            value="add-paddler"
                                            onClick={openModal}
                                            className={`border-b-2 border-gray-100 w-[100%] pl-2 text-left border-md hover:cursor-pointer hover:bg-gray-500 hover:text-white`} >
                                                - add paddler -
                                        </button>
                                    </li>
                                { activeRosterState && 
                                    activeRosterState.map((paddlerInfo, idx) => (
                                        <DropdownElement 
                                            key={idx}
                                            paddlerInfo={ paddlerInfo } 
                                            dropdownPosition={ dropdownPosition }
                                            onItemClick={onItemClick}
                                            />
                                    ))
                                }
                                </ul>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default DropdownCustom