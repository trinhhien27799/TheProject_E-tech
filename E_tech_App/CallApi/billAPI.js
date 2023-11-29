import AsyncStorage from '@react-native-async-storage/async-storage'
import api, { setAuthToken } from '../apiService'

export const getAllBill = async (statusNum) => {
    const username = await AsyncStorage.getItem('username');
    const token = await AsyncStorage.getItem('token');

    console.log(username + ' ' + token);
    try {
        const bill = await api.post(`/bill/${statusNum}`, {username: username, token: token});
        return bill.data;
    } catch (error) {
        console.log(error);
    }
}

export const getRealBill = async () => {
    const username = await AsyncStorage.getItem('username');
    const token = await AsyncStorage.getItem('token');

    console.log(username + ' ' + token);
    try {
        const bill = await api.post(`/bill/get-all`, {username: username, token: token});
        return bill.data;
    } catch (error) {
        console.log(error);
    }
}

export const createBill = async () => {
    try {
        const addBill = await api.post('/bill/create');
    } catch (error) {
        console.log(error);
    }
}

export const cancelBill = async (item, reasonValue) => {
    const billId = item.item._id;

    try {
        const res = await api.post('/bill/cancel', {id_bill: billId, cancel_order: reasonValue});
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}