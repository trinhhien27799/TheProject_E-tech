import api, { setAuthToken } from '../apiService'
import AsyncStorage from "@react-native-async-storage/async-storage"

export const registerUser = async (username, email, password, navigation) => {
    try {
        const response = await api.post('/user/create-account', { fullname: username, username: email, password: password })
        return response.data
    } catch (error) {
        console.error('Lỗi yêu cầu mạng:', error)
        throw error
    }
}
export const insertOtp = async (email, check) => {
    try {
        const response = await api.post('/user/receive-otp',
            {
                username: email,
                forgotPassword: check
            }
        );

        return response.data
    } catch (error) {
        console.error('Lỗi yêu cầu mạng:', error);
        throw error;
    }
}
export const loginUser = async (username, password) => {
    try {
        const response = await api.post('/user/login', { username: username, password: password })
        return response.data
    } catch (error) {
        throw error;
    }
}
export const autoLogin = async () => {
    try {
        const token = await AsyncStorage.getItem("token")
        if (!token) throw "can not get token"
        setAuthToken(token)
        const response = await api.post('/user/auto-login')
        return response.data
    } catch (error) {
        throw error
    }
}
export const verifyOTP = async (username, otp) => {
    try {
        const response = await api.post('/user/verify-otp', { username, otp })
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}
export const forgotPassword = async (username, password, navigation) => {

    try {
        const response = await api.post('/user/forgot-password', { username, password })
        return response.data;
    } catch (error) {
        throw error;
    }
}