import axios from 'axios';
import { API_USER_URL } from './config';
export const getAllProduct = async () => {
  try {
    const response = await axios.get(`${API_USER_URL}/api/product/get-all`);
    return response.data;
  } catch (error) {
    console.error('Lỗi yêu cầu mạng:', error);
    throw error; // Khi bạn xử lý lỗi, bạn có thể throw nó để thông báo lỗi cho phía khác sử dụng hàm này.
  }
}
export const getBanner = async () => {
  try {
    const response = await axios.get(`${API_USER_URL}/api/banner/get-all`);
    return response.data;
  } catch (error) {
    console.error('Lỗi yêu cầu mạng:', error);
    throw error;
  }
}
