import axios from 'axios';
import { API_BASE_URL } from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createBill = async (address , listIDcart,transport_fee,shipping_id,voucher_id, note) => {
    const token = await AsyncStorage.getItem('token');
    const username = await AsyncStorage.getItem('username');
    try {
        const response = await fetch(`${API_BASE_URL}/api/bill/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username:username,token:token, address:address, listIDcart:listIDcart,transport_fee:transport_fee,shipping_id:shipping_id,voucher_id:voucher_id,note:note})
        });
        const data = await response.json();
        console.log(data);
        if (data.code == 200) {
            alert('Tạo Bill thành công')
        } else
        alert (data.message);
        return data;

        
    } catch (error) {
        console.error('Lỗi yêu cầu mạng:', error);
        throw error;
    }
}

