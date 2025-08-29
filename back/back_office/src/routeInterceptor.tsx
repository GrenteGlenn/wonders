import {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useApp} from "@/context/AppContext.tsx";
import {instanceUser} from "@/lib/axiosInstance.ts";

const RouteInterceptor = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {isAuthenticated, user, login} = useApp()

    useEffect(() => {
        const token = localStorage.getItem("token");
        switch (location.pathname) {
            case '/':
                if (isAuthenticated && token) navigate('/dashboard')
                break;
            case '/trip':
            case '/settings':
            case '/compagnie':
            case '/hotel':
            case '/fly':
            case '/team':
            case '/dashboard':
            case '/users':
                if (token && !isAuthenticated) {
                    instanceUser('users/me', {
                        method: 'GET',
                    })
                        .then(res => {
                            const data = res.data
                            if (data.email) login({'name': 'Admin', 'email': data.email})
                            else {
                                localStorage.deleteItem('token');
                                navigate('/')
                            }
                        }).catch(err => {
                        console.log(err)
                        navigate('/')
                    });
                }
                if (!token) navigate('/');
        }
        if (user?.email && token) {
            instanceUser('auth/refresh', {
                method: 'POST',
            })
                .then(res => {
                    const data = res.data
                    localStorage.setItem('token', data.refresh);
                })
                .catch(err => console.log(err));
        }

    }, [location]);

    return null;
};

export default RouteInterceptor;
