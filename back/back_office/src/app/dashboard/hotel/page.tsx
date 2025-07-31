import {SiteHeader} from "@components/site-header.tsx";

export default function Page() {
    // const [hotel, setHotel] = useState([])
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
    //             setHotel(data)
    //         })
    //         .catch(error => console.log(error))
    //
    // }, [])

    return (
        <>
            <SiteHeader title={"Hotel"}/>
            <div>
                <p>Hotel</p>
            </div>
        </>
    )
}