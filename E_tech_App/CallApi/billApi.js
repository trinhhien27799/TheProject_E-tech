import AsyncStorage from '@react-native-async-storage/async-storage'
import api, { setAuthToken } from '../apiService'
import { useNavigation } from '@react-navigation/native';

export const getBillByStatus = async (status) => {
    try {
        const bill = await api.get(`/bill/${status}`);
        return bill.data;
    } catch (error) {
        throw error
    }
}

export const createBill = async (data) => {
    try {
        const res = await api.post('/bill/create', data)
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const updateStatusPaymentBill = async (billId) => {
    try {
        const res = await api.post('/bill/update-status-payment', {
            billId: billId,
            status: 1
        })
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const cancelBill = async (billId, cancel_order) => {
    try {
        const res = await api.post('/bill/cancel', { id_bill: billId, cancel_order: cancel_order });
        return res.data
    } catch (error) {
        throw error
    }
}

export const getItemBill = async (id) => {
    try {
        const response = await api.get(`/bill/detail/${id}`);
        return response.data
    } catch (error) {
        throw error
    }
}
