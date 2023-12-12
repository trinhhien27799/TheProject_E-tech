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

export const cancelBill = async (item, reasonValue) => {
    const billId = item._id;
    const navigation = useNavigation()

    try {
        const res = await api.post('/bill/cancel', { id_bill: billId, cancel_order: reasonValue });
        const data = res.data;

        if (data == 200) {
            alert('Hủy đơn hàng thành công');
            navigation.goBack();
        }
        else {
            alert('Hủy đơn hàng không thành công');
        }
    } catch (error) {
        console.log(error);
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
