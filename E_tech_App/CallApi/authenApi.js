import api, { setAuthToken } from '../apiService'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { API_USER_URL } from './config'

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
        const response = await fetch(`${API_USER_URL}/api/user/receive-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: email, forgotPassword: check })
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error(email);
        }
    } catch (error) {
        console.error('Lỗi yêu cầu mạng:', error);
        throw error;
    }
}
export const loginUser = async (username, password) => {
    try {
        const response = await api.post('/user/login', { username, password })
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
        console.error('autoLogin:', error);
        throw error
    }
}
export const verifyOTP = async (username, otp) => {
    try {
        const response = await fetch(`${API_USER_URL}/api/user/verify-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, otp })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
export const forgotPassword = async (username, password, navigation) => {

    try {
        const response = await api.post('/user/forgot-password',{username, password})
        const data = await response.data;
        if (data.code === 200) {
            // navigation.navigate('ButtonNavigation');
            navigation.navigate('Taomk2')
        } else {
            alert(data.message);
            navigation.navigate('Login');
        }
    } catch (error) {
        console.error('Lỗi yêu cầu mạng:', error);
        throw error;
    }
}