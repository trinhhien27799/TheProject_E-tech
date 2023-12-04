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
        const rs = await api.get(`/user/address/get-all`);
        return rs.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteAddress = async (data) => {
    console.log(data._id);
    try {
        const rs = await api.post(`/user/address/delete`, {_id: data._id});
        const dataRs = rs.data;

        if (dataRs.code == 200){
            alert('Xóa thành công')
        }
        else{
            alert(dataRs)
            console.log(dataRs)
        }
    } catch (error) {
        console.log(error);
    }
}

export const editAddress = async (_id, fullname, numberphone, address) => {
    try {
        const rs = await api.post(`/user/address/update`, {_id: _id, fullname: fullname, numberphone: numberphone, address: address});
        const dataRs = rs.data;

        if (dataRs.code == 200){
            alert('Cập nhật thành công')
        }
        else{
            alert(dataRs)
            console.log(dataRs)
        }
    } catch (error) {
        console.log(error);
    }
} 