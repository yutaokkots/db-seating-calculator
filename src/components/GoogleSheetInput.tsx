import React, { useState, ChangeEvent } from 'react'
import { useSheetStore, SheetIdState } from '../lib/store'
  // Global store that holds the sheetId for the google sheet url. 
  
  const GoogleSheetInput:React.FC = () => {
    const {sheetIdState, setSheetIdState}:SheetIdState = useSheetStore()
    const [urlString, setUrlString] = useState("");

    const extractId = (url:string): string|null => {
        const regex = /\/d\/([a-zA-Z0-9_-]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    const loadGoogleSheet = (urlStr:string) => {
        const extractedStr = extractId(urlStr)
        if (extractedStr && typeof extractedStr == "string"){
            setSheetIdState(extractedStr)
            console.log(sheetIdState)
        }
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUrlString(event.target.value)
    }
    const handleClick = () => {
        if (urlString){
            loadGoogleSheet(urlString)
        }
    }

    return (
        <>
            <div className="flex gap-2">
                <input 
                    className="border-2 border-gray-100 rounded-sm w-[300px] p-1"
                    placeholder='google spreadsheet link'
                    name="urlStringInput"
                    value={urlString}
                    onChange={handleInputChange}
                    >
                </input>
                <button 
                    className="border-2 border-gray-100 rounded-sm px-2 py-1"
                    onClick={handleClick}  
                    >Load</button>
                <button
                    className="border-2 border-gray-100 rounded-sm px-2 py-1"
                    >New</button>
            </div>
        </>
    )
}

export default GoogleSheetInput