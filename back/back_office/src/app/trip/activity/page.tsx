import Loader from "@components/loader.tsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import type {TripCityData} from "@/interface/Global.ts";
import {DataTableActivity} from "@components/data-table-activity.tsx";
import {instanceQuiz} from "@/lib/axiosInstance.ts";

type ActivityTripDay = {
    id: number;
    activity_id: number;
    status: string;
    trip_day_id: number;
    tripDay: { id: number; date: string; trip_city_id: number };
};

export default function Page() {
    const [data, setData] = useState<ActivityTripDay[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const {id} = useParams();

    useEffect(() => {
        setLoading(true)
        if (id)
            instanceQuiz(`trip/user-full-trip/${id}`, {
                method: 'GET'
            })
                .then((res) => {
                    const payload = res.data as { cities: TripCityData[] };

                    const activities: ActivityTripDay[] = payload.cities.flatMap((city) =>
                        city.tripCityDays.flatMap((day) =>
                            day.activities.map((a) => ({
                                ...a,
                                trip_day_id: day.id,
                                tripDay: {
                                    id: day.id,
                                    date: day.date,
                                    trip_city_id: day.trip_city_id,
                                },
                            }))
                        )
                    );

                    setData(activities);
                })
                .finally(() => setLoading(false))
                .catch(error => console.log(error))

        else
            instanceQuiz('trip-day-activity/detail', {
                method: 'GET'
            })
                .then((res) => {
                    const data = res.data;
                    console.log("data", data);
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
                        <DataTableActivity data={data}/>
                    </div>
                    :
                    <Loader size={'large'}/>
            }
        </>
    )
}