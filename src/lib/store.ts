/** 
 * Code to establish state management by Zustand.
 * See zustand-demo.pmnd.rs/ for details.
 */ 

import { create } from 'zustand'

/** 
* States holding the paddler information.
* @state {Paddler[]} paddlersState - holds initial data (all information retrieved from external source).
* @state {Paddler[]} activeRosterState - all active paddlers, as determined by Paddler.roster (true).
* @function setPaddlersState - sets the paddlersState. 
* @function setRosterState - sets the rosterState. 
*/

export interface Paddler {
    id: number;
    name: string;    
    weight: number;    
    adj_perg_500_sec: number;    
    position: string;    
    stroke: boolean;    
    pacer: boolean;    
    engine: boolean;    
    rocket: boolean;    
    drummer: boolean;    
    stern: boolean;    
    side_preference: number;
    roster: boolean;
    row?:number;
    boat_pos?: number; // -1: none, 1: left, 2: right
    onBoat?: boolean;
}

export interface ChangePaddlerStatus {
    (
        paddlerName: string,
        newRow?: number, 
        newBoatPos?: number
    ): void;
}

export interface paddlerDataStore {
    // stores the initial data upon loading.
    paddlersState: Paddler[];
    // stores the paddlers that are active in the roster.
    activeRosterState: Paddler[]; 
    // toggles between -1 and 1, indicates when a single dropdown/item should be cleared.
    clearStateToggle: number;
    // toggles between -1 and 1, indicates when all dropdowns/items should be cleared.
    clearAllToggle: number;
    // sets 'paddlersState' 
    setPaddlersState: (paddlerData: Paddler[]) => void;
    // sets 'activeRosterState' 
    setRosterState: (updateFnOrData: Paddler[] | ((prevState: Paddler[]) => Paddler[])) => void;
    // adds a new Paddler to the activeRosterState
    addPaddlerToRoster: (newPaddler: Paddler) => void;
    // filters through the activeRosterState and resets the particular paddler. Then sorts the roster.
    resetSeat: (paddlerName: string, newRow?: number, newBoatPos?: string) => void;
    // updates the paddler information for specific paddler. Then sorts the roster.
    changePaddlerStatus: (paddlerName: string, newRow?:number,newBoatPos?:number) => void;
    // toggler that is placed in certain locations to trigger useEffect, found in its dependency array
    toggleClear: (choice: number) => void;
    // sorts the roster
    sortActiveRosterState: () => void;
    // boatState holds the Paddler.id as an array of numbers
    boatState: number[];
    // counts the number of paddlers on the boat
    paddlerNumState: number;
    // adds/removes the paddler.id from the boatState
    setBoatState: (action: 'add' | 'remove', paddlerId: number) => void;
    // resets boatState and paddlerNumState
    clearBoatState: () => void;
    // takes in activeRosterState:Paddler[] and updates the global 'boatState'.
    updateBoatStateFromRoster: (newData: Paddler[]) => void;
}

