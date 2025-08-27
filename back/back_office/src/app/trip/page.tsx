import {useEffect, useState} from "react";
import {DataTableTrip} from "@components/data-table-trip.tsx";
import Loader from "@components/loader.tsx";
import {instanceQuiz} from "@/lib/axiosInstance.ts";

export default function Page() {
    const [trip, setTrip] = useState([])

    useEffect(() => {
        instanceQuiz('trip/detail', {
            method: 'GET'
        })
            .then((res) => {
                const data = res.data
                setTrip(data)
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <>
            {
                trip.length > 0 ?
                    <DataTableTrip data={trip}/>
                    :
                    <Loader size={'large'}/>
            }
        </>
    )
}