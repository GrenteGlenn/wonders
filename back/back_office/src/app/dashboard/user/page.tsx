import {DataTableUser} from "@components/data-table-user.tsx";
import {useEffect, useState} from "react";
import Loader from "@components/loader.tsx";
import {useApp} from "@/context/AppContext.tsx";

export default function Page() {
    const {trigger} = useApp()
    const [user, setUser] = useState([])

    useEffect(() => {
        setUser([]);
        fetch('http://localhost:3005/api/users'
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
                setUser(data)
            })
            .catch(error => console.log(error))

    }, [trigger])

    return (
        <div className="px-8 py-8 max-w-7xl mx-auto">
            {/* Page Title */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Utilisateurs</h1>
                <p className="text-gray-500 text-lg">Gérez les utilisateurs de votre application</p>
            </div>
            {
                user.length > 0 ?
                    <DataTableUser data={user}/>
                    :
                    <Loader size={'large'}/>
            }
        </div>
    )
}