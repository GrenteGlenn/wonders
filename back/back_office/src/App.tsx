import './App.css'
import {Route, Routes} from "react-router-dom";
import LogIn from "./app/connection/page.tsx"
import Dashboard from "./app/dashboard/page.tsx"
import User from "./app/dashboard/user/page.tsx"
import Team from "./app/dashboard/team/page.tsx"
import Hotel from "./app/dashboard/hotel/page.tsx"
import Fly from "./app/dashboard/fly/page.tsx"
import Compagnie from "./app/dashboard/compagnie/page.tsx"
import Trip from "./app/trip/page.tsx"
import HotelTrip from "./app/trip/hotel/page.tsx"
import ActivityTrip from "./app/trip/activity/page.tsx"
import NavBar from "@components/navBar.tsx";

function App() {

    return (
        <div className="w-full">
            <NavBar/>
            <Routes>
                <Route path="/" element={<LogIn/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/users" element={<User/>}/>
                <Route path="/dashboard/team" element={<Team/>}/>
                <Route path="/fly" element={<Fly/>}/>
                <Route path="/dashboard/hotel" element={<Hotel/>}/>
                <Route path="/dashboard/compagnie" element={<Compagnie/>}/>
                <Route path="/trip" element={<Trip/>}/>
                <Route path="/trip/hotel/:id" element={<HotelTrip/>}/>
                <Route path="/trip/activity/:id" element={<ActivityTrip/>}/>
            </Routes>
        </div>
    )
}

export default App
