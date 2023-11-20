import api, { setAuthToken } from '../apiService'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { setToken } from '../session'
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
export const loginUser = async (username, password, navigation) => {
    try {
        const response = await fetch(`${API_USER_URL}/api/user/login`, {
            method: 'POST',
            headers: {

                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (data.code === 200) {
            AsyncStorage.setItem('token', data.token);
            AsyncStorage.setItem('username', data.user.username)
            navigation.navigate('ButtonNavigation', { registrationData: data });
            alert('Đăng nhập thành công')
            // <ShowNotification title={'Đăng nhập thành công'}type={'success'}/>

        } else {
            alert(data.message)
        }
        return data;
    } catch (error) {

        console.error('Lỗi yêu cầu mạng:', error);
        throw error;
    }
}
export const autoLogin = async () => {
    try {
        const token = await AsyncStorage.getItem("token")
        console.log(token);
        if (!token)
            throw "can not get token"
        setToken(token)
        const response = await api.post('/user/auto-login', { token: token })
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
        const response = await fetch(`${API_USER_URL}/api/user/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        const data = await response.json();
        console.log(data);
        if (data.code === 200) {
            // navigation.navigate('ButtonNavigation');
            navigation.navigate('Taomk2')
        } else {
            alert(data.message)
        }
    } catch (error) {
        console.error('Lỗi yêu cầu mạng:', error);
        throw error;
    }
}