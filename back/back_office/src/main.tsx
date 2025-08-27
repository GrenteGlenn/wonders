import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import App from "@/App.tsx";
import {AppProvider} from "@/context/AppContext.tsx";
import RouteInterceptor from "@/routeInterceptor.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppProvider>
            <BrowserRouter>
                <RouteInterceptor/>
                <App/>
            </BrowserRouter>
        </AppProvider>
    </StrictMode>,
)