export const usePaddlerDataStore = create<paddlerDataStore>((set) => ({
    paddlersState: [],
    activeRosterState: [],
    setPaddlersState: (paddlerData) => {
        set({
            paddlersState: paddlerData
        })
    },
    setRosterState: (updateFnOrData) => {
        set((state) => ({
            activeRosterState:
                typeof updateFnOrData === "function"
                ? updateFnOrData(state.activeRosterState)
                : updateFnOrData
        }))
    },
    addPaddlerToRoster: (newPaddler) => {
        set((state) => {
            const newPaddlerRow = newPaddler.row
            const newPaddlerBoatPos = newPaddler.boat_pos
            
            const updatedRoster = state.activeRosterState
            .map(paddler => 
                (paddler.row === newPaddlerRow && paddler.boat_pos === newPaddlerBoatPos)
                ? { ...paddler, row: -1, boat_pos: -1 }
                : paddler
            )
            .concat(newPaddler);  // Add the new paddler
            const rowPriority = [15, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, -1];      
            updatedRoster.sort((a, b) => {        
                if (a.row && b.row) {          
                    const aRowIndex = rowPriority.indexOf(a.row);          
                    const bRowIndex = rowPriority.indexOf(b.row);          
                    if (aRowIndex !== bRowIndex) {            
                        return aRowIndex - bRowIndex;          
                    }          
                        if (a.row === b.row) {            
                            if (a.boat_pos === 1 && b.boat_pos !== 1) {              
                                return -1;            
                            } else if (a.boat_pos !== 1 && b.boat_pos === 1) {              
                                return 1;            
                            } else if (a.boat_pos === 2 && b.boat_pos !== 2) {              
                                return -1;            
                            } else if (a.boat_pos !== 2 && b.boat_pos === 2) {              
                                return 1;            
                            }          
                        }        
                    }        
                    return a.name.localeCompare(b.name);     
                });      
            return {activeRosterState: updatedRoster}
        })
    },
    resetSeat: (paddlerName, newRow=-1, newBoatPos="") => {
        set((state) => {
            const updatedRoster = state.activeRosterState
                .map(paddler => 
                    paddler.name === paddlerName 
                        ?
                        {...paddler, row: -1, boat_pos: -1}
                        : 
                        paddler
                )
                .map(paddler => 
                    paddler.row == newRow 
                        && (paddler.boat_pos == 1 && newBoatPos == "left" || paddler.boat_pos == 2 && newBoatPos == "right")
                    ? 
                    {...paddler, row: -1, boat_pos: -1}
                    :
                    paddler
                )
            const rowPriority = [15, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, -1];      
            updatedRoster.sort((a, b) => {        
                if (a.row && b.row) {          
                    const aRowIndex = rowPriority.indexOf(a.row);          
                    const bRowIndex = rowPriority.indexOf(b.row);          
                    if (aRowIndex !== bRowIndex) {            
                        return aRowIndex - bRowIndex;          
                    }          
                        if (a.row === b.row) {            
                            if (a.boat_pos === 1 && b.boat_pos !== 1) {              
                                return -1;            
                            } else if (a.boat_pos !== 1 && b.boat_pos === 1) {              
                                return 1;            
                            } else if (a.boat_pos === 2 && b.boat_pos !== 2) {              
                                return -1;            
                            } else if (a.boat_pos !== 2 && b.boat_pos === 2) {              
                                return 1;            
                            }          
                        }        
                    }        
                    return a.name.localeCompare(b.name);      
                });      
            return {activeRosterState: updatedRoster}
        })
    },
    changePaddlerStatus: (paddlerName, newRow=-1, newBoatPos=-1)  => {
        set((state) => {
            const updatedRoster = state.activeRosterState
            .map(paddler => 
                paddler.row === newRow && paddler.boat_pos === newBoatPos
                ? {...paddler, row:-1, boat_pos: -1}
                : paddler)
            .map(paddler => 
                paddler.name === paddlerName
                    ? {...paddler, row:newRow, boat_pos: newBoatPos}
                    : paddler
                )
            const rowPriority = [15, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, -1];      
            updatedRoster.sort((a, b) => {        
                if (a.row && b.row) {          
                    const aRowIndex = rowPriority.indexOf(a.row);          
                    const bRowIndex = rowPriority.indexOf(b.row);          
                    if (aRowIndex !== bRowIndex) {            
                        return aRowIndex - bRowIndex;          
                    }          
                        if (a.row === b.row) {            
                            if (a.boat_pos === 1 && b.boat_pos !== 1) {              
                                return -1;            
                            } else if (a.boat_pos !== 1 && b.boat_pos === 1) {              
                                return 1;            
                            } else if (a.boat_pos === 2 && b.boat_pos !== 2) {              
                                return -1;            
                            } else if (a.boat_pos !== 2 && b.boat_pos === 2) {              
                                return 1;            
                            }          
                        }        
                    }        
                    return a.name.localeCompare(b.name);     
                });      
            return {activeRosterState: updatedRoster}
            }
        )},
    clearStateToggle: -1,
    clearAllToggle: -1,
    toggleClear: (choice) => {
        set((state) => {
            if (choice == 0){
                return { clearStateToggle: -state.clearStateToggle } 
            } else if (choice == 1){
                return { clearAllToggle: -state.clearAllToggle }
            }
            return {}
        })
    },
    sortActiveRosterState: () => {    
        set((state) => {      
            const rowPriority = [15, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, -1];      
            const sortedRoster = [...state.activeRosterState].sort((a, b) => {        
                if (a.row && b.row) {          
                    const aRowIndex = rowPriority.indexOf(a.row);          
                    const bRowIndex = rowPriority.indexOf(b.row);          
                    if (aRowIndex !== bRowIndex) {            
                        return aRowIndex - bRowIndex;          
                    }          
                        if (a.row === b.row) {            
                            if (a.boat_pos === 1 && b.boat_pos !== 1) {              
                                return -1;            
                            } else if (a.boat_pos !== 1 && b.boat_pos === 1) {              
                                return 1;            
                            } else if (a.boat_pos === 2 && b.boat_pos !== 2) {              
                                return -1;            
                            } else if (a.boat_pos !== 2 && b.boat_pos === 2) {              
                                return 1;            
                            }          
                        }        
                    }        
                    return a.name.localeCompare(b.name);       
                }
            );      
            return { activeRosterState: sortedRoster };    
        });  
    },
    boatState: [],
    paddlerNumState: 0,
    setBoatState: (action, paddlerId) => {
        set(state => {
            let newBoatState;
            if (action === 'add') {
                if (!state.boatState.includes(paddlerId)) {
                    newBoatState = [...state.boatState, paddlerId];
                } else {
                    newBoatState = state.boatState; // No change if id already exists
                }
            } else if (action === 'remove') {
                newBoatState = state.boatState.filter(id => id !== paddlerId);
            } else {
                newBoatState = state.boatState;
            }
            const newPaddlerNumState = newBoatState.length;
            return {
                boatState: newBoatState,
                paddlerNumState: newPaddlerNumState
            };
        });
    },
    clearBoatState: () => {        
        set({            
            boatState: [],            
            paddlerNumState: 0        
        });    
    },
    updateBoatStateFromRoster: (newData: Paddler[]) => {        
        set(() => {
            const newBoatState = newData
                .filter(paddler => paddler.row && paddler.row > 0)
                .map(paddler => paddler.id);
            return {
                boatState: newBoatState,
                paddlerNumState: newBoatState.length
            };
        });
    }
}))


