import React from 'react'

interface NavProps {
    setShowInfo: React.Dispatch<React.SetStateAction<boolean>>;
    setShowAbout: React.Dispatch<React.SetStateAction<boolean>>;
}
const NavBar:React.FC<NavProps> = ({ setShowAbout, setShowInfo }) => {

    return (
        <nav
            className="flex justify-center py-1 shadow-xl w-full fixed top-0 left-0 backdrop-filter backdrop-blur-xl opacity-95 bg-pink-900/80">
                <div className="flex justify-center w-[300px]">
                    <ul
                        className="flex flex-row items-center w-[300px] justify-between">
                        <li>
                            <a href="http://www.coloradorpt.org" target="_blank">
                                <img src="/rpt-logo.png" className="w-[40px] h-[40px]" alt="RPT Logo" />
                            </a>
                        </li>
                        <li>
                            <div
                                onClick={() => {setShowInfo(true)}} 
                                className="font-bold text-white hover:cursor-pointer">
                                Info
                            </div>
                        </li>
                        <li>
                            <div 
                                onClick={() => {setShowAbout(true)}}
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