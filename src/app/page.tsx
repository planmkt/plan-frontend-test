'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { IoSearch } from "react-icons/io5";
import { TiStarOutline } from "react-icons/ti";
import Select from '@/components/Select';
import Pagination from '@/components/Pagination';
import Checkbox from '@/components/Checkbox';
import { useCountries } from '@/store/countries';
import { useRouter } from 'next/navigation';
import { FiMenu } from "react-icons/fi";


export default function Home() {

  const router = useRouter();


  const checkboxes = [
    { text: "África", region: "Africa" },
    { text: "América do Norte", region: "Americas" },
    { text: "América do Sul", region: "Americas" },
    { text: "Ásia", region: "Asian" },
    { text: "Europa", region: "Europe" },
    { text: "Oceania", region: "Oceania" }
  ]

  const [searchName, setSearchName] = useState<string>("");

  const { countries, loading, searchCountryByName, error, fetchCountries, selectedLanguage } = useCountries();

  useEffect(() => {
    if (searchName && countries.length > 0) {
      searchCountryByName(searchName);
    } else if (error) {
      fetchCountries(0, 8)
    }
  }, [searchName]);

  return (
    <>
      <header className="max-w-[1000px] sm:justify-between lg:justify-between sm:h-26 lg:h-40 md:h-auto md:flex-col flex lg:flex-row sm:items-center md:items-start lg:items-center" >
        <Image className='filter brightness-0 invert md:mt-4 lg:mt-0' src="/img/logo.png" width={115} height={115} alt="logo" />
        <form className="max-w-[49.2rem] md:mt-4 sm:hidden lg:mt-0 flex-1 h-24 md:flex flex-col justify-between" >
          <section id="inputs" className="flex justify-between w-full h-[3rem]" >
            <div id="input" className="max-h-full flex justify-between items-center px-3 rounded-full max-w-sm mr-4 flex-1 border-3 border-white" >
              <input type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="border-none caret-black w-sm  h-10 focus:outline-none placeholder-black placeholder:font-medium placeholder:text-base"
                placeholder="Informe o país que deseja conhecer..." />
              <IoSearch className="text-2xl text-white font-semibold transform scale-x-[-1]" />
            </div>
            <Select />
          </section>
          <section id="checkboxes" className="w-full md:mt-2 lg:mt-0 flex flex-row justify-between items-center h-8" >
            {checkboxes.map((item, index) => (
              <Checkbox key={index} text={item.text} region={item.region} />
            ))}
          </section>
        </form>
        <div className="h-10 w-10 md:hidden bg-orange-400 border-1 border-orange-300 rounded-lg flex items-center justify-center" >
          <FiMenu className="text-white text-xl" />
        </div>
      </header>
      <section id="countries" className="w-full md:h-[28rem] sm:h-[117rem]" >
        <section id="list" className="w-full flex items-center justify-center flex-wrap mt-3 h-[25rem]" >
          {!loading && !error ? countries?.map((item, index) => (
            <article key={index} className="min-w-[17.9rem] flex-1 flex flex-col items-center h-56 bg-white md:mr-3 mb-3 rounded-2xl shadow-xl" >
              <div className="w-full items-center pl-5 h-12 bg-stone-600 rounded-tl-2xl rounded-tr-2xl flex space-between" >
                <p className="text-white font-medium" >{item?.region}</p>
              </div>
              <img className="w-8 h-6 border-1 border-stone-500 mt-5" src={item?.flags?.png} />
              <p className="text-2xl font-medium text-center text-stone-500" >{`${item?.translations[selectedLanguage]?.official.substring(0, 20)}...`}</p>
              <div className="flex items-center mt-1" >
                <span className="w-6 h-6 flex justify-center mr-2 items-center rounded-full bg-orange-400" >
                  <TiStarOutline className="text-white text-lg" />
                </span>
                <p className="font-medium text-stone-500 text-lg" >{item?.capital}</p>
              </div>
              <button onClick={() => router.push(`/${item?.cca2}`)} className="w-5/6 h-10 mt-2 cursor-pointer font-bold text-white rounded-full bg-orange-400" >Ver mais</button>
            </article>
          )) : <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>}
        </section>
      </section>
      <Pagination />
    </>
  )
}
