import React, { useState } from 'react'
import { currentRosterSetter } from '../../utilities/saveStateSetterGetter'
import { usePaddlerDataStore, paddlerDataStore } from '../../lib/store';

interface SaverModalProps {
    setShowSaver: React.Dispatch<React.SetStateAction<boolean>>;
}
type FormInfoType = {
    name: string,
}

const SaverModal:React.FC<SaverModalProps> = ({ setShowSaver }) => {
    const [ formInfo, setFormInfo ] = useState<FormInfoType>({ name: ""});
    const { activeRosterState }:paddlerDataStore = usePaddlerDataStore()


    // closes modal
    const closeModal = () => {
        setShowSaver(false)
    }

    const handleInternalClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        event.stopPropagation();
    };

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = evt.target;
        setFormInfo({...formInfo, 
            [name]: value}
        )
    }
    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        // save the current state as an item in localhost.
        closeModal()
        currentRosterSetter(formInfo.name, activeRosterState)
    }

    return (
        <>
            <div
                onClick={closeModal}
                className="fixed z-50 top-0 left-0 backdrop-blur-md display:none w-screen h-screen hover:cursor-default">
                <div 
                    onClick={handleInternalClick}
                    className="w-[320px] h-auto  z-60 bg-white/90 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl backdrop-filter backdrop-blur-2xl opacity-95 rounded-xl hover:cursor-default">
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
                        Save boat configuration
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
                            className="px-2 py-1 rounded-md border-2 w-[230px] mb-5"
                            placeholder='untitled'
                            type="text"
                            maxLength={20}
                            ></input>
                        <button
                            className=" border-slate-500 border-2 px-10 rounded-md self-end hover:bg-slate-300/50 disabled:hover:bg-[#113758]/0  disabled:border-slate-200"
                            type="submit" 
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 text-slate-500`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                </svg>
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SaverModal