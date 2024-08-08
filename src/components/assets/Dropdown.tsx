import React, { useState, useEffect, useRef } from 'react'
import { Paddler } from '../../common/types';
import { 
    usePaddlerDataStore, paddlerDataStore, 
    useWeightStore, WeightStore,
    // useSelectedPositionStore, SelectedPositionStore,
    } from '../../lib/store';
import MiniBoat from '../MiniBoat';
import DropdownElement from './DropdownElement';

interface DropdownProps {
    showMenu: boolean;
    closeMenu: () => void;
    rowNum: number;
    position:string;
    selectedPaddler: Paddler;
    openAddPaddlerModal: () => void;
    leftRightPosition: number;
    onItemClick: (selectedPaddlerId: string) => void;
    selectedIndex: number;
    setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Dropdown:React.FC<DropdownProps> = ({
        showMenu, 
        closeMenu, 
        rowNum, 
        position,
        selectedPaddler, 
        openAddPaddlerModal, 
        leftRightPosition, 
        onItemClick,
        selectedIndex,
        setSelectedIndex
    }) => {

    const { showWeight }:WeightStore = useWeightStore();
    const { activeRosterState }:paddlerDataStore  = usePaddlerDataStore();

    // Search input, saves the input to help search in dropdown
    const [ searchInput, setSearchInput ] = useState<string>('');

    // stores string value in the search
    const searchRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (showMenu && searchRef.current){
            searchRef.current.focus();
        }
    }, [ showMenu ])

    // Keeps track of which dropdown element is being selected.
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
    // the useEffect adjusts the dropdown element so it is in view.
    useEffect(() => {
        if (itemRefs.current[selectedIndex]) {
            itemRefs.current[selectedIndex]?.scrollIntoView({
                behavior: 'auto',
                block: 'nearest',
            });
        }
    }, [selectedIndex]);

    const filteredRoster = activeRosterState
            .filter(paddler => 
                paddler.name.toLowerCase().includes(searchInput.toLowerCase())
            )
            .sort((a, b) => 
                a.name.localeCompare(b.name)
            );


    const handleSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
            setSearchInput(evt.target.value)
        }

    const handleKeyDownAddPaddler = (evt: React.KeyboardEvent<HTMLButtonElement>) => {
        if (evt.key === "Enter"){
            openAddPaddlerModal()
        }
    }

    const handleInternalClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        event.stopPropagation();
    };

    return (
        <>
            { showMenu && (
                <div 
                    onClick={closeMenu}
                    className="transform-none fixed z-50 top-0 left-0 backdrop-blur-sm display:none w-screen h-screen hover:cursor-default"
                    >
                    <div
                        onClick={ handleInternalClick }
                        className={`p-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-xl bg-white z-20 w-[320px] rounded-lg h-auto max-h-[500px]`} >
                        <div className="flex flex-row justify-end">
                            <button 
                                className=" self-end"
                                onClick={closeMenu}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="">
                            <div className="font-bold ">
                                <div className="text-lg">Choose Paddler:</div> 
                            </div>
                            { selectedPaddler.name != "" &&
                            <div
                                className={`flex flex-row justify-between border-t-2 border-b-2 text-left border-md w-[300px] p-3`} >
                                <div className="w-[35%] flex flex-row ">
                                    <div className="font-bold">
                                        { selectedPaddler.name } 
                                    </div>
                                </div>
                                <div className="w-[25%]  flex flex-row justify-between items-center p-1">
                                    <div className={`${selectedPaddler.drummer ? 'bg-[#712d46]': ''} w-[12px] h-[12px] border  rounded-full`}></div>
                                    <div className={`${selectedPaddler.pacer   ? 'bg-[#c01f0d]': ''} w-[12px] h-[12px] border  rounded-full`}></div>
                                    <div className={`${selectedPaddler.engine  ? 'bg-[#ebc328]': ''} w-[12px] h-[12px] border  rounded-full`}></div>
                                    <div className={`${selectedPaddler.rocket  ? 'bg-[#a0b6ac]': ''} w-[12px] h-[12px] border  rounded-full`}></div>
                                    <div className={`${selectedPaddler.stern   ? 'bg-[#163552]': ''} w-[12px] h-[12px] border  rounded-full`}></div>
                                </div>
                                <div className="w-[40%] flex flex-row justify-between">
                                    <div className="text-left">
                                        { selectedPaddler.weight && 
                                            showWeight
                                            ?
                                            <>
                                                {selectedPaddler.weight} lb
                                            </>
                                            :
                                            <></>
                                            }
                                    </div>      
                                    <div className="text-left italic">
                                        { selectedPaddler.adj_perg_500_sec 
                                            ?
                                            <>
                                                { selectedPaddler.adj_perg_500_sec} s
                                            </>
                                            :
                                            <></>
                                        }
                                    </div>
                                </div>
                            </div>
                            }
                        </div>
                        <div className="relative w-[350px] h-[100px]">
                            <div className="absolute left-[185px] w-[70px] h-[150px] font-sans top-2 ">
                                <div className="text-left h-3 text-sm text-[#712d46] ">Drummer</div>
                                <div className="text-left h-3 text-sm text-[#c01f0d] ">Pacer</div>
                                <div className="text-left h-3 text-sm text-[#ebc328] ">Engine</div>
                                <div className="text-left h-3 text-sm text-[#a0b6ac] ">Rocket</div>
                                <div className="text-left h-3 text-sm text-[#163552] ">Steerer</div>
                            </div>
                            <div className="absolute right-8 top-3  w-[70px]">
                                    <div className="flex flex-col gap-[2px] ">
                                        <div className={`w-[10px] h-[10px] rounded-full ${rowNum == 15                  ? "bg-[#712d46] " : ""} border`}></div>
                                        <div className={`w-[10px] h-[10px] rounded-full ${rowNum >= 1 && rowNum <= 4    ? "bg-[#c01f0d] " : ""} border`}></div>
                                        <div className={`w-[10px] h-[10px] rounded-full ${rowNum >= 4 && rowNum <= 7    ? "bg-[#ebc328] " : ""} border`}></div>
                                        <div className={`w-[10px] h-[10px] rounded-full ${rowNum >= 8 && rowNum <= 10   ? "bg-[#a0b6ac] " : ""} border`}></div>
                                        <div className={`w-[10px] h-[10px] rounded-full ${rowNum == 11                  ? "bg-[#163552] " : ""} border`}></div>
                                    </div>
                                </div>
                            
                            <div className="absolute bottom-0 right-14 shadow-md z-10 w-[100px]">
                                <button
                                    value="add-paddler"
                                    onClick={openAddPaddlerModal}
                                    onKeyDown={handleKeyDownAddPaddler}
                                    className={`w-full font-bold bg-purple-100 border border-purple-400 rounded-md  text-center border-md hover:cursor-pointer hover:bg-gray-500 hover:text-white`} >
                                        new paddler
                                </button>
                            </div>
                            <div className="absolute left-2">
                                <div className=" absolute font-bold left-10 ">{rowNum > 0 && rowNum < 11 ? `row ${rowNum} -` : ""}  {position}</div>

                                <MiniBoat 
                                    rowNum={rowNum}
                                    leftRightPosition={leftRightPosition}/>
                            </div>
                            <div className="absolute left-[109px] -top-2" >
                                <div className="relative w-[90px] h-[90px]">
                                    <div className="absolute w-full bottom-0  left-[12px] h-[1px] rounded-md bg-[#712d46] origin-bottom-left -rotate-45"></div>
                                    <div className="absolute w-[80%] bottom-0 left-[24px] h-[1px] rounded-md bg-[#c01f0d] origin-bottom-left -rotate-45"></div>
                                    <div className="absolute w-[60%] bottom-0 left-[36px] h-[1px] rounded-md bg-[#ebc328] origin-bottom-left -rotate-45"></div>
                                    <div className="absolute w-[40%] bottom-0 left-[48px] h-[1px] rounded-md bg-[#a0b6ac] origin-bottom-left -rotate-45"></div>
                                    <div className="absolute w-[20%] bottom-0 left-[60px] h-[1px] rounded-md bg-[#163552] origin-bottom-left -rotate-45"></div>
                                </div>
                                <div className="flex flex-row justify-between p-1 w-[70px]">
                                    <div className="w-[12px] h-[12px] rounded-full bg-[#712d46] border border-gray-300"></div>
                                    <div className="w-[12px] h-[12px] rounded-full bg-[#c01f0d] border border-gray-300"></div>
                                    <div className="w-[12px] h-[12px] rounded-full bg-[#ebc328] border border-gray-300"></div>
                                    <div className="w-[12px] h-[12px] rounded-full bg-[#a0b6ac] border border-gray-300"></div>
                                    <div className="w-[12px] h-[12px] rounded-full bg-[#163552] border border-gray-300"></div>
                                </div>
                            </div>
                        </div>
                        <div className="mx-1 mt-1 rounded-md">
                            <input
                                    placeholder='search'
                                    ref={searchRef} 
                                    value={searchInput}
                                    onChange={handleSearchChange}
                                    className="w-full flex h-[25px] px-1 py-2 border-2 rounded-sm items-center justify-between">
                            </input>
                        </div>
                        <div className="h-auto max-h-[240px] rounded-b-lg overflow-y-scroll p-1 pb-3">

                            <ul className="border-2 rounded-md">
                            { activeRosterState && 
                                filteredRoster.map((paddlerInfo, idx) => (
                                    <DropdownElement 
                                        key={idx}
                                        paddlerInfo={ paddlerInfo } 
                                        closeMenu={closeMenu}
                                        onItemClick={onItemClick}
                                        idx={idx}
                                        searchInput={searchInput}
                                        setSelectedIndex={setSelectedIndex}
                                        ref={(el) => itemRefs.current[idx] = el} 
                                        stylingClass={
                                            idx === selectedIndex ? 'bg-gray-500 text-white' : ''
                                        }
                                        />
                                ))
                            }
                            </ul>
                        </div>
                    </div>
                </div>
                )
            }    
        </>
    )
}

export default Dropdown