import axios from 'axios';
import { API_BASE_URL } from './CallApi/config';

const instance = axios.create({
    baseURL: 'http://10.0.2.2:3000/api',
    timeout: 30000, 
});

export const setAuthToken = (token) => {
    if (token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete instance.defaults.headers.common['Authorization'];
    }
};

export default instance;