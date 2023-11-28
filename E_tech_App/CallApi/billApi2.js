import axios from 'axios';
import { API_BASE_URL } from './config';
import api, { setAuthToken } from '../apiService'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createBill = async (address , listIDcart,transport_fee,shipping_id,voucher_id, note , navigation) => {
    const token = await AsyncStorage.getItem('token');
    const username = await AsyncStorage.getItem('username');

    console.log(username + ' ' + token);

    try {
        const res = await api.post('/bill/create', {username:username,token:token, address:address, listIDcart:listIDcart,transport_fee:transport_fee,shipping_id:shipping_id,voucher_id:voucher_id,note:note})
        const data = await res.data;
        console.log(data);
        if (data.code === 200) {
            navigation.navigate('OrderScreen',{ registrationData: data });
            alert('Đặt hàng thành công')
        } else {
            alert(data.message)
        }
        return data;
    } catch (error) {
        console.error('Lỗi yêu cầu mạng:', error);
        throw error;
    }
}

