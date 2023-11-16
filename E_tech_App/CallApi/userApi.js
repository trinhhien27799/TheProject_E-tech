import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_USER_URL } from "./config";
import { useNavigation } from "@react-navigation/native";
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
export const updateAvatar = async(username,filename)=>{
    try{
        const token = await AsyncStorage.getItem('token')
        console.log(filename);
        const formData  = new FormData();
        formData.append('username', username)
        formData.append('token',token)
        formData.append('avatar', {
            uri: filename,
            type: 'image/jpeg', // Cập nhật loại file tùy thuộc vào loại ảnh bạn sử dụng
            name: 'avatar.jpg', // Tên file bạn muốn gửi
          });
        
        const response = await fetch(`${API_USER_URL}/update/avatar`,{
            method: 'POST',
            headers: {'Content-Type': 'multipart/form-data'},
            body:formData
        })
        const data = await response.json();
        return data;
    }catch (error) {
        console.error('Lỗi yêu cầu mạng:', error);
        throw error;
    }
}
export const updateFullname=async (fullname)=>{
    try{
        const token = await AsyncStorage.getItem('token');
        const username = await AsyncStorage.getItem('username');
        console.log(username);
        const response = await fetch(`${API_USER_URL}/update/fullname`,{
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({fullname:fullname,username:username,token:token})
        })
        const data = await response.json();
        return data;
    }catch (error) {
        console.error('Lỗi yêu cầu mạng:', error);
        throw error;
    }
}