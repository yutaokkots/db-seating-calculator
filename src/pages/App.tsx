import React, { useState, useEffect } from 'react'
import './App.css'
import BoatInterface from '../components/BoatInterface'


const App:React.FC = () => {
  const [ windowSize, setWindowSize] = useState<{width: number; height: number;}>({
    width: window.innerWidth,
    height : window.innerHeight
  })
  const [count, setCount] = useState(0)

  useEffect(() => {
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
        <div className="text-red-50 text-lg">
          Dragon Boat Seat Placer
        </div>
        <div className="flex ">
          <BoatInterface windowSize={windowSize}/>
        </div>
      </div>
    </>
  )
}

export default App;
