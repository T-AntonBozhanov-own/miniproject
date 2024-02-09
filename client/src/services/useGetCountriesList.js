import {useEffect, useState} from "react";
import {fetcher} from "../utils/index.js";
import {ROUTES} from "../constants/index.js";

export const useGetCountriesList = () => {
    const [countriesList, setCountriesList] = useState([])
    useEffect(() => {
        async function getData() {
            const data = await fetcher(ROUTES.COUNTRY.COUNTRIES)
            setCountriesList(data)
        }
        getData()
    }, []);

    return countriesList
}