import React, { useState, useEffect } from 'react'
import './App.css'
import BoatInterface from '../components/BoatInterface'
import { paddlerDataStore, usePaddlerDataStore, Paddler } from '../lib/store'
import { loadData } from '../utilities/data-service'
import Loading from '../components/Loading'
import { WindowSize } from '../common/types'
import NavBar from '../components/NavBar/NavBar'
import PopupAbout from '../components/NavBar/PopupAbout'
import PopupInfo from '../components/NavBar/PopupInfo'

const App:React.FC = () => {
  // Dynamic window sizing for responsive UI.  
  const [ windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height : window.innerHeight
  })
  
  // helps to show the About and Info pages
  const [ showAbout, setShowAbout ] = useState<boolean>(false)
  const [ showInfo, setShowInfo ] = useState<boolean>(false)

  // Global store that holds list of Paddler objects. 
  const { setPaddlersState, setRosterState }:paddlerDataStore = usePaddlerDataStore()

  // Selects/filters data to include only those where item.roster == true.
  // Also adds new fields, row:number, boat_pos: number, and onBoat: boolean
  const filterRoster = (data: Paddler[]): Paddler[] => {
    return data
        .filter((item) => item.roster == true)
        .map((item) => ({
          ...item,
          boat_pos: 0,
          row: -1,
        })
       )
  }
 
  // Loads data from google spreadsheet.
  const loadSSData = async() => {
    await loadData()
      .then((res) => {
        // Retrieves 'paddlerState' from localStorage
        const localData = localStorage.getItem('paddlerState');
        // if 'paddlerState' does exist, then parses.
        const parsedLocalData = localData ? JSON.parse(localData) : null;
        // and compares localStorage data to information from the server.
        // if they are not the same, then loads the server info, and 
        // stores the server info into local storage.
        if (JSON.stringify(parsedLocalData) !== JSON.stringify(res)){
          setPaddlersState(res)
          localStorage.setItem('paddlerState', JSON.stringify(res))
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
      <NavBar 
        setShowInfo={setShowInfo}
        setShowAbout={setShowAbout} />
      <PopupAbout 
        setShowAbout={setShowAbout}
        showAbout={showAbout}/>
      <PopupInfo 
        setShowInfo={setShowInfo}
        showInfo={showInfo}
        />
      <div className="pt-14 ">
        <div className="bg-gradient-to-tl from-violet-200 to-white">
          <div className="text-black text-2xl font-bold font-sans">
            RPT Dragon Boat Seat Placement
          </div>
          <div className="flex justify-center">
            <Loading />
          </div>
          <div className="flex justify-center">
            <BoatInterface windowSize={windowSize} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
