import {SiteHeader} from "@components/site-header.tsx";
import Loader from "@components/loader.tsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@components/ui/card.tsx";
import type {TripCity} from "@/interface/Global.ts";

export default function Page() {
    const [data, setData] = useState([])
    const {id} = useParams();

    useEffect(() => {
        fetch(`http://localhost:3004/api/trip/user-full-trip-detail/${id}`
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
                setData(data)
            })
            .catch(error => console.log(error))
    }, [])
    console.log(data)

    return (
        <>
            <SiteHeader title={"Trip Activity"}/>
            {
                data.length > 0 ?
                    <div>
                        <Card className="@container/card">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                    All Activity For Travel
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {data.map((item: TripCity, i) => {
                                    console.log(i, item)
                                    return (
                                        <Card key={i}>
                                            <CardHeader>
                                                <CardTitle
                                                    className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                                    City
                                                </CardTitle>
                                                <CardContent>
                                                    {item.tripCityDays.map((item, i) => {
                                                        console.log(item)
                                                        return (
                                                            <Card key={i}>
                                                                <CardTitle
                                                                    className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                                                    Day
                                                                </CardTitle>
                                                                <CardContent>
                                                                    {item.activities.map((item, i) => {
                                                                        console.log(item)
                                                                        return (
                                                                            <Card key={i}>
                                                                                <CardTitle
                                                                                    className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                                                                    Activity 1
                                                                                </CardTitle>
                                                                            </Card>
                                                                        )
                                                                    })}
                                                                </CardContent>
                                                            </Card>
                                                        )
                                                    })}
                                                </CardContent>
                                            </CardHeader>
                                        </Card>
                                    )
                                })}
                            </CardContent>
                            <CardFooter className="flex-col items-start gap-1.5 text-sm">

                            </CardFooter>
                        </Card>
                    </div>
                    :
                    <Loader size={'large'}/>
            }
        </>
    )
}