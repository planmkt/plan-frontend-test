export interface Country {
    flags: {
        png: string;
    },
    name: {
        official: string;
    },
    capital: [],
    region: string;
    subregion: string;
    translations: {
        [key: string]: {
            official: string
        }
    },
    cca2: string;
    currency: {
        ERN: {
            name: string;
        }
    },
    languages: object;
    population: number;
}