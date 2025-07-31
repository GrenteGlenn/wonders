import {SiteHeader} from "@components/site-header.tsx";
import Loader from "@components/loader.tsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle} from "@components/ui/card.tsx";
import {Badge} from "@components/ui/badge.tsx";
import {IconTrendingUp} from "@tabler/icons-react";

export default function Page() {
    const [data, setData] = useState([])
    const {id} = useParams();

    useEffect(() => {
            fetch(`http://localhost:3004/api/trip/user-full-trip/${id}`
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

    return (
        <>
            <SiteHeader title={"Trip Hotel"}/>
            {
                data ?
                   <div>
                       <Card className="@container/card">
                           <CardHeader>
                               <CardDescription>Total Revenue</CardDescription>
                               <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                   $1,250.00
                               </CardTitle>
                               <CardAction>
                                   <Badge variant="outline">
                                       <IconTrendingUp />
                                       +12.5%
                                   </Badge>
                               </CardAction>
                           </CardHeader>
                           <CardFooter className="flex-col items-start gap-1.5 text-sm">
                               <div className="line-clamp-1 flex gap-2 font-medium">
                                   Trending up this month <IconTrendingUp className="size-4" />
                               </div>
                               <div className="text-muted-foreground">
                                   Visitors for the last 6 months
                               </div>
                           </CardFooter>
                       </Card>
                   </div>
                    :
                    <Loader size={'large'}/>
            }
        </>
    )
}