/** 
* States holding the modal information for entering paddler information.
* @state {} modalState - boolean for whether modal is open for entering paddler information.
* @function setModalState - sets the modalState. 
*/

export interface ModalDataStore {
    modalState: boolean;
    setModalState: (status:boolean) => void;
    showMenu: boolean;
    setShowMenu: (status:boolean) => void;
}

export const useModalDataStore = create<ModalDataStore>((set) => ({
    modalState: false,
    setModalState: (status: boolean) => {
        set({modalState: status})
    },
    // not being used?:
    showMenu: false,
    setShowMenu: (status: boolean) => {
        set({showMenu: status})
    }
}))

/** 
* States holding which seat position is selected by the user. 
* @state {} selectedPosition - an object that holds the row and boat_pos information selected by user.
* @function setSelectedPosition - sets the selectedPosition. 
*/

export type SelectedPosition = {
    row: number,
    boat_pos: number
}

export interface SelectedPositionStore {
    selectedPosition: SelectedPosition;
    setSelectedPosition: (row: number, boat_pos:number) => void;
}

export const useSelectedPositionStore = create<SelectedPositionStore>((set) => ({
    selectedPosition: {row: -1, boat_pos: -1},
    setSelectedPosition: (row: number, boat_pos: number) => {
        set({
            selectedPosition: {row, boat_pos}
        })
    }
}))



/** 
* States holding the information for displaying or hiding sensitive paddler information.
* @state {} showWeight - boolean for whether weight is displayed.
* @function setShowWeight - sets the showWeight state. 
*/

export interface WeightStore {
    showWeight: boolean;
    setShowWeight: () => void;
    paddlerNumber: number;
    setPaddlerNumber: (num: number) => void;
    toggleWeightDiff: boolean;
    setToggleWeightDiff: () => void;
}

export const useWeightStore = create<WeightStore>((set) => ({
    showWeight: true,
    setShowWeight: () => {
        set(state => ({showWeight: !state.showWeight}))
    },
    paddlerNumber: 0,
    setPaddlerNumber: (num: number) => {
        set({paddlerNumber: num})
    },
    toggleWeightDiff: false,
    setToggleWeightDiff: () => {
        set(state => ({toggleWeightDiff: !state.toggleWeightDiff}))
    }
}))