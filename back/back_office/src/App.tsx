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
import FlyTrip from "./app/trip/fly/page.tsx"
import Settings from "./app/settings/page.tsx"
import NavBar from "@components/navBar.tsx";

function App() {

    return (
        <div className="w-full">
            <NavBar/>
            <Routes>
                <Route path="/" element={<LogIn/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/users" element={<User/>}/>
                <Route path="/team" element={<Team/>}/> // TODO need check team update do later
                <Route path="/fly" element={<Fly/>}/> // TODO add fly compagnie
                <Route path="/hotel" element={<Hotel/>}/> // TODO add hotel compagnie
                <Route path="/compagnie" element={<Compagnie/>}/> // TODO add compagnie
                <Route path="/trip" element={<Trip/>}/>
                <Route path="/trip/hotel/:id" element={<HotelTrip/>}/>
                <Route path="/trip/hotel" element={<HotelTrip/>}/>
                <Route path="/trip/activity/:id" element={<ActivityTrip/>}/>
                <Route path="/trip/activity" element={<ActivityTrip/>}/>
                <Route path="/trip/fly/:id" element={<FlyTrip/>}/>
                <Route path="/trip/fly" element={<FlyTrip/>}/>
                <Route path="/settings" element={<Settings/>}/> //TODO settings page
            </Routes>
        </div>
    )
}

export default App
