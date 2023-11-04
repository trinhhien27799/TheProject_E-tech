import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "./config";
export const getCart = async () => {
    const token = await AsyncStorage.getItem('token');
    const username = await AsyncStorage.getItem('username');
    try {
        
        const response = await fetch(`${API_BASE_URL}/api/cart/get-all`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username:username ,token:token})
        });
        const data = await response.json();
        console.log(data);
        if (data.code == 200) {
            alert('Lấy giỏ hàng thành công')
        } else
        alert (data.message);
        return data;
    } catch (error) {
        console.error('Lỗi yêu cầu mạng:', error);
        throw error;
    }
}


export const addCart = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/cart/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username:username ,token:token,data:data})
        });
        const data = await response.json();
        console.log(data);
        if (data.code == 200) {
            alert('Thêm vào giỏ hàng thành công')
        } else
        alert (data.message);
        return data;

        
    } catch (error) {
        console.error('Lỗi yêu cầu mạng:', error);
        throw error;
    }
}