import React, {useState, useEffect, useRef} from 'react'
import { usePaddlerDataStore, paddlerDataStore, useModalDataStore, ModalDataStore, useWeightStore, WeightStore  } from '../../lib/store';
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
    setSelectedPosition: React.Dispatch<React.SetStateAction<SelectedPosition>>;
    paddlerInfo: Paddler;
    dropdownPosition: string;
    onItemClick: (selectedPaddlerId: string) => void;
    closeMenu: () => void;

}

const DropdownElement:React.FC<DropdownElementProps> = ({ setSelectedPosition, paddlerInfo, dropdownPosition, onItemClick, closeMenu }) => {
    const { activeRosterState  }:paddlerDataStore = usePaddlerDataStore()
    const [ showOption, setShowOption ] = useState<boolean>(true); 
    // Showing or hiding sensitive information
    const { showWeight }:WeightStore = useWeightStore();

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
        setSelectedPosition({row: -1, boat_pos: -1})
        closeMenu()
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
                        className="w-[100%] border-b-2  px-1  hover:cursor-pointer hover:bg-gray-500 hover:text-white">
                        <div className="flex flex-row justify-between">
                            <div className="w-[50%] text-left">{paddlerInfo.name}</div> 
                            <div className="w-[50%] flex flex-row justify-between">
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
    // load active roster state
    const { activeRosterState, resetSeat, toggleClear, clearAllToggle, changePaddlerStatus }:paddlerDataStore  = usePaddlerDataStore() 
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [selectedPaddler, setSelectedPaddler] = useState<Paddler>(defaultPaddler)
    // stores string value in the search
    const searchRef = useRef<HTMLInputElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // The row and boat-position information for the Dropdown Item. 
    const [ selectedPosition, setSelectedPosition ] = useState<SelectedPosition>({row: -1,
         boat_pos: -1})
    const { modalState, setModalState }:ModalDataStore = useModalDataStore();

    // Showing or hiding sensitive information
    const { showWeight }:WeightStore = useWeightStore();

    // Stores the position (drummer, pacer, etc) of the paddler in the boat.
    const [ dropdownPosition, setdropdownPosition ] = useState<string>("");
    // Stores the 'left', 'right' information; -1:default, 1="left", 2="right"
    const [ leftRightPosition, setLeftRightPosition ] = useState<number>(-1);

    useEffect(()=>{
        let currRow = -1
        if (position == "drum"){
            setdropdownPosition("drummer")
            currRow = 15
        } else if (position == "stern"){
            setdropdownPosition("stern")
            currRow = 11
        } else if (position == "left"){
            setLeftRightPosition(1)
        } else if (position == "right"){
            setLeftRightPosition(2)
        }
        if (rowNum > 0 && rowNum < 11){
            currRow = rowNum
        }
        if (rowNum > 0 && rowNum < 5){
            setdropdownPosition("pacer")
            
        } else if (rowNum > 4 && rowNum < 8){
            setdropdownPosition("engine")
        } else if (rowNum > 7 && rowNum < 11){
            setdropdownPosition("rocket")
        }

        setSelectedPaddler(filterPaddlers(currRow, leftRightPosition))

    },[activeRosterState])

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

    useEffect(() => {   
        setSelectedPaddler(defaultPaddler)
    },[clearAllToggle])

    const handleInputClick = () => {
        setShowMenu(!showMenu)
        setSelectedPosition({row: rowNum, boat_pos: leftRightPosition })
    }

    const filterPaddlers = (row?: number, boat_pos?: number): Paddler => {
        const paddlerByRow:Paddler[] = activeRosterState.filter(paddler => paddler.row == row)

        if (row == 11 || row == 15) {
            return paddlerByRow[0] || defaultPaddler
        }
        if (boat_pos && boat_pos > 0 && paddlerByRow.length > 0){
            const paddlerBySide = paddlerByRow.find((paddler) => paddler.boat_pos == boat_pos)
            if (paddlerBySide !== undefined){
                return paddlerBySide
            } else {
                return defaultPaddler
            }
        }
        return paddlerByRow[0] || defaultPaddler
    };


    // onItemClick() function is prop-drilled; triggered when a dropdown item is selected.
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
        // changes/resets the activeRosterState's individual information.
        resetSeat(paddlerName, row, pos)
        // helps to clear the useState in "RosterItem"
        toggleClear(0)
        // sets the current paddler back to default (empty information).
        setSelectedPaddler(defaultPaddler)
    }

    const openModal = () => {
        closeMenu()
        setSelectedPosition({row: rowNum, boat_pos: leftRightPosition })
        setModalState(true)
        console.log(rowNum, leftRightPosition)
    }

    const closeMenu = () => {
        setShowMenu(false)
    }

    const handleInternalClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        event.stopPropagation();
    };

    return (
        <>
            <div className=" flex justify-center  w-[100%]">
                <div 
                    className={` ${showMenu && rowNum == selectedPosition.row || modalState && rowNum == selectedPosition.row? "bg-red-600":""} flex flex-row w-[100%] h-[25px] px-1 border-2 rounded-md items-center justify-between relative hover:cursor-pointer`}>
                    <SeatingDelete 
                        rowNum={rowNum}
                        position={position}
                        selectedPaddler={selectedPaddler}
                        deleteSeatSelection={deleteSeatSelection}/>
                    <div 
                        ref={inputRef} 
                        onClick={handleInputClick} 
                        className="dropdown-input w-[80%] ">
                        <div className="flex flex-row justify-between">
                            <div className="w-[100%] flex flex-row justify-between text-sm overflow-x-hidden">
                                {selectedPaddler.name &&
                                    <div className="font-bold">
                                        {selectedPaddler.name}
                                    </div>
                                }
                                { selectedPaddler.weight > 0 && showWeight &&
                                    <div className="">
                                        {selectedPaddler.weight}
                                    </div>
                                }   
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
                        setSelectedPosition={setSelectedPosition}
                        setSelectedPaddler={setSelectedPaddler}/>
                    { showMenu && (
                        <div 
                            className="fixed z-50 top-0 left-0 backdrop-blur-sm  display:none w-screen h-screen hover:cursor-default"
                            >
                            <div
                                onClick={handleInternalClick }
                                className={`p-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-xl bg-white z-20 w-[260px] rounded-lg h-auto max-h-[500px]`} >
                                <div className="flex flex-row justify-end">
                                    <button 
                                        className=" self-end"
                                        onClick={closeMenu}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-black">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="font-bold h-[60px]">
                                    <div>Choose Paddler:</div> 
                                    <div>{rowNum > 0 && rowNum < 11 ? `row ${rowNum}` : ""} - {position}</div>
                                </div>
                                <div className="h-auto max-h-[400px] rounded-b-lg overflow-y-scroll p-1 pb-3">
                                    <ul className="border-2 rounded-md">
                                        <li >
                                            <div
                                                className={`flex flex-row justify-between border-b-2  pl-2 text-left border-md `} >
                                                <div className="w-[50%] flex flex-row ">
                                                    <div className="font-bold">
                                                        { selectedPaddler.name } 
                                                    </div>
                                                </div>
                                                <div className="w-[50%] flex flex-row justify-between">
                                                    <div className="text-left">
                                                        { selectedPaddler.weight && 
                                                            showWeight
                                                            ?
                                                            <>
                                                                {selectedPaddler.weight} lb
                                                            </>
                                                            :
                                                            <></>
                                                            }
                                                    </div>      
                                                    <div className="text-left italic">
                                                        { selectedPaddler.adj_perg_500_sec 
                                                            ?
                                                            <>
                                                                { selectedPaddler.adj_perg_500_sec} s
                                                            </>
                                                            :
                                                            <></>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <input
                                                ref={searchRef} 
                                                className="w-full">
                                            </input>
                                        </li>
                                        <li>
                                            <button
                                                value="add-paddler"
                                                onClick={openModal}
                                                className={`border-b-2 w-[100%] bg-purple-100 pl-2 text-left border-md hover:cursor-pointer hover:bg-gray-500 hover:text-white`} >
                                                    - add paddler -
                                            </button>
                                        </li>
                                    { activeRosterState && 
                                        activeRosterState.map((paddlerInfo, idx) => (
                                            <DropdownElement 
                                                key={idx}
                                                paddlerInfo={ paddlerInfo } 
                                                setSelectedPosition={setSelectedPosition}
                                                closeMenu={closeMenu}
                                                dropdownPosition={ dropdownPosition }
                                                onItemClick={onItemClick}
                                                />
                                        ))
                                    }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default DropdownCustom