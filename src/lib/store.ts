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