import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5500' });

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const fetchProtected = () => API.get('/protected');
export const resetPassword = (data) => API.post('/auth/reset-password', data);
export const requestPasswordReset = (data) => API.post('/auth/request-password-reset', data);