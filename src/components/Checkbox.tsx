import { useCountries } from "@/store/countries";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";

interface Props {
    text: string;
    region: string;
}

export default function Checkbox({ text, region }: Props) {

    const [checked, setChecked] = useState(false);
    const [regionName, setRegionName] = useState("");
    const { setRegionsFilters, regionsFilters, filterByRegions } = useCountries();

    useEffect(() => {
        setRegionsFilters(regionName);

        if (regionsFilters.length > 0) {
            filterByRegions(0, 8);
        }
    }, [regionName])

    return (
        <div id="checkbox" onClickCapture={() => setRegionName(region)} className="flex cursor-pointer" onClick={() => setChecked(state => !state)} >
            <div className={`${checked ? "bg-orange-600" : "bg-orange-400"} h-6 w-6 flex mr-2 border-3 border-white rounded-lg justify-center items-center`} >
                {checked && <FaCheck className="text-sm text-white" />}
            </div>
            <p className="font-medium" >{text}</p>
        </div>
    );
}