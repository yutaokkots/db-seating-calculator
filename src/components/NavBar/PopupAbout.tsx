import React from 'react'

interface PopupAboutProps {
    setShowAbout: React.Dispatch<React.SetStateAction<boolean>>;
    showAbout: boolean;
}
const PopupAbout:React.FC<PopupAboutProps> = ({ showAbout, setShowAbout}) => {
    const closeAbout = () => {
        setShowAbout(false)
    }
    return (
        <>
            {showAbout &&
                <div 
                    className="fixed z-50 top-0 left-0 backdrop-blur-md display:none w-screen h-screen hover:cursor-default"
                    onClick={closeAbout}
                    >
                    <div className="rounded-lg p-2 px-4 text-black w-[320px] h-[300px] z-60 bg-white/100 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl">
                        <div className="flex flex-row justify-end">
                            <button 
                                className="mt-2 mr-2 self-end"
                                onClick={closeAbout}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="font-bold text-lg">Dragon Boat Calculator</h1>
                            <p className="text-left">This dragonboat calculator is a simple proof-of-concept web app that loads paddler information, and helps to see weight distribution on a dragon boat.</p>
                            <p className="text-left">The app was created by <a href="http://oktsdesign.com" className="underline hover:cursor-pointer" target="_blank">Yuta Okkotsu</a> for <a href="http://www.coloradorpt.org" className="underline hover:cursor-pointer" target="_blank">Colorado RPT</a></p>
                            <p className="text-right">v 1.2.2</p>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default PopupAbout