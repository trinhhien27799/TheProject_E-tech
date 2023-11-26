import axios from 'axios';
import { API_BASE_URL } from './CallApi/config';

const instance = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    timeout: 5000, 
});

export const setAuthToken = (token) => {
    if (token) {
        instance.defaults.headers.common['Authorization'] = token;
    } else {
        delete instance.defaults.headers.common['Authorization'];
    }
};

export default instance;