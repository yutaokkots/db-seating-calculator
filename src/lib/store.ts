/** 
 * Code to establish state management by Zustand.
 * See zustand-demo.pmnd.rs/ for details.
 */ 

import { create } from 'zustand'

/** 
* State holding the id (string) for the google spreadsheet url.
* @state {string |null} sheetIdState - represents the string for the google spreadsheet id.
* @function sheetIdStateSetter - sets the sheetIdState. 
*/

export interface SheetIdState {
    sheetIdState: string;
    setSheetIdState: (sheetId: string) => void;
}

export const useSheetStore = create<SheetIdState>((set) => ({
    sheetIdState: '',
    setSheetIdState: (sheetId) => {
        set({
            sheetIdState: sheetId
        })
    }
}))

/** 
* State holding the paddler information..
* @state {string |null} paddlersState - list of paddler objects.
* @function setPaddlersState - sets the paddlersState. 
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
    //setRosterState: (paddlerData: Paddler[]) => void;
    setRosterState: (updateFnOrData: Paddler[] | ((prevState: Paddler[]) => Paddler[])) => void;
    //setRosterState: (updateFn: (prevState: Paddler[]) => Paddler[]) => void;
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
    }
}))