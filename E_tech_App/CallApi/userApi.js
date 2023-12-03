import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_USER_URL } from "./config";
import { useNavigation } from "@react-navigation/native";
import api from '../apiService'

export const resetPassword =async(username,oldPass,newPass)=>{
    const navigation = useNavigation();
    try{
        const token = await AsyncStorage.getItem('token')
        const response = await fetch(`${API_USER_URL}/update/password`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username:username,oldPass:oldPass,newPass:newPass,token:token})
        })
        const data = await response.json();
        if (data.code === 200) {
            navigation.goBack();
        } else {
            alert(data.message)
        }
    }catch (error) {
        console.error('Lỗi yêu cầu mạng:', error);
        throw error;
    }
    
}
export const updateAvatar = async(filename)=>{
    try{
        const formData  = new FormData();
        formData.append('avatar', {
            uri: filename,
            type: 'image/jpeg', 
            name: 'avatar.jpg', 
          });
        const response = await api.post('/user/update/avatar',formData)
        return response.data;
    }catch (error) {
        console.error('Lỗi yêu cầu mạng:', error);
        throw error;
    }
}
export const updateFullname=async (fullname)=>{
    try{
        const response = await api.post('/user/update/fullname',{fullname:fullname});
        return response.data;
    }catch (error) {
        console.error('Lỗi yêu cầu mạng:', error);
        throw error;
    }
}