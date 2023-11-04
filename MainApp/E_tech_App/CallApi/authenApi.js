import { API_USER_URL } from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const registerUser = async (username, email, password,navigation) => {
    try {
        const response = await fetch(`${API_USER_URL}/create-account`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fullname:username,username:email, password:password})
        });
        const data = await response.json();
        if (data.code == 200) {
            navigation.navigate('Login');
            alert('Đăng ký thành công')
        } else
        alert (data.message);
        return data;  
    } catch (error) {
        console.error('Lỗi yêu cầu mạng:', error);
        throw error;
    }
}
export const insertOtp = async (email,check) => {
    try {
        const response = await fetch(`${API_USER_URL}/receive-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username:email,forgotPassword:check })
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
export const loginUser = async (username, password,navigation) => {
    try {
        const response = await fetch(`${API_USER_URL}/login`, {
            method: 'POST',
            headers: {
                
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (data.code === 200) {
            AsyncStorage.setItem('token',data.token);
            AsyncStorage.setItem('username',data.user.username)
            navigation.navigate('ButtonNavigation',{ registrationData: data });
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
export const verifyOTP = async (username,otp)=>{
    try{
        const response = await fetch(`${API_USER_URL}/verify-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, otp })
        });
        const data = await response.json();
        return data;
    }catch (error) {
        console.log(error);
    }
}
export const forgotPassword = async(username,password,navigation)=>{
    
    try{
        const response = await fetch(`${API_USER_URL}/forgot-password`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({username,password})
        })
        const data = await response.json();
        console.log(data);
        if (data.code === 200) {
            // navigation.navigate('ButtonNavigation');
            navigation.navigate('Taomk2')
        } else {
            alert(data.message)
        }
    }catch (error) {
        console.error('Lỗi yêu cầu mạng:', error);
        throw error;
    }
}