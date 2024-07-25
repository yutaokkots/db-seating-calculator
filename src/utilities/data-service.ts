/**
 * 
 * @param ssId:string, the google spreadsheet id.
 */

import sendRequest from "./send-requests"

const isError = (error: unknown): error is Error => {
    return error instanceof Error
}

// const googleAppScript = import.meta.env.VITE_GOOGLE_APP_SCRIPT
const googleAppScriptGetPost:string = import.meta.env.VITE_GOOGLE_APP_SCRIPT_GETPOST
const mainData:string = import.meta.env.VITE_GOOGLE_APP_SCRIPT_SHEET1
const shareData:string = import.meta.env.VITE_GOOGLE_APP_SCRIPT_SHEET2

export const loadData = async() => {
    const url = `${googleAppScriptGetPost}?sheetNumber=${mainData}`
    try{
        return await sendRequest(url)
    } catch(error){
        if (isError(error) && error.message === 'Timeout'){
            console.log('Fetching data from local storage')
            const localData = localStorage.getItem('paddlerState')
            if (localData){
                return JSON.parse(localData);
            } else {
                throw new Error('No data available')
            }
        }
        else {
            throw error
        } 
    }
}

type UploadDataType = {
    rosterKey: string,
    rosterName: string,
    origin?:string,
    data: string

}

const fetchIP = async() => {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const ipaddress = await response.json();
        return ipaddress.ip
      } catch (error) {
        console.error('Error fetching the IP address:', error);
      }
}

export const uploadRoster = async(data:UploadDataType) => {
    const url = `${googleAppScriptGetPost}`
    const origin = await fetchIP()
    data.origin = origin
    try {
        return await sendRequest(url, "POST", data)
    }catch(error){
        console.log(error)
        throw error
    }
}

export const downloadRoster = async(rosterKey:string) => {
    const url = `${googleAppScriptGetPost}?sheetNumber=${shareData}&rosterKey=${rosterKey}`
    try {
        return await sendRequest(url)
    } catch(error){
        console.log(error)
        throw error
    }
}