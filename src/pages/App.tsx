import React, { useState, useEffect } from 'react'
import './App.css'
import BoatInterface from '../components/BoatInterface'
import { paddlerDataStore, usePaddlerDataStore, Paddler } from '../lib/store'
import { loadData } from '../utilities/data-service'
import Loading from '../components/Loading'
import { WindowSize } from '../common/types'

const App:React.FC = () => {
  // Dynamic window sizing for responsive UI.  
  const [ windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height : window.innerHeight
  })

  // Global store that holds list of Paddler objects. 
  const { setPaddlersState, setRosterState }:paddlerDataStore = usePaddlerDataStore()

  // Selects/filters data to include only those where item.roster == true.
  const filterRoster = (data: Paddler[]): Paddler[] => {
    return data
        .filter((item) => item.roster == true)
        .map((item) => ({
          ...item,
          boat_pos: 0,
          row: -1
        })
       )
  }
 
  // Loads data from google spreadsheet.
  const loadSSData = async() => {
    await loadData()
      .then((res) => {
        // Loads paddlersState to load all information from external resource.
        if (res){
          setPaddlersState(res)
        }
        return res
      })
      .then((res)=>{  
        // Refines paddler information to include only those in roster.
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
      // Loads data into global stores.
      loadSSData()

      // Set and handles change in window size.
      const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height : window.innerHeight
        })
      }
      window.addEventListener('resize', handleResize);
      
      // Unmounting this component removes the eventListener.
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
