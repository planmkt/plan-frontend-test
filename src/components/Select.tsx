import { useCountries } from "@/store/countries";
import { useEffect, useRef, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import "../styles/scroll.css";


export default function Select() {

    const [openSelect, setOpenSelect] = useState(false);
    const wrapperRef = useRef(null);
    const { setLanguage } = useCountries();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setOpenSelect(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="min-w-sm flex-1 relative" >
            <div id="input" ref={wrapperRef} onClick={() => setOpenSelect(state => !state)} className={`${openSelect ? "h-50 rounded-3xl p-3 flex flex-col h-auto" : "h-full rounded-full items-center px-3"} flex cursor-pointer justify-between absolute bg-orange-400  w-sm border-3 border-white`} >
                <div className="flex w-full justify-between items-center" >
                    <p className="text-black font-medium" >Selecione o idioma</p>
                    {openSelect ? <MdOutlineKeyboardArrowUp className="text-3xl text-white font-semibold transform scale-x-[-1]" /> :
                        <MdOutlineKeyboardArrowDown className="text-3xl text-white font-semibold transform scale-x-[-1]" />
                    }
                </div>

                {openSelect && <ol className="flex flex-col pl-2 ml-6 list-disc overflow-y-scroll max-h-56 custom-scroll" >
                    <li className="text-white font-medium" onClick={() => setLanguage("ara")} >Árabe;</li>
                    <li className="text-white font-medium" onClick={() => setLanguage("deu")} >Alemão;</li>
                    <li className="text-white font-medium" onClick={() => setLanguage("fin")} >Finlandês;</li>
                    <li className="text-white font-medium" onClick={() => setLanguage("fra")} >Francês;</li>
                    <li className="text-white font-medium" onClick={() => setLanguage("hun")} >Hungaro;</li>
                    <li className="text-white font-medium" onClick={() => setLanguage("ita")} >Italiano;</li>
                    <li className="text-white font-medium" onClick={() => setLanguage("jpn")} >Japonês;</li>
                    <li className="text-white font-medium" onClick={() => setLanguage("kor")} >Coreano;</li>
                    <li className="text-white font-medium" onClick={() => setLanguage("pol")} >Polonês;</li>
                    <li className="text-white font-medium" onClick={() => setLanguage("por")} >Português;</li>
                    <li className="text-white font-medium" onClick={() => setLanguage("rus")} >Russo;</li>
                    <li className="text-white font-medium" onClick={() => setLanguage("slk")} >Eslovaco;</li>
                    <li className="text-white font-medium" onClick={() => setLanguage("spa")} >Espanhol;</li>
                    <li className="text-white font-medium" onClick={() => setLanguage("tur")} >Turco;</li>
                    <li className="text-white font-medium" onClick={() => setLanguage("swe")} >Sueco;</li>
                </ol>
                }
            </div>
        </div>
    );
}