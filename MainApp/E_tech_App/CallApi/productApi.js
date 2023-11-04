import axios from 'axios';
import { API_BASE_URL } from './config';
export const getAllProduct = async (username) => {
    try {
       axios.get(`${API_BASE_URL}/api/product/get-all`).then((res) => {
          })
        return res.data;
    } catch (error) {
        console.error('Lỗi yêu cầu mạng:', error);
        throw error;
    }
}