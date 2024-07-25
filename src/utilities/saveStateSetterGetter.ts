/**
 * Sets and gets the previously stored items from localstorage.
 * 'key': rosterKey, 'value': []
 */

import { Paddler } from "../common/types";

export type RosterKeyObject = {
    rosterKey: string,
    rosterName: string
    data: Paddler[]
}

export type RosterResult<T> = 
    | { success: true;
        rosterArray: T[]} 
    | { success: false;
        error: string } 


export const currentRosterSetter = (fileName:string, rosterSnapshot:Paddler[], uniqueID:string = "") => {
    try {
        const rosterKeys = localStorage.getItem("rosterKeys");
        let rosterArray:RosterKeyObject[]
        
        if (!rosterKeys){
            rosterArray = []
        } else {
            rosterArray = JSON.parse(rosterKeys)
        }
        let uid:string;
        if (uniqueID== ""){
            uid = generateUID();
        } else {
            uid = generateUID();
        }
        const newRoster = {
            rosterKey: uid,
            rosterName: fileName == "" ? "untitled" : fileName,
            data: rosterSnapshot
        }
        rosterArray.push(newRoster)
        localStorage.setItem("rosterKeys", JSON.stringify(rosterArray));
    } catch (err) {
        const errorMessage = (err as Error).message
        return {
            success: false,
            error: errorMessage
        }
    }

    // console.log(localStorage.length)
    // console.log(uid)
    // console.log(parseIDLocalTime(uid))
}

export const deleteSingleRoster = (keyName:string): RosterResult<RosterKeyObject> => {
    try{
        const rosterKeys = localStorage.getItem("rosterKeys");  
        if (rosterKeys){
            let rosterKeysArray = JSON.parse(rosterKeys);
            // Ensure the parsed data is an array
            if (!Array.isArray(rosterKeysArray)) {
                throw new Error("Data in localStorage is not an array");
            }
            rosterKeysArray = rosterKeysArray.filter((item: RosterKeyObject) => 
                item.rosterKey != keyName)
            localStorage.setItem("rosterKeys", JSON.stringify(rosterKeysArray));
            return { success: true, rosterArray: rosterKeysArray };
        } else {
        // Error handling when rosterKeys is not found in localStorage
            return { success: false, error: "No data found for 'rosterKeys' in localStorage." };
        }
    } catch (err) {
        const errorMessage = (err as Error).message
        return {
            success: false,
            error: errorMessage
        }
    }
}

export const retrieveSavedRosters = (): RosterResult<RosterKeyObject>  => {
    try{
        const savedRosters = localStorage.getItem("rosterKeys")
        if (savedRosters){
            const rosterKeysArray:RosterKeyObject[] = JSON.parse(savedRosters)
            if (!Array.isArray(rosterKeysArray)) {
                throw new Error("Data in localStorage is not an array");
            }
            return { success: true, rosterArray: rosterKeysArray };
        } else {
            return { success: false, error: "No data found for 'rosterKeys' in localStorage." };
        }

    } catch(err){
        const errorMessage = (err as Error).message
        return {
            success: false,
            error: errorMessage
        }
    }
}

export const generateUID = () => {
    const now = new Date();
    const year = now.getUTCFullYear()
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');
    const hour = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    const randomNum = Math.random().toString(36).substring(2, 8)

    const uniqueID = `${year}${month}${day}${hour}${minutes}${seconds}${randomNum}`
    return uniqueID
}   

export const parseIDLocalTime = (uniqueId: string) => {
    const dateTimePart = uniqueId.split('-')[0]
    const year = parseInt(dateTimePart.substring(0, 4), 10);
    const month = parseInt(dateTimePart.substring(4, 6), 10) - 1; 
    const day = parseInt(dateTimePart.substring(6, 8), 10);
    const hours = parseInt(dateTimePart.substring(8, 10), 10);
    const minutes = parseInt(dateTimePart.substring(10, 12), 10);
    // UTC date object
    const utcDate = new Date(Date.UTC(year, month, day, hours, minutes));
    // local time
    const localYear = String(utcDate.getFullYear());
    const localMonth = String(utcDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const localDay = String(utcDate.getDate()).padStart(2,'0');
    const localHours = String(utcDate.getHours()).padStart(2, '0');
    const localMinutes = String(utcDate.getMinutes()).padStart(2, '0');

    return {localYear, localMonth, localDay, localHours, localMinutes};

}