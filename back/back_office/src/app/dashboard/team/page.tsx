import {SiteHeader} from "@components/site-header.tsx";
import {DataTableTeam} from "@components/data-table-team.tsx";
import data from "@/app/dashboard/team/data.json";

export default function Page() {
    // const [team, setTeam] = useState([])
    //
    // useEffect(() => {
    //     fetch('http://localhost:3003/api/' // need to be implemented
    //         , {
    //             method: 'GET',
    //         })
    //         .then((res) => {
    //             if (!res.ok) {
    //                 throw new Error('Erreur de chargement')
    //             }
    //             return res.json()
    //         })
    //         .then((data) => {
    //             console.log(data)
    //             setTeam(data)
    //         })
    //         .catch(error => console.log(error))
    //
    // }, [])

    return (
        <>
            <SiteHeader title={"Team"}/>
            <DataTableTeam data={data}/>
        </>
    )
}