import axios from 'axios';

axios.interceptors.request.use(function (config) {
    // faire quelque chose avant que la requête ne soit envoyée
    return config;
}, function (error) {
    // faire quelque chose en cas d’erreur
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    // n’importe quel code de réponse HTTP dans la plage 2xx activera cette
    return response;
}, function (error) {
    // n’importe quel code de réponse HTTP hors de la plage 2xx activera cette
    return Promise.reject(error);
});