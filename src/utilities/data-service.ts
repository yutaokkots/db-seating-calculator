/**
 * 
 * @param ssId:string, the google spreadsheet id.
 */

import sendRequest from "./send-requests"

const isError = (error: unknown): error is Error => {
    return error instanceof Error
}

const loadData = async() => {
    try{
        return await sendRequest()
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

export default loadData