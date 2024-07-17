/**
 * 
 * @param ssId:string, the google spreadsheet id.
 */

import sendRequest from "./send-requests"

export const loadData = async() => {
    return await sendRequest()
}