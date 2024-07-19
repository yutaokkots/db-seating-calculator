import React, { useState } from 'react'
import { useModalDataStore, ModalDataStore, usePaddlerDataStore, Paddler, paddlerDataStore} from '../lib/store';
import { SelectedPosition } from './Dropdown';

type FormInfoType = {
    name: string;
    weight: number;
}

const newPaddler: Paddler = {
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

interface PopupFormProps {
    rowNum: number;
    position: string; 
    selectedPosition: SelectedPosition;
}

const PopupForm:React.FC<PopupFormProps> = ({ rowNum, position, selectedPosition }) => {
    //const [ showPopup, setShowPopup ] = useState<boolean>(true);
    const [ formInfo, setFormInfo ] = useState<FormInfoType>({ name: "", weight: 0});
    const { modalState, setModalState }:ModalDataStore = useModalDataStore();
    const { addPaddlerToRoster }: paddlerDataStore = usePaddlerDataStore();

    const closeModal = () => {
        setModalState(false)
        setFormInfo({ name: "", weight: 0})
    }

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = evt.target;
        setFormInfo({...formInfo, 
            [name]: value}
        )
    }

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        if (formInfo.name == "" && formInfo.weight == 0){
            console.log("empty")
        } else{
            console.log(formInfo)
            newPaddler.name = formInfo.name
            newPaddler.weight = formInfo.weight
            newPaddler.row = rowNum
            newPaddler.boat_pos = position
            addPaddlerToRoster(newPaddler)
        }
        closeModal()
    }
    return (
        <>
            {modalState && selectedPosition.row == rowNum && selectedPosition.boat_pos == position &&
            <div 
                className="fixed z-50 top-0 left-0 backdrop-blur-lg  display:none w-screen h-screen"
                >
                <div className="w-[320px] h-[220px] z-60 bg-violet-500/90 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl backdrop-filter backdrop-blur-2xl opacity-95 rounded-xl ">
                    <div className="flex flex-row justify-end">
                        <button 
                            className="mt-2 mr-2 border-2 border-white rounded-md self-end"
                            onClick={closeModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <form
                        className="flex flex-col pb-3 px-3 items-start gap-2"
                        onSubmit={handleSubmit}>
                        <label
                            className="text-md text-white"
                            htmlFor="name">
                                Name
                            </label>
                        <input
                            name="name"
                            value={formInfo.name}
                            onChange={handleChange}
                            className="px-2 py-1 rounded-md"
                            placeholder='name'
                            type="text"
                            ></input>
                        <label
                            className="text-md text-white"
                            htmlFor="weight">
                                Weight
                        </label>
                        <input
                            name="weight"
                            value={formInfo.weight}
                            onChange={handleChange}
                            className="px-2 py-1 rounded-md"
                            placeholder='lbs'
                            type="number"
                            ></input>
                        <button
                            className=" border-white border-2 px-4 rounded-md self-end hover:bg-violet-400/50"
                            type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-white ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
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