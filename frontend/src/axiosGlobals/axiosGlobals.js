import axios from "axios";


const client = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
});


client.interceptors.request.use((config) => {
    const token = localStorage.getItem("chatAppUserToken");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

client.interceptors.response.use((response) => {
    return response;
}), (error) => {
    if (error.response && error.response.status === 401) {
        localStorage.removeItem("chatAppUser");
        localStorage.removeItem("chatAppUserToken");
        window.location.href = "/login";
    }
    return Promise.reject(error);
}




export default client;