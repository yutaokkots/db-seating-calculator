import React, { useState, useEffect } from 'react'
import './App.css'
import BoatInterface from '../components/BoatInterface'
import { useSheetStore, SheetIdState } from '../lib/store'
import GoogleSheetInput from '../components/GoogleSheetInput'

const googleSSUrl = import.meta.env.VITE_GOOGLE_SPREADSHEET_LINK

const App:React.FC = () => {
  const [ windowSize, setWindowSize] = useState<{width: number; height: number;}>({
    width: window.innerWidth,
    height : window.innerHeight
  })
  const [ssId, setSsId] = useState<string|null>("")

  // Global store that holds the sheetId for the google sheet url. 
  const {sheetIdState, setSheetIdState}:SheetIdState = useSheetStore()

  // extracts the spreadsheet id from the url string, 
  const extractId = (url:string): string|null => {
    const regex = /\/d\/([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }
  
  useEffect(() => {
      // load spreadsheet 
      if (googleSSUrl){
        const extractedStr = extractId(googleSSUrl)
        if (extractedStr){
          setSsId(extractedStr)
          setSheetIdState(extractedStr)
          console.log(ssId)
          console.log(sheetIdState)
        }
      }

      // save spreadsheet info to localhost


      // Displays window size
      const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height : window.innerHeight
        })
      }
      window.addEventListener('resize', handleResize);

      // Unmounting this component removes the eventListener and terminates worker thread.
      return () => {
        window.removeEventListener('resize', handleResize)
      }
  }, [])
  return (
    <>
      <div>
        <div className="text-red-500 text-lg">
          Dragon Boat Seat Placer
        </div>
        <div className="flex justify-center">
          <GoogleSheetInput />
        </div>
        <div className="flex justify-center">
          <BoatInterface windowSize={windowSize}/>
        </div>
      </div>
    </>
  )
}

export default App;
