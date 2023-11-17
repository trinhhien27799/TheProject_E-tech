import axios from 'axios';
import { API_BASE_URL } from './CallApi/config';

const instance = axios.create({
    baseURL: 'http://192.168.1.140:3000/api',
    timeout: 5000, 
});

export const setAuthToken = (token) => {
    if (token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete instance.defaults.headers.common['Authorization'];
    }
};

export default instance;