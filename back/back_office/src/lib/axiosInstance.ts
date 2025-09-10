import axios from 'axios';

const token = localStorage.getItem("token") !== null ? localStorage.getItem("token") : null

console.log(token)

const instanceActivity = axios.create({
    baseURL: `${import.meta.env.VITE_URL_ACTIVITY}/api/`,
    headers: {
        Authorization: `Bearer ${token}`
    },
    timeout: 1000
});

const instanceBlog = axios.create({
    baseURL: `${import.meta.env.VITE_URL_BLOG}/api/`,
    headers: {
        Authorization: `Bearer ${token}`
    },
    timeout: 1000
});

const instanceCountry = axios.create({
    baseURL: `${import.meta.env.VITE_URL_COUNTRY}/api/`,
    headers: {
        Authorization: `Bearer ${token}`
    },
    timeout: 1000
});

const instanceFly = axios.create({
    baseURL: `${import.meta.env.VITE_URL_FLY}/api/`,
    headers: {
        Authorization: `Bearer ${token}`
    },
    timeout: 1000
});

const instanceQuiz = axios.create({
    baseURL: `${import.meta.env.VITE_URL_QUIZZ}/api/`,
    headers: {
        Authorization: `Bearer ${token}`
    },
    timeout: 1000
});

const instanceUser = axios.create({
    baseURL: `${import.meta.env.VITE_URL_USER}/api/`,
    headers: {
        Authorization: `Bearer ${token}`
    },
    timeout: 1000
});

export {instanceActivity, instanceBlog, instanceFly, instanceCountry, instanceQuiz, instanceUser};