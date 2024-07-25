import React, {useState} from 'react'
import { generateUID } from '../../utilities/saveStateSetterGetter';
import { paddlerDataStore, usePaddlerDataStore } from '../../lib/store'
import { uploadRoster, downloadRoster } from '../../utilities/data-service';
import { currentRosterSetter } from '../../utilities/saveStateSetterGetter'
import LoaderModal from './LoaderModal';


type FormInfoType = {
    name: string,
}

interface ShareModalProps {
    setShowShare: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShareModal:React.FC<ShareModalProps> = ( { setShowShare }) => {
    const { activeRosterState, setRosterState }:paddlerDataStore = usePaddlerDataStore()
    const [ formInfo, setFormInfo ] = useState<FormInfoType>({ name: ""});
    const [ shareCode, setshareCode ] = useState<string>("");
    const [ toggler, setToggler ] = useState<number>(0);
    const [ timeVisible, setTimeVisible ] = useState<boolean>(false);
    const [ codeEntry, setCodeEntry ] = useState<string>("");
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ downloading, setDownloading ] = useState<boolean>(false)


    const closeModal = () => {
        setShowShare(false)
    }

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = evt.target;
        setFormInfo({...formInfo, 
            [name]: value}
        )
    }

    const handleChangeCode = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = evt.target;
        setCodeEntry(value)
    }
    
    const handleInternalClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        event.stopPropagation();
    };

    const upload = async(uniqueID: string) => {
        try {
            const dataSet = {
                rosterKey: uniqueID,
                rosterName: formInfo.name == "" ? "untitled" : formInfo.name,
                data: JSON.stringify(activeRosterState)
            };
            return await uploadRoster(dataSet);
        } catch (error) {
            console.error('Error uploading data:', error);
            throw error;
        }
    }

    const download = async(uniqueID: string) => {
        try {
            const result = await downloadRoster(uniqueID)
            return result
        } catch(err){
            console.log(err)
            throw err
        }
    }
    
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const handleSubmitUpload = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        setLoading(true)
        const uniqueID = generateUID();
      
        upload(uniqueID)
            .then(uploadResult => {
                if (uploadResult && uploadResult.success === "Data successfully added") {
                    return delay(500)
                        .then(() => download(uniqueID));
                } else {
                    throw new Error('Upload failed');
                }
            })
            .then(downloadResult => {
                if (downloadResult && downloadResult.rosterKey){
                    setshareCode(downloadResult.rosterKey)
                }
                setLoading(false)
                return downloadResult;
            })
            .catch(error => {
                console.error('Error in handleSubmit:', error);
            });
        
    }
    const handleSubmitDownload = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        setDownloading(true)
        download(codeEntry)
            .then(downloadResult => {
                if (downloadResult && downloadResult.rosterKey){
                    currentRosterSetter(downloadResult.rosterName, JSON.parse(downloadResult.data), downloadResult.rosterKey)
                }
                setDownloading(false)
                return JSON.parse(downloadResult.data)
            })
            .then(res => {
                setRosterState(res)
            })
            .catch(error => {
                console.error('Error in handleSubmit:', error);
            });
    }

    const handleCopy = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        navigator.clipboard.writeText(shareCode)
        handleTimedClick()
    }

    const handleTimedClick = () => {
        setTimeVisible(true)
        setTimeout(() => {
            setTimeVisible(false)
        }, 1500);
    }

    const toggleSubWindowLoad = () => {
        setToggler(0)
    }
    const toggleSubWindowShare = () => {
        setToggler(1)
    }
    const toggleSubWindowRetrieve = () => {
        setToggler(2)
    }

    return (
         <>
            <div
                onClick={closeModal}
                className="fixed z-50 top-0 left-0 display:none w-screen h-screen hover:cursor-default">
                <div 
                    onClick={handleInternalClick}
                    className={`w-[320px] ${toggler == 0 ? "h-[310px]": "h-[220px]"}  z-60 bg-white/90 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl backdrop-filter backdrop-blur-2xl opacity-95 rounded-xl hover:cursor-default`}>
                    <div className="flex flex-row justify-end">
                        <button 
                            className="mr-2 my-2 self-end"
                            onClick={closeModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-black">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-row justify-around">
                    <div 
                            onClick={toggleSubWindowLoad}
                            className={`font-bold w-1/2 p-2 ${toggler==0?  'bg-gray-100/95 rounded-tr-xl rounded-tl-xl' : ""}`}>
                            Load
                        </div>
                        <div 
                            onClick={toggleSubWindowShare}
                            className={`font-bold w-1/2 p-2 ${toggler==1? 'bg-gray-100/95 rounded-tr-xl rounded-tl-xl' : ""}`}>
                            Share
                        </div>
                        <div 
                            onClick={toggleSubWindowRetrieve}
                            className={`font-bold w-1/2 p-2 ${toggler==2? "bg-gray-100/95 rounded-tr-xl rounded-tl-xl":""} `}>
                            Download
                        </div>
                    </div>

                    <div className={`${toggler == 0?  'bg-gray-100/95 h-[230px] rounded-br-xl rounded-bl-xl ' : ""}`}>
                        {toggler == 0 &&
                        <>
                            <LoaderModal
                                />
                        </>
                        }
                    </div>

                    <div className={`${toggler == 1?  'bg-gray-100/95 rounded-br-xl rounded-bl-xl' : ""}`}>
                        {toggler == 1 &&
                            <>
                                <form
                                    className="flex flex-col py-3 px-3 gap-1 "
                                    onSubmit={handleSubmitUpload}>
                                    <div className="flex flex-row  justify-between">
                                        <div className="flex flex-col items-start">
                                            <label
                                                className={`text-sm ${shareCode != "" ? 'text-gray-200':'text-gray-400'} self-end`}
                                                htmlFor="name">
                                                    roster name
                                                </label>
                                            <input
                                                name="name"
                                                value={formInfo.name}
                                                onChange={handleChange}
                                                className="px-2 py-1 rounded-md border-2 w-[180px]  "
                                                placeholder='untitled'
                                                type="text"
                                                maxLength={20}
                                                disabled={shareCode != ""}
                                                ></input>
                                        </div>
                                        <div className="flex row self-end">
                                            {loading &&
                                                    <div className="text-xs flex self-center text-red-400 animate-pulse mr-2">
                                                        uploading
                                                    </div>
                                                }
                                            <button
                                                disabled={shareCode != ""}
                                                className=" border-slate-500 border-2 px-2 py-1 rounded-md self-end hover:bg-slate-300/50 disabled:hover:bg-[#113758]/0  disabled:border-slate-200"
                                                type="submit" 
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 ${shareCode != "" ? "text-slate-300" : "text-slate-500"}`}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                                                    </svg>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <form
                                    onClick={handleCopy}
                                    className="flex flex-col pb-3 px-3 gap-1">
                                    <div className="flex flex-row  justify-between">
                                        <div className="flex flex-col items-start">
                                            <label
                                                className="text-sm text-gray-400 self-end h-4">
                                                {shareCode != "" &&
                                                    <div>
                                                        copy + share this code
                                                    </div>
                                                }
                                                </label>
                                            <div 
                                                className="px-2 text-left py-1 bg-transparent w-[180px] h-8">
                                                {shareCode}
                                            </div>
                                        </div>
                                        <div className="flex self-end flex-row">
                                            {timeVisible &&
                                                <div className="text-xs flex self-center text-red-400 mr-2">
                                                    copied!
                                                </div>
                                            }
                                            <button
                                                disabled={shareCode == ""}
                                                className=" border-slate-500 border-2 px-2 py-1 rounded-md self-end hover:bg-slate-300/50 disabled:hover:bg-[#113758]/0  disabled:border-slate-200"
                                                type="submit" 
                                                >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.7" stroke="currentColor" className={`w-6 h-6 ${shareCode == "" ? "text-slate-300" : "text-slate-500"}`}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </>
                        }
                        </div>
                    <div>
                    <div className={`${toggler == 2?  'bg-gray-100/95 h-[140px] rounded-br-xl rounded-bl-xl' : ""}`}>
                        {toggler == 2 &&
                            <>
                                <form
                                    className="flex flex-col py-3 px-3 gap-1 "
                                    onSubmit={handleSubmitDownload}>
                                    <div className="flex flex-row  justify-between">
                                        <div className="flex flex-col items-start">
                                            <label
                                                className={`text-sm text-gray-400 self-end`}
                                                htmlFor="code">
                                                    enter code
                                                </label>
                                            <input
                                                name="code"
                                                value={codeEntry}
                                                onChange={handleChangeCode}
                                                className="px-2 py-1 rounded-md border-2 w-[180px]  "
                                                placeholder='code'
                                                type="text"
                                                maxLength={20}
                                                ></input>
                                        </div>
                                        <div className="flex row self-end">
                                            {downloading &&
                                                <div className="text-xs flex self-center text-red-400 animate-pulse mr-2">
                                                    loading
                                                </div>
                                            }
                                            <button
                                                className=" border-slate-500 border-2 px-2 py-1 rounded-md self-end hover:bg-slate-300/50 disabled:hover:bg-[#113758]/0 "
                                                type="submit" 
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 text-slate-500`}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
                                                    </svg>

                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </>
                        }   
                    </div>  
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShareModal