import Loader from "@components/loader.tsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import type {Transportation, TripState} from "@/interface/Global.ts";
import {DataTableFly} from "@components/data-table-fly.tsx";
import {instanceQuiz} from "@/lib/axiosInstance.ts";

export default function Page() {
    const [data, setData] = useState<Transportation[] | null>(null)
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
                    data.forEach((element: TripState) => {
                        if (element.cities.length > 0 && element.cities) {
                            element.cities.forEach((value) => {
                                setData((prevState) => [...(prevState || []), value.transportation])
                            })
                        }
                    })
                })
                .finally(() => setLoading(false))
                .catch(error => console.log(error))
        else
            instanceQuiz('trip-transportation', {
                method: 'GET'
            })
                .then((res) => {
                    const data = res.data;
                    setData(data)
                })
                .finally(() => setLoading(false))
                .catch(error => console.log(error))
    }, [])

    console.log(data)

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
                        <DataTableFly data={data}/>
                    </div>
                    :
                    <Loader size={'large'}/>
            }
        </>
    )
}