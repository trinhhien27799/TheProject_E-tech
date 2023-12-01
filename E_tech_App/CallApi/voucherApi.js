import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "./config";
import {getToken} from '../session';
import api, { setAuthToken } from '../apiService'

export const getAllVoucher = async () => {
    try {
        const response = await api.get(`/voucher/get-all`)
        return response.data;
    } catch (error) {
        console.error('Lỗi yêu cầu mạng:', error);
        throw error;
    }
}

export const addVoucher = async (voucherCode , voucherId) => {
    try {
        const response = await api.post(`/voucher/add`, {voucherCode: voucherCode, voucherId: voucherId});
        return response.data;
    } catch (error) {
        console.error('Lỗi yêu cầu mạng:', error);
        throw error;
    }
}
export const getMyVoucher = async () => {

    try {
        const response = await api.get(`/voucher/get`);
        return response.data;
    } catch (error) {
        console.error('Lỗi yêu cầu mạng:', error);
        throw error;
    }
}
