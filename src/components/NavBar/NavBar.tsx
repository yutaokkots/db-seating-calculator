import React from 'react'

interface NavProps {
    setShowInfo: React.Dispatch<React.SetStateAction<boolean>>;
    setShowAbout: React.Dispatch<React.SetStateAction<boolean>>;
}
const NavBar:React.FC<NavProps> = ({ setShowAbout, setShowInfo}) => {
    const handleKeyDownInfo = (evt: React.KeyboardEvent<HTMLDivElement>) => {
        if (evt.key === "Enter"){
            setShowInfo(true)
        }
    }

    const handleKeyDownAbout = (evt: React.KeyboardEvent<HTMLDivElement>) => {
        if (evt.key === "Enter"){
            setShowAbout(true)
        }
    }
    return (
        <nav
            className="flex justify-center py-1 z-50 shadow-2xl w-full h-14 fixed top-0 left-0 backdrop-filter backdrop-blur-xl opacity-95 bg-pink-900/80">
                <div className="flex justify-center w-[300px] ">
                    <ul
                        className="flex flex-row items-center w-[300px] justify-between">
                        <li>
                            <a href="http://www.coloradorpt.org" target="_blank">
                                <img src="/rpt-logo.png" className="w-[45px] h-[45px]" alt="RPT Logo" />
                            </a>
                        </li>
                        <li>
                            <div
                                onClick={() => {setShowInfo(true)}} 
                                onKeyDown={handleKeyDownInfo}
                                tabIndex={0}
                                className="font-bold text-white hover:cursor-pointer">
                                Info
                            </div>
                        </li>
                        <li>
                            <div 
                                onClick={() => {setShowAbout(true)}}
                                onKeyDown={handleKeyDownAbout}
                                tabIndex={0}
                                className="font-bold text-white hover:cursor-pointer">
                                About
                            </div>
                        </li>
                    </ul>
                </div>

        </nav>    
    )
}

export default NavBar