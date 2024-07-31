import React, {useState, useEffect, useRef} from 'react'
import { 
    usePaddlerDataStore, paddlerDataStore, 
    useModalDataStore, ModalDataStore, 
    useWeightStore, WeightStore,
    useSelectedPositionStore, SelectedPositionStore,
        } from '../../lib/store';
import SeatingDelete from '../SeatingDelete';
import PopupForm from '../PopupForm';
import { Paddler } from '../../common/types';
import { SeatSelectionType } from '../../common/types';

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

interface DropdownElementProps {
    paddlerInfo: Paddler;
    onItemClick: (selectedPaddlerId: string) => void;
    closeMenu: () => void;
    stylingClass: string;
}

const DropdownElement:React.FC<DropdownElementProps> = ({ paddlerInfo, onItemClick, closeMenu, stylingClass }) => {
    // The active roster, saved as a list of paddler.id, number[].
    const { boatState }:paddlerDataStore = usePaddlerDataStore()
    // Showing or hiding sensitive information, boolean.
    const { showWeight }:WeightStore = useWeightStore();
    // Stores user-selected seat {row:number, boat_pos: number}.
    const { setSelectedPosition }:SelectedPositionStore = useSelectedPositionStore();
    // Shows or hides a dropdown element/item, boolean.
    const [ showOption, setShowOption ] = useState<boolean>(true); 
    
    useEffect(() => {
        const isInBoatState = boatState.includes(paddlerInfo.id);
        if (isInBoatState) {
            setShowOption(false);
        }
    }, [boatState, paddlerInfo.id])

    const handleItemClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
        const selectedPaddlerId = evt.currentTarget.value;
        // Resets the global 'selectedPosition' state that indicates the user's seat selection.
        setSelectedPosition(-1, -1)
        // 'onItemClick' is prop-drilled from parent component, and updates a number of states.
        onItemClick(selectedPaddlerId);
        // Updates the 'boatState' global state 
        closeMenu()
    }

    return(
        <>

                <li>
                    <button
                        value={paddlerInfo.id}
                        onClick={handleItemClick}
                        className={`${stylingClass} ${!showOption ? "text-gray-400": "" }  w-[100%] border-b-2 px-1 hover:cursor-pointer hover:bg-gray-500 hover:text-white`}>
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
    // Load active roster state from the zustand store
    const { activeRosterState, resetSeat, toggleClear, 
        clearAllToggle, changePaddlerStatus,
        setBoatState }:paddlerDataStore  = usePaddlerDataStore();
    // Shows or hides the menu to select a paddler
    const [showMenu, setShowMenu] = useState<boolean>(false)
    // Stores the selected paddler
    const [selectedPaddler, setSelectedPaddler] = useState<Paddler>(defaultPaddler)
    // stores string value in the search
    const searchRef = useRef<HTMLInputElement>(null)

    const inputRef = useRef<HTMLInputElement>(null)
    // Search input, saves the input to help search in dropdown
    const [ searchInput, setSearchInput ] = useState<string>('');
    // Saves the state for keyboard presses
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    // Stores which dropdown menu that the user has selected
    const { selectedPosition, setSelectedPosition }:SelectedPositionStore = useSelectedPositionStore();
    // Showing or hiding the modal for the form for adding a paddler 'PopupForm.tsx'
    const { modalState, setModalState }:ModalDataStore = useModalDataStore();

    // Showing or hiding sensitive information
    const { showWeight }:WeightStore = useWeightStore();

    // Stores the 'left', 'right' information; -1:default, 1="left", 2="right"
    const [ leftRightPosition, setLeftRightPosition ] = useState<number>(-1);

    const filteredRoster = activeRosterState
        .filter(paddler => 
            paddler.name.toLowerCase().includes(searchInput.toLowerCase())
        )
        .sort((a, b) => 
            a.name.localeCompare(b.name)
        );

    useEffect(()=>{
        let currRow = -1
        if (position == "drum"){
            //setdropdownPosition("drummer")
            currRow = 15
        } else if (position == "stern"){
            //setdropdownPosition("stern")
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
            //setdropdownPosition("pacer")         
        } else if (rowNum > 4 && rowNum < 8){
            //setdropdownPosition("engine")
        } else if (rowNum > 7 && rowNum < 11){
            //setdropdownPosition("rocket")
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
    
    // useEffect that is triggered by the 'clearAllToggle; global state, resets the 'selectedPaddler' state back to default.
    useEffect(() => {   
        setSelectedPaddler(defaultPaddler)
    },[clearAllToggle])

    // useEffect that allows selection of paddler with keystroke.
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!showMenu) return;
    
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                setSelectedIndex(prevIndex => (prevIndex + 1) % filteredRoster.length);
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                setSelectedIndex(prevIndex => (prevIndex - 1 + filteredRoster.length) % filteredRoster.length);
            } else if (event.key === 'Enter' && selectedIndex >= 0) {
                event.preventDefault();
                const selectedPaddlerId = filteredRoster[selectedIndex].id.toString();
                onItemClick(selectedPaddlerId);
                closeMenu();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [showMenu, selectedIndex]);

    const handleSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(evt.target.value)
    }

    const handleInputClick = () => {
        setShowMenu(!showMenu)
        setSelectedPosition(rowNum, leftRightPosition )
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

    // onItemClick() function is prop-drilled to 'DropdownElement'.
    // This function is triggered when a dropdown item is selected.
    // If its parameter is 'add-paddler', then 'openAddPaddlerModal()' is triggered.
    // Else searches for the paddler in the 'activeRosterState' using the paddler.id parameter.
    // Once found, stores the paddler locally in 'selectedPaddler' state, and
    // updates the 'activeRosterState' global state. 
    const onItemClick = (selectedPaddlerId: string) => {
        if (selectedPaddlerId == "add-paddler"){
            // Opens the form modal (PopupForm.tsx) to allow adding a paddler.
            openAddPaddlerModal()
        } else{
            const selectedPaddler = activeRosterState.find((paddler) => paddler.id && paddler.id.toString() == selectedPaddlerId)
            if (selectedPaddler){   
                // Sets the current paddler stored locally in 'selectedPaddler' with the Paddler information.
                setSelectedPaddler(selectedPaddler);
                // Updates the 'activeRosterState' global state
                changePaddlerStatus(selectedPaddler.name, rowNum, leftRightPosition)
                // Adds the specific paddler to 'boatState:number[]' state (which stores the paddler ids).
                setBoatState("add", Number(selectedPaddlerId))
            }
        }
    }

    // deleteSeatSelection() clears a number of states, including:
    // 'activeRosterState:Paddler[]' global state (main source of truth).
    // 'selectedPaddler:Paddler' local state (for displaying paddler information in this component).
    // 'clearToggleState: -1|1' is affected so that information in Roster component is updated.
    // 'searchInput:string' local state for displaying the user's search in the input area in dropdown menu.
    // 'boatState:number[]' global state that is an array that stores Paddler.id.
    const deleteSeatSelection: SeatSelectionType = (paddlerName, paddlerId, row, pos, ) => {
        // Changes/resets the activeRosterState's individual information.
        resetSeat(paddlerName, row, pos)
        // Option '0', helps to change the 'clearStateToggle' state, which helps to clear
        // the respective information in "RosterItem".
        toggleClear(0)
        // Sets the current paddler stored locally in 'selectedPaddler' back to default (empty information).
        setSelectedPaddler(defaultPaddler)
        // Resets the searchInput state search bar.
        setSearchInput("")
        // Removes the specific paddler from 'boatState:number[]' state (which stores the paddler ids).
        setBoatState("remove", paddlerId)
    }

    // 'openAddPaddlerModal()' opens the form (PopupForm.tsx) to allow adding paddler .
    const openAddPaddlerModal = () => {
        // Closes the dropdown menu 
        closeMenu()
        // Updates the global 'selectedPosition' state that indicates the user's seat selection.
        setSelectedPosition(rowNum, leftRightPosition )
        // Updates global 'modalState' state to open the (PopupForm.tsx) modal to add paddler.
        setModalState(true)
    }

    // 'closeMenu()' closes the dropdown menu.
    const closeMenu = () => {
        // Resets the search input state to "".
        setSearchInput("")
        // Hides the dropdown menu.
        setShowMenu(false)
    }

    const handleInternalClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        event.stopPropagation();
    };

    return (
        <>
            <div className=" flex justify-center  w-[100%]">
                <div 
                    className={`${showMenu && rowNum == selectedPosition.row && leftRightPosition == selectedPosition.boat_pos || 
                                modalState && rowNum == selectedPosition.row && leftRightPosition == selectedPosition.boat_pos ? "bg-red-600":""} 
                                flex flex-row w-[100%] h-[25px] px-1 border-2 rounded-md items-center justify-between relative hover:cursor-pointer`}>
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
                        setSelectedPaddler={setSelectedPaddler}/>
                    { showMenu && (
                        <div 
                            onClick={closeMenu}
                            className="fixed z-50 top-0 left-0 backdrop-blur-sm display:none w-screen h-screen hover:cursor-default"
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
                                                value={searchInput}
                                                onChange={handleSearchChange}
                                                className="w-full">
                                            </input>
                                        </li>
                                        <li>
                                            <button
                                                value="add-paddler"
                                                onClick={openAddPaddlerModal}
                                                className={`border-b-2 w-[100%] bg-purple-100 pl-2 text-left border-md hover:cursor-pointer hover:bg-gray-500 hover:text-white`} >
                                                    - add paddler -
                                            </button>
                                        </li>
                                    { activeRosterState && 
                                        filteredRoster.map((paddlerInfo, idx) => (
                                            <DropdownElement 
                                                key={idx}
                                                paddlerInfo={ paddlerInfo } 
                                                closeMenu={closeMenu}
                                                onItemClick={onItemClick}
                                                stylingClass={
                                                    idx === selectedIndex ? 'bg-gray-200' : ''
                                                }
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