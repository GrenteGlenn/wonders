import {SiteHeader} from "@components/site-header.tsx";
import {useEffect, useState} from "react";
import {DataTableTrip} from "@components/data-table-trip.tsx";
import Loader from "@components/loader.tsx";

export default function Page() {
    const [trip, setTrip] = useState([])

    useEffect(() => {
        fetch('http://localhost:3004/api/trip/detail'
            , {
                method: 'GET',
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Erreur de chargement')
                }
                return res.json()
            })
            .then((data) => {
                console.log(data)
                setTrip(data)
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <>
            <SiteHeader title={"Trip"}/>
            {
                trip.length > 0 ?
                    <DataTableTrip data={trip}/>
                    :
                    <Loader size={'large'}/>
            }
        </>
    )
}