import React, { useState, useEffect } from 'react'
import './App.css'
import BoatInterface from '../components/BoatInterface'
import { useSheetStore, SheetIdState } from '../lib/store'
import GoogleSheetInput from '../components/GoogleSheetInput'
import { idGetter } from '../utilities/sheetIdSetterGetter'
import { loadData } from '../utilities/data-service'


const App:React.FC = () => {
  const [ windowSize, setWindowSize] = useState<{width: number; height: number;}>({
    width: window.innerWidth,
    height : window.innerHeight
  })
  // Global store that holds the sheetId for the google sheet url. 
  const { sheetIdState, setSheetIdState }:SheetIdState = useSheetStore()
  const [paddlerData, setPaddlerData] = useState({});

  const loadSSData = async() => {
    await loadData()
      .then((res) => {
        setPaddlerData(res)
        return res
      })
      .then((res) => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })

  }

  useEffect(() => {
      // load spreadsheet from localhost
      // const currentId = idGetter()
      // if (currentId){
      //   setSheetIdState(currentId)
      //   loadData(currentId)
      // }
      
      loadSSData()



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
