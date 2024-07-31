import React, { useState, useEffect } from 'react'
import { 
    useModalDataStore, ModalDataStore, 
    usePaddlerDataStore, Paddler, paddlerDataStore,
    useSelectedPositionStore, SelectedPositionStore} from '../lib/store';

type FormInfoType = {
    name: string;
    weight: number;
}

interface PopupFormProps {
    rowNum: number;
    leftRightPosition: number; 
    setSelectedPaddler: React.Dispatch<React.SetStateAction<Paddler>>;
}

const PopupForm:React.FC<PopupFormProps> = ({ rowNum, leftRightPosition, setSelectedPaddler }) => {
    const [ formInfo, setFormInfo ] = useState<FormInfoType>({ name: "", weight: 0});
    const { addPaddlerToRoster, activeRosterState }: paddlerDataStore = usePaddlerDataStore();
    const { modalState, setModalState }:ModalDataStore = useModalDataStore();
    const { selectedPosition, setSelectedPosition }:SelectedPositionStore = useSelectedPositionStore();
    const [ error, setError ] = useState<boolean>(false)
    const [ weightError, setWeightError ] = useState<boolean>(false)

    useEffect(() => {
        const isNameFound = activeRosterState.some(paddler => paddler.name.toLowerCase() === formInfo.name.toLowerCase());
        setError(isNameFound);
    }, [formInfo.name])

    useEffect(() => {
        const isNumeric = /^\d+$/.test(`${formInfo.weight}`);
        const isValidWeight = formInfo.weight > 400 || formInfo.weight < 0 || !isNumeric
        setWeightError(isValidWeight);
    }, [formInfo.weight])

    const closeModal = () => {
        setModalState(false)
        setFormInfo({ name: "", weight: 0})
        setSelectedPosition( -1, -1)
    }

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = evt.target;
        setFormInfo({...formInfo, 
            [name]: value}
        )
    }

    const handleInternalClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        event.stopPropagation();
    };

    const findLastId = () => {
        return activeRosterState.reduce((maxId, paddler) => {
            return paddler.id > maxId ? paddler.id : maxId;
        }, 0) 
    }

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        if (formInfo.name == "" && formInfo.weight == 0 || formInfo.weight == 0){
            return
        } else{
            const newPaddler: Paddler = {
                id: 0,
                name: '',
                weight: 0,
                adj_perg_500_sec: 0,
                position: 'engine',
                stroke: true,
                pacer: true,
                engine: true,
                rocket: true,
                drummer: true,
                stern: true,
                side_preference: 0,
                roster: true
            };

            newPaddler.id = findLastId() + 1
            newPaddler.name = formInfo.name
            newPaddler.weight = Number(formInfo.weight)
            newPaddler.row = rowNum
            newPaddler.boat_pos = leftRightPosition
            addPaddlerToRoster(newPaddler)
            setSelectedPaddler(newPaddler)
        }
        closeModal()
    }
    return (
        <>
            { modalState && selectedPosition.row == rowNum && selectedPosition.boat_pos == leftRightPosition &&
            <div 
                className="fixed z-50 top-0 left-0 backdrop-blur-sm display:none w-screen h-screen hover:cursor-default"
                >
                <div 
                    onClick={handleInternalClick}
                    className="w-[320px] h-auto z-60 bg-white/90 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm shadow-xl rounded-xl hover:cursor-default">
                    <div className="flex flex-row justify-end">
                        <button 
                            className="mt-2 mr-2 self-end"
                            onClick={closeModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-black">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="font-bold">
                        <div>Add Paddler:</div> 
                        <div>{selectedPosition.row > 0 && selectedPosition.row < 11 ? `row ${selectedPosition.row}` : ""} - {selectedPosition.boat_pos == 1 ? "left" : selectedPosition.boat_pos == 2 ? "right" : ""}</div>
                        
                    </div>
                    <form
                        className="flex flex-col pb-3 px-3 items-start gap-1"
                        onSubmit={handleSubmit}>
                        <label
                            className="text-md text-black"
                            htmlFor="name">
                                Name
                            </label>
                        <input
                            name="name"
                            value={formInfo.name}
                            onChange={handleChange}
                            className="px-2 py-1 rounded-md border-2 w-[230px]"
                            placeholder='name'
                            type="text"
                            ></input>
                        <div
                            className="text-red-300 text-sm h-[20px] hover:cursor-default"
                            >
                            {error ? "choose a different name" : " "}
                        </div>
                        <label
                            className="text-md text-black"
                            htmlFor="weight">
                                Weight
                        </label>
                        <input
                            name="weight"
                            value={formInfo.weight}
                            onChange={handleChange}
                            className="px-2 py-1 rounded-md border-2 w-[230px]"
                            placeholder='lbs'
                            type="number"
                            ></input>
                        <div
                            className="text-red-300 text-sm h-[20px] hover:cursor-default"
                            >
                            {weightError ? "enter a valid weight" : " "}
                        </div>
                        <button
                            className=" border-slate-500 border-2 px-10 rounded-md self-end hover:bg-slate-300/50 disabled:hover:bg-[#113758]/0  disabled:border-slate-200"
                            type="submit"
                            disabled={error || formInfo.name == '' || weightError || formInfo.weight == 0 }>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 ${error || weightError || formInfo.weight == 0 || formInfo.name == ''? "text-slate-200": "text-slate-500"}`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                </svg>
                        </button>
                    </form>
                </div>
            </div>
            }
        </>
    )
}

export default PopupForm
