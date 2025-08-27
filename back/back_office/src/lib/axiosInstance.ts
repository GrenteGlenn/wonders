import axios, {type AxiosInstance} from 'axios';

const token = localStorage.getItem("token") !== null ? localStorage.getItem("token") : null

const instanceActivity = axios.create({
    baseURL: `${import.meta.env.VITE_URL_ACTIVITY}/api/`,
    timeout: 1000
});

const instanceBlog = axios.create({
    baseURL: `${import.meta.env.VITE_URL_BLOG}/api/`,
    timeout: 1000
});

const instanceCountry = axios.create({
    baseURL: `${import.meta.env.VITE_URL_COUNTRY}/api/`,
    timeout: 1000
});

const instanceFly = axios.create({
    baseURL: `${import.meta.env.VITE_URL_FLY}/api/`,
    timeout: 1000
});

const instanceQuiz = axios.create({
    baseURL: `${import.meta.env.VITE_URL_QUIZZ}/api/`,
    timeout: 1000
});

const instanceUser = axios.create({
    baseURL: `${import.meta.env.VITE_URL_USER}/api/`,
    timeout: 1000
});

const setHeader = (instance: AxiosInstance) => {
    instance.interceptors.request.use(config => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    })
}

[instanceActivity, instanceBlog, instanceCountry, instanceFly, instanceQuiz, instanceUser].forEach(setHeader);

export {instanceActivity, instanceBlog, instanceFly, instanceCountry, instanceQuiz, instanceUser};