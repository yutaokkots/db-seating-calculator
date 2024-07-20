import React, {useState, useEffect, useRef} from 'react'
import { Paddler, usePaddlerDataStore, paddlerDataStore } from '../../lib/store';


interface IconProps {
    isOpen: boolean;
}
const Icon:React.FC<IconProps> = ({ isOpen }) => {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="#222" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className={isOpen ? 'translate' : ''}>
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    );
};

const CloseIcon:React.FC = () => {
    return (
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="#222" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    );
};

interface DropdownCustom {
    placeHolder: string;
    options: Paddler[];
    isSearchable: boolean;
    onChange: () => void;
}

const DropdownCustom:React.FC = () => {
    const { activeRosterState }:paddlerDataStore  = usePaddlerDataStore() 
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [selectedValue, setSelectedValue] = useState<string>("")
    // stores string value in the search
    const [searchValue, setSearchValue] = useState<string>("")
    const searchRef = useRef<HTMLInputElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const isOpen = true

    const placeHolder = "some text"

    useEffect(() => {
        setSearchValue("")
        if (showMenu && searchRef.current){
            searchRef.current.focus();
        }
    }, [ showMenu ])

    useEffect(() => {
        const handler = (e: MouseEvent | TouchEvent) => {
            if (inputRef.current && !inputRef.current.contains(e.target as Node)){
                setShowMenu(false)
            }
        } 
        window.addEventListener("click", handler)
        return () => {
            window.removeEventListener("click", handler)
        }
    }, [])

    const handleInputClick = () => {
        setShowMenu(!showMenu)
    }

    const getDisplay = () => {
        if (!selectedValue || selectedValue.length === 0) {
            return placeHolder;
        }
    };

    const isSelected = (option) => {
        if (!selectedValue) {
            return false;
        }

        return selectedValue.value === option.value;
    };

    const onItemClick = (option) => {
        setSelectedValue(option);
        console.log(option);
    }

    const getOptions = () => {
        if (!searchValue) {
            return activeRosterState;
        }
    }

    return (
        <>
            <div 
                ref={inputRef} 
                onClick={handleInputClick} 
                className="dropdown-input">
                    <div 
                        className={`dropdown-selected-value ${!selectedValue || selectedValue.length === 0 ? 'placeholder' : ''}`}
                        >{getDisplay()}
                    </div>
                    <div className="dropdown-tools">
                        <div className="dropdown-tool">
                            <Icon isOpen={showMenu} />
                        </div>
                    </div>
            </div>
            {
                showMenu && (
                    
                    <div>
                        <div>

                        </div>
                        { activeRosterState && 
                            activeRosterState.map((paddler, idx) => (
                                <div
                                    onClick={() => onItemClick(paddler)} 
                                    key={idx}
                                    className={`border-2 w-[120px] border-md hover:cursor-pointer hover:bg-gray-500 ${isSelected(paddler) && "selected"}`} 
                                    >{paddler.name}</div>
                            ))
                        }
                    </div>
                )
            }

        </>
    )
}

export default DropdownCustom