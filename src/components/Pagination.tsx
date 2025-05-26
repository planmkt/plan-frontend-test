import { useCountries } from "@/store/countries";
import { useEffect, useState } from "react";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";

export default function Pagination() {

    const [pageNumber, setPageNumber] = useState(1);

    const { fetchCountries } = useCountries();

    const currentPage = (current: number) => {
        if (pageNumber === current) {
            return "w-4 h-4 rounded-full bg-white border-3 border-white"
        } else {
            return "w-4 h-4 rounded-full border-3 border-white"
        }
    }

    const nextPage = () => {
        if (pageNumber < 5) {
            setPageNumber(state => state + 1);
        } else if (pageNumber >= 5) {
            setPageNumber(1);
        }
    }

    const previousPage = () => {
        if (pageNumber > 1) {
            setPageNumber(state => state - 1);
        } else if (pageNumber === 1) {
            setPageNumber(5);
        }
    }



    useEffect(() => {
        fetchCountries(pageNumber - 1, pageNumber + 7);
    }, [])



    return (
        <section id="pagination" className="w-full mt-20 mb-20 h-auto flex justify-center" >
            <div className="h-auto flex items-center justify-between w-54" >
                <div onClick={() => previousPage()} className="w-12 h-12 border-3 flex items-center justify-center rounded-2xl border-white" >
                    <MdOutlineArrowBackIos className="text-lg text-white font-semibold" />
                </div>
                <span className={currentPage(1)} ></span>
                <span className={currentPage(2)} ></span>
                <span className={currentPage(3)} ></span>
                <span className={currentPage(4)} ></span>
                <span className={currentPage(5)} ></span>
                <div onClick={() => nextPage()} className="w-12 h-12 border-3 flex items-center justify-center rounded-2xl border-white" >
                    <MdOutlineArrowForwardIos className="text-lg text-white font-semibold" />
                </div>
            </div>
        </section>
    )
}