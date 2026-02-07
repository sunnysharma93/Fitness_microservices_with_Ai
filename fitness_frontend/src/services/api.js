import axios from "axios";
import store from "../store/store"; // Apne store ka sahi path dena

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request Interceptor: Token ko har request ke saath bhejne ke liye
api.interceptors.request.use((config) => {
    // Redux store se direct token uthana sabse safe hai
    const state = store.getState();
    const token = state.auth.token; 
    const userId = state.auth.user?.sub || state.auth.user?.id; // tokenData se ID

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (userId) {
        config.headers['X-User-ID'] = userId;
    }
    
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response Interceptor: Agar token expire ho jaye toh handle karne ke liye
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error("Token expire ho gaya ya invalid hai!");
            // Yahan aap logout logic trigger kar sakte hain
        }
        return Promise.reject(error);
    }
);

// API Methods
export const getActivities = () => api.get('/activities');
export const addActivity = (activity) => api.post('/activities', activity);
export const getActivityDetail = (id) => api.get(`/recommendations/activity/${id}`);

export default api;