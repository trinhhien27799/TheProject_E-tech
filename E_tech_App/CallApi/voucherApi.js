
import api from '../apiService'
import { getUser } from '../session';

export const getAllVoucher = async () => {
    try {
        const handleUser = getUser();
        const route = handleUser != null ? 'get-by-user' : 'get-all'
        const response = await api.get(`/voucher/${route}`)
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addVoucher = async (voucherCode, voucherId) => {
    try {
        if (!getUser()) throw "Đăng nhập để tiếp tục"
        const response = await api.post(`/voucher/add`, { voucherCode: voucherCode, voucherId: voucherId });
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getMyVoucher = async () => {

    try {
        if (!getUser()) throw "Đăng nhập để tiếp tục"
        const response = await api.get(`/voucher/get`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
