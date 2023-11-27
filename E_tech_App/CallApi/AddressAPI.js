import AsyncStorage from "@react-native-async-storage/async-storage"
import api, { setAuthToken } from '../apiService'

export const addAddress = async (fullname, phone, address) => {
    const username = await AsyncStorage.getItem('username');
    const token = await AsyncStorage.getItem('token');

    try {
        const rs = await api.post(`/user/address/new`, {username: username, token: token, numberphone: phone, address: address, fullname: fullname});
        return rs.data;
    } catch (error) {
        console.log(error);
    }
    console.log(username + ' ' + token);
}

export const getAddress = async () => {
    const username = await AsyncStorage.getItem('username');
    const token = await AsyncStorage.getItem('token');

    try {
        const rs = await api.post(`/user/address/get-all`, {username: username, token: token});
        return rs.data;
    } catch (error) {
        console.log(error);
    }
    console.log(username + ' ' + token);
}