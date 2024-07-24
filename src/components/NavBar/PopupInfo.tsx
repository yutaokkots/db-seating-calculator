import React from 'react'

interface PopupInfoProps {
    setShowInfo: React.Dispatch<React.SetStateAction<boolean>>;
    showInfo: boolean;
}

const PopupInfo:React.FC<PopupInfoProps> = ({ setShowInfo, showInfo }) => {
    const closeInfo = () => {
        setShowInfo(false)
    }
    return (
        <>
            {showInfo &&
                <div 
                    className=" fixed z-50 top-0 left-0 backdrop-blur-md display:none w-screen h-screen hover:cursor-default"
                    onClick={closeInfo}
                    >
                    <div className="rounded-lg p-2 px-4 text-black w-[320px] h-[460px] z-60 bg-white/100 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl">
                        <div className="flex flex-row justify-end">
                            <button 
                                className="mt-2 mr-2 self-end"
                                onClick={closeInfo}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="font-bold text-lg">Important</h1>
                            <p className="text-left">The app currently displays total weight information on left/right/front/back portions of the boat. </p>
                            <p className="text-left">It also includes <i>average</i> 500m pERG times (sec). Lower 'sec' is faster. Paddlers with no pERG information are not included in the average calculation.</p>
                            <p className="text-left">This app currently has no way to save boat rosters to the back-end. All saved information will be stored in the local machine, and data cannot be shared with other devices yet.</p>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default PopupInfo
