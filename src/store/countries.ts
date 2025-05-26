import { Country } from "@/@types/country";
import { create } from "zustand";

type CountriesState = {
    countries: Country[],
    fetchCountries: (offset: number, limit: number) => Promise<void>,
    country: Country[];
    loading: boolean,
    error: string | null,
    searchCountryByName: (name: string) => Promise<void>,
    selectedLanguage: string;
    setLanguage: (lang: string) => void;
    regionsFilters: string[],
    setRegionsFilters: (name: string) => void;
    filterByRegions: (offset: number, limit: number) => Promise<void>;
    fetchCountryDetail: (code: string) => Promise<void>;
}

export const useCountries = create<CountriesState>((set) => ({
    countries: [],
    selectedLanguage: "por",
    regionsFilters: [],
    country: [],
    fetchCountries: async (offset, limit) => {
        set({ loading: true, error: null });

        try {
            const response = await fetch("https://restcountries.com/v3.1/all?fields=name,capital,flags,subregion,translations,region,cca2");
            const data = await response.json();

            set({ countries: data?.slice(offset, limit), loading: false });
        } catch (error) {
            set({ error: "Erro ao buscar países", loading: false, countries: [] });
        }
    },
    loading: false,
    error: null,
    searchCountryByName: async (name) => {
        set({ loading: true, error: null });

        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,flags,subregion,translations,region,cca2`);
            const data = await response.json();

            set({ countries: data, loading: false });
        } catch (error) {
            set({ error: "Nenhum país encontrado", loading: true, countries: [] });
        }
    },
    setLanguage: (lang) => set({ selectedLanguage: lang }),
    setRegionsFilters: (name) => set((state) => ({ regionsFilters: [...state.regionsFilters, name] })),
    filterByRegions: async (offset, limit) => {
        set({ loading: true, error: null });

        try {
            const response = await fetch("https://restcountries.com/v3.1/all?fields=name,capital,flags,subregion,translations,region,cca2");
            const data = await response.json();



            set((state) => {

                let countriesData: Country[] = []

                state.regionsFilters.forEach(item => {
                    const dataFiltered = data.filter(dataItem => {
                        return dataItem.region === item;
                    })

                    countriesData = [...dataFiltered]
                })

                return { countries: countriesData?.slice(offset, limit), loading: false }
            });
        } catch (error) {
            set({ error: "Erro ao buscar países", loading: false, countries: [] });
        }
    },
    fetchCountryDetail: async (code) => {
        set({ loading: true, error: null });

        try {
            const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${code}`);
            const data = await response?.json();

            set({ country: data, loading: false });
        } catch (error) {
            set({ error: "Erro ao buscar país", loading: false, countries: [] });
        }
    },
}))