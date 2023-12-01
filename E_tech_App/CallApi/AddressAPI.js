import AsyncStorage from "@react-native-async-storage/async-storage"
import api, { setAuthToken } from '../apiService'

export const addAddress = async (fullname, phone, address) => {
    try {
        const rs = await api.post(`/user/address/new`, {numberphone: phone, address: address, fullname: fullname});
        return rs.data;
    } catch (error) {
        console.log(error);
    }
}

export const getAddress = async () => {
    try {
        const rs = await api.post(`/user/address/get-all`);
        return rs.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteAddress = async (data) => {
    console.log(data);
    try {
        const rs = await api.post(`/user/address/delete`, {data: data});
        const dataRs = rs.data;

        if (dataRs == 200){
            alert('Xóa thành công')
        }
        else{
            alert('Xóa không thành công')
        }
    } catch (error) {
        console.log(error);
    }
}