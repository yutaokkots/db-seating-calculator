import React, { useState, useEffect } from 'react'
import './App.css'
import BoatInterface from '../components/BoatInterface'
import { paddlerDataStore, usePaddlerDataStore, Paddler } from '../lib/store'
import { loadData } from '../utilities/data-service'
import Loading from '../components/Loading'

const App:React.FC = () => {
  const [ windowSize, setWindowSize] = useState<{width: number; height: number;}>({
    width: window.innerWidth,
    height : window.innerHeight
  })
  // Global store that holds the sheetId for the google sheet url. 
  const { setPaddlersState, setRosterState }:paddlerDataStore = usePaddlerDataStore()
  // Local states


  const filterRoster = (data: Paddler[]): Paddler[] => {
    return data
        .filter((item) => item.roster == true)
        .map((item) => ({
          ...item,
          boat_pos: "none",
          row: -1
        })
       )
  }
 

  const loadSSData = async() => {
    await loadData()
      .then((res) => {
        // Loads paddlersState to hold all information.
        if (res){
          setPaddlersState(res)
        }
        return res
      })
      .then((res)=>{  
        if (res){
          const rosterPaddlerObjects: Paddler[] = filterRoster(res)
          setRosterState(rosterPaddlerObjects) 
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
      // loads data from google spreadsheet 
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
        <div className="text-black text-2xl">
          RPT Dragon Boat Seat Placement
        </div>
        <div className="flex justify-center">
          <Loading />
        </div>
        <div className="flex justify-center">
          <BoatInterface windowSize={windowSize} />
        </div>
      </div>
    </>
  )
}

export default App;
