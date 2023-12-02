import AsyncStorage from '@react-native-async-storage/async-storage'
import api, { setAuthToken } from '../apiService'
import { useNavigation } from '@react-navigation/native';

export const getAllBill = async (statusNum) => {
    try {
        const bill = await api.get(`/bill/${statusNum}`);
        return bill.data;
    } catch (error) {
        console.log(error);
    }
}

export const getRealBill = async () => {
    try {
        const bill = await api.get('/bill/get-all');
        return bill.data;
    } catch (error) {
        console.log(error);
    }
}

export const createBill = async (address, listIDcart, transport_fee, shipping_id, voucher_id, note, navigation) => {
    try {
        const res = await api.post('/bill/create', { address: address, listIdCart: listIDcart, transport_fee: transport_fee, shipping_id: shipping_id, voucher_id: voucher_id, note: note })
        const data = res.data;
        console.log(data.message);
        alert(data.message)
        return data;
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