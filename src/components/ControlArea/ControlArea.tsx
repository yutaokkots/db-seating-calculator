import React, {useState} from 'react'
import ClearAll from './ClearAll'
import SaveState from './SaveState';
import SaverModal from './SaverModal';
import ShareState from './ShareState';
import ShareModal from './ShareModal';

const ControlArea:React.FC = () => {
    // shows or hides the Loader modal
    const [ showSaver, setShowSaver ] = useState<boolean>(false)
    const [ showShare, setShowShare ] = useState<boolean>(false)

    return (
        <div
            className=' p-2 mx-2"'>
            <div className="rounded-lg bg-slate-50 gap-2 p-2 flex justify-center">
                <div className="w-[340px] sm:w-[350px] flex flex-row justify-between">
                    <div className=" flex flex-row justify-center gap-1">
                        <div>               
                            <ShareState 
                                setShowShare={setShowShare} />
                        </div>
                    </div>
                    <div className=" flex flex-row justify-center gap-1">
                        <div>
                            <ClearAll />
                        </div>
                        <div>
                            <SaveState 
                            setShowSaver={setShowSaver}/>
                        </div>
                    </div>
                </div>
            </div>
            {showSaver && 
                <SaverModal 
                    setShowSaver={setShowSaver}/>
            }
            {showShare && 
                <ShareModal
                    setShowShare={setShowShare}/>
            }
        </div>
    )
}

export default ControlArea