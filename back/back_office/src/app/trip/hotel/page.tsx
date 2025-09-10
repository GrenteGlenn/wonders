import Loader from "@components/loader.tsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import type {Hotel, TripCityData} from "@/interface/Global.ts";
import {DataTableHotel} from "@components/data-table-hotel.tsx";
import {instanceQuiz} from "@/lib/axiosInstance.ts";

export default function Page() {
    const [data, setData] = useState<Hotel[] | []>([])
    const [loading, setLoading] = useState<boolean>(true);
    const {id} = useParams();

    useEffect(() => {
        setLoading(true);
        if (id)
            instanceQuiz(`trip/user-full-trip/${id}`, {
                method: 'GET'
            })
                .then((res) => {
                    const data = res.data;
                    data.cities.forEach((element: TripCityData) => {
                        element.hotel.forEach((hotel: Hotel) => {
                            setData((prevState) => [...prevState, hotel] as Hotel[]);
                        })
                    })
                })
                .finally(() => setLoading(false))
                .catch(error => console.log(error))
        else
            instanceQuiz('trip-hotel', {
                method: 'GET'
            })
                .then((res) => {
                    const data = res.data;
                    setData(data)
                })
                .finally(() => setLoading(false))
                .catch(error => console.log(error))
    }, [])

    if (data === null) {
        setData([])
    }
    return (
        <>
            {
                !loading && data ?
                    <div>
                        {/*{id ?*/}
                        {/*    <Card className="@container/card">*/}
                        {/*        <CardHeader>*/}
                        {/*            <CardDescription>Total Revenue</CardDescription>*/}
                        {/*            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">*/}
                        {/*                $1,250.00*/}
                        {/*            </CardTitle>*/}
                        {/*            <CardAction>*/}
                        {/*                <Badge variant="outline">*/}
                        {/*                    <IconTrendingUp/>*/}
                        {/*                    +12.5%*/}
                        {/*                </Badge>*/}
                        {/*            </CardAction>*/}
                        {/*        </CardHeader>*/}
                        {/*        <CardFooter className="flex-col items-start gap-1.5 text-sm">*/}
                        {/*            <div className="line-clamp-1 flex gap-2 font-medium">*/}
                        {/*                Trending up this month <IconTrendingUp className="size-4"/>*/}
                        {/*            </div>*/}
                        {/*            <div className="text-muted-foreground">*/}
                        {/*                Visitors for the last 6 months*/}
                        {/*            </div>*/}
                        {/*        </CardFooter>*/}
                        {/*    </Card>*/}
                        {/*    :*/}
                        {/*    null*/}
                        {/*}*/}
                        <DataTableHotel data={data}/>
                    </div>
                    :
                    <Loader size={'large'}/>
            }
        </>
    )
}