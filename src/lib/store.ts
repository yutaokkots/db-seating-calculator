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
    boat_pos?: string;
}

export interface paddlerDataStore {
    paddlersState: Paddler[];
    activeRosterState: Paddler[]
    setPaddlersState: (paddlerData: Paddler[]) => void;
    setRosterState: (updateFnOrData: Paddler[] | ((prevState: Paddler[]) => Paddler[])) => void;
    addPaddlerToRoster: (newPaddler: Paddler) => void;
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
        set((state) => ({
            activeRosterState: [...state.activeRosterState, newPaddler]
        }))
    }

}))


/** 
* States holding the modal information.
* @state {} modalState - boolean for whether modal is open for entering paddler information.
* @function setModalState - sets the modalState. 
*/

export interface ModalDataStore {
    modalState: boolean;
    setModalState: (status:boolean) => void;
}

export const useModalDataStore = create<ModalDataStore>((set) => ({
    modalState: false,
    setModalState: (status: boolean) => {
        set({modalState: status})
    }
}))

