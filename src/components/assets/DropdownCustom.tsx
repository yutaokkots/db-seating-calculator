import React, {useState, useEffect, useRef, forwardRef} from 'react'
import { 
    usePaddlerDataStore, paddlerDataStore, 
    useModalDataStore, ModalDataStore, 
    useSelectedPositionStore, SelectedPositionStore,
        } from '../../lib/store';
import SeatingDelete from '../SeatingDelete';
import PopupForm from '../PopupForm';
import { Paddler } from '../../common/types';
import { SeatSelectionType } from '../../common/types';
import Dropdown from './Dropdown';

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
    row: -1,
    boat_pos: -1,
};

interface IconProps {
    isOpen: boolean;
}

const Icon:React.FC<IconProps> = ({ isOpen }) => {
    return (
        <svg viewBox="0 0 15 30" width="10" height="10" stroke="#222" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className={isOpen ? 'translate' : ''}>
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    );
};

export type SelectedPosition = {
    row: number,
    boat_pos: number
}

interface DropdownProps {
    rowNum: number;
    position:string;    //  "drum", "stern", "left", "right"
}

const DropdownCustom = forwardRef<{ openMenu:() => void }, DropdownProps>( (props ) => {
    const { rowNum, position } = props;
    // Load active roster state from the zustand store
    const { activeRosterState, resetSeat, toggleClear, 
        clearAllToggle, changePaddlerStatus,
        updateBoatStateFromRoster,
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
        updateBoatStateFromRoster(activeRosterState)
        //console.log(activeRosterState)
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
        setSelectedPaddler({
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
            row: -1,
            boat_pos: -1,
        })
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
                // Resets the index of the chosen dropdown.
                setSelectedIndex(-1)
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [showMenu, selectedIndex]);

    // Keeps track of which dropdown element is being selected.
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
    // the useEffect adjusts the dropdown element so it is in view.
    useEffect(() => {
        if (itemRefs.current[selectedIndex]) {
            itemRefs.current[selectedIndex]?.scrollIntoView({
                behavior: 'auto',
                block: 'nearest',
            });
        }
    }, [selectedIndex]);

    const handleInputClick = () => {
        setShowMenu(!showMenu)
        setSelectedPosition(rowNum, leftRightPosition )
    }

    const handleKeyDown = (evt: React.KeyboardEvent<HTMLDivElement>) => {
        if (evt.key === "Enter"){
            handleInputClick()
        }
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
                //setBoatState("add", Number(selectedPaddlerId))
            }
        }
    }

    // deleteSeatSelection() clears a number of states, including:
    // 'activeRosterState:Paddler[]' global state (main source of truth); deletes a single paddler's info.
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
        // Resets the selected index (for arrow-key selection in dropdown).
        setSelectedIndex(-1)
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
        // setSelectedPaddler(defaultPaddler)
        // Resets the selected index (for arrow-key selection in dropdown).
        setSelectedIndex(-1)
        
    }


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
                        onKeyDown={handleKeyDown}
                        tabIndex={0} 
                        className=" w-[80%] h-[20px]">
                        <div className="flex flex-row justify-between items-center">
                            <div className="w-[100%] text-left  text-sm overflow-x-hidden">
                                {selectedPaddler.name &&
                                    <div className="font-bold text-nowrap">
                                        {selectedPaddler.name}
                                    </div>
                                }
                            </div>
                            <div className="">
                                <Icon isOpen={showMenu} />
                            </div>
                        </div>
                    </div>
                    <PopupForm 
                        rowNum={ rowNum }
                        leftRightPosition={ leftRightPosition } 
                        setSelectedPaddler={setSelectedPaddler}/>
                    <Dropdown 
                        showMenu={showMenu} 
                        closeMenu={closeMenu} 
                        rowNum={rowNum} 
                        position={position}
                        selectedPaddler={selectedPaddler} 
                        openAddPaddlerModal={openAddPaddlerModal} 
                        leftRightPosition={leftRightPosition} 
                        onItemClick={onItemClick}
                        selectedIndex={selectedIndex}
                        setSelectedIndex={setSelectedIndex}                    
                    />
                </div>
            </div>
        </>
    )
})

export default DropdownCustom