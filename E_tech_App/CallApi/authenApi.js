import api, { setAuthToken } from '../apiService'
import AsyncStorage from "@react-native-async-storage/async-storage"

export const registerUser = async (fullname, email, password) => {
    try {
        const response = await api.post('/user/create-account', { fullname: fullname, username: email, password: password })
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
        if (token) {
            setAuthToken(token)
            const response = await api.post('/user/auto-login')
            return response.data
        }
        return { code: 400 }
    } catch (error) {
        throw error
    }
}
export const verifyOTP = async (username, otp) => {
    try {
        const response = await api.post('/user/verify-otp', { username, otp })
        return response.data
    } catch (error) {
        throw error;
    }
}
export const forgotPassword = async (username, password) => {

    try {
        const response = await api.post('/user/forgot-password', { username: username, password: password })
        return response.data;
    } catch (error) {
        throw error;
    }
}