"use client"

import { useCountries } from '@/store/countries';
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Details() {

    const { country, fetchCountryDetail, loading } = useCountries();
    const params = useParams();
    const router = useRouter();

    useEffect(() => {

        if (params.id) {
            fetchCountryDetail(params.id as string);
        }

    }, [params.id])

    return (
        <>
            <header className="w-screen h-40 flex items-center" >
                <Image className='filter brightness-0 invert' src="/img/logo.png" width={115} height={115} alt="logo" />
            </header>
            <section id="details" className="w-full rounded-2xl mt-5 h-auto bg-white mb-5" >
                <div className="w-full items-center pl-5 h-12 bg-stone-600 rounded-tl-2xl rounded-tr-2xl flex space-between" >
                    <p className="text-white font-medium" >{country[0]?.region}</p>
                </div>
                <div className="w-full lg:h-[26.5rem] bg-white sm:flex-col lg:flex-row flex px-5 pt-5 lg:pb-10 mb-14" >

                    <img className="w-[20rem] h-[15rem] border-1 border-stone-500 " src={country[0]?.flags?.png} />

                    <div className="flex flex-col" >

                        <h1 className="lg:ml-[12rem] text-[3rem] md:mt-3 text-stone-500 font-medium" >{country[0]?.translations?.["por"]?.official}</h1>

                        <ul className="lg:ml-[12rem] mt-5 space-y-2" >
                            <li className="flex" >
                                <p className="text-stone-500 text-xl" >Nome Oficial:</p>
                                <b className="text-stone-500 text-xl ml-5" >{country[0]?.translations?.["por"]?.official}</b>
                            </li>
                            <li className="flex" >
                                <p className="text-stone-500 text-xl" >Capital:</p>
                                <b className="text-stone-500 text-xl ml-5" >{country[0]?.capital}</b>
                            </li>
                            <li className="flex" >
                                <p className="text-stone-500 text-xl" >População:</p>
                                <b className="text-stone-500 text-xl ml-5" >{country[0]?.population}</b>
                            </li>
                            <li className="flex" >
                                <p className="text-stone-500 text-xl" >Região:</p>
                                <b className="text-stone-500 text-xl ml-5" >{country[0]?.region}</b>
                            </li>
                            <li className="flex" >
                                <p className="text-stone-500 text-xl" >Sub-Região:</p>
                                <b className="text-stone-500 text-xl ml-5" >{country[0]?.subregion}</b>
                            </li>
                        </ul>

                        <button onClick={() => router.back()} className="w-3/6 md:mt-26 min-h-12 cursor-pointer lg:mt-10 ml-[12rem] font-bold text-white rounded-full bg-orange-400" >Voltar</button>
                    </div>
                </div>
            </section>
        </>
    );
}