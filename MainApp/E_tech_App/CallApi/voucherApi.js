import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_USER_URL } from "./config";
export const getAllVoucher = async () => {
    const username = await AsyncStorage.getItem('username');
    try {
        const response = await fetch(`${API_USER_URL}/api/voucher/get-all`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username:username})
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



export const addVoucher = async (voucherCode , voucherID) => {
    const username = await AsyncStorage.getItem('username');
    try {
        const response = await fetch(`${API_USER_URL}/api/voucher/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username:username,voucherCode: voucherCode,voucherID: voucherID})
        });
        const data = await response.json();
        console.log(data);
        if (data.code == 200) {
            alert('Thêm voucher thành công')
        } else
        alert (data.message);
        return data;

        
    } catch (error) {
        console.error('Lỗi yêu cầu mạng:', error);
        throw error;
    }
}
export const getMyVoucher = async () => {
    const username = await AsyncStorage.getItem('username');
    try {
        const response = await fetch(`${API_USER_URL}/api/voucher/get`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username:username})
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
