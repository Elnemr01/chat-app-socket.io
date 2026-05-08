import axios from "axios";


const client = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
});


axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("chatAppUserToken");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});




export default client;