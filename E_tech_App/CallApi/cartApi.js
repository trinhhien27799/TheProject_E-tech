import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "./config";

export const getCart = async () => {
    
    try {
        const token = await AsyncStorage.getItem('token');
        const username = await AsyncStorage.getItem('username');
        
        const response = await fetch(`${API_BASE_URL}/api/cart/get-all`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username:username ,token:token})
        });
        const data = await response.json();
        if (data.code == 200) {
            alert('Lấy giỏ hàng thành công')
        } 
        return data;
    } catch (error) {
        console.error('Lỗi yêu cầu mạng:', error);
        throw error;
    }
}


export const addCart = async ({dataCart}) => {
    const token = await AsyncStorage.getItem('token');
    const username = await AsyncStorage.getItem('username');
    try {
        const response = await fetch(`${API_BASE_URL}/api/cart/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username:username ,token:token,"variations_id":dataCart.variations_id,"quantity":dataCart.quantity})
        });
        const data = await response.json();
    } catch (error) {
        console.error('Lỗi yêu cầu mạng:', error);
        throw error;
    }
}