import React, {useState} from 'react'
import ClearAll from './ClearAll'
import SaveState from './SaveState';
import LoadState from './LoadState';
import Loader from './Loader';
import SaverModal from './SaverModal';

const ControlArea:React.FC = () => {
    // shows or hides the Loader modal
    const [ showLoader, setShowLoader ] = useState<boolean>(false)
    const [ showSaver, setShowSaver ] = useState<boolean>(false)

    return (
        <div
            className=' p-2 mx-2"'>
            <div className="rounded-lg bg-slate-50 gap-2 p-2 flex justify-center">
                <div className="w-[330px] sm:w-[350px] flex flex-row justify-between">
                    <div>
                        <LoadState 
                            setShowLoader={setShowLoader}/>
                    </div>
                    <div className=" flex flex-row justify-center gap-2">
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
            {showLoader && 
                <Loader 
                    setShowLoader={setShowLoader}/>
            }
            {showSaver && 
                <SaverModal 
                    setShowSaver={setShowSaver}/>

            }
        </div>
    )
}

export default ControlArea