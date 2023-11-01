import axios from 'axios';
export const getAllProduct = async (username) => {
    try {
       axios.get('http://192.168.11.3:3000/api/product/get-all').then((res) => {
          })
        return res.data;
    } catch (error) {
        console.error('Lỗi yêu cầu mạng:', error);
        throw error;
    }
}