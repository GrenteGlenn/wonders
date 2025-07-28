import {NavLink, useNavigate} from "react-router-dom";
import IconProfil from "@components/iconProfil.tsx";
import {useApp} from "@/context/AppContext.tsx";

export default function NavBar() {
    const {user} = useApp();
    const navigate = useNavigate();

    console.log("user", user);

    return (
        <div className="flex items-center justify-between w-full">
            {/* Titre NavBar */}
            <div className="flex items-center">
                <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✈</span>
                </div>
                <h1 onClick={() => navigate("/")} className="font-medium text-gray-900">TravelManager</h1>
            </div>

            {/* List of Link and Profil*/}
            {user ?
                <div className="flex items-center">
                    <li className="flex flex-row items-center justify-center gap-4 mr-2">
                        <NavLink to={"/dashboard"} end>Dashboard</NavLink>
                        <NavLink to={"/trips"}>Trips</NavLink>
                        <NavLink to={"/users"}>Users</NavLink>
                        <NavLink to={"/partenaires"}>Partenaires</NavLink>
                        <NavLink to={"/reservations"}>Réservations</NavLink>
                        <NavLink to={"/reports"}>Reports</NavLink>
                    </li>
                    <IconProfil/>
                </div>
                :
                null
            }
        </div>
    )
}