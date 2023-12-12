
import api from '../apiService'

export const resetPassword = async (oldPass, newPass) => {
    try {
        const response = await api.post('/user/update/password', {
            oldPass: oldPass,
            newPass: newPass
        })
        return response.data
    } catch (error) {
        throw error;
    }

}
export const updateAvatar = async (filename) => {
    const formData = new FormData();
    formData.append('avatar', {
        uri: filename,
        type: 'image/jpeg',
        name: 'avatar.jpg',
    });
    const response = await api.post('/user/update/avatar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    // setUser(response.data.user);
    return response.data;
};

export const updateFullname=async (fullname)=>{
try{
    const response = await api.post('/user/update/fullname',{fullname:fullname});
    return response.data;
}catch (error) {
    console.error('Lỗi yêu cầu mạng:', error);
    throw error;
}
}