
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
export const updateImage = async (filename, type) => {
    try {
        const formData = new FormData();
        formData.append(type, {
            uri: filename,
            type: 'image/jpeg',
            name: `av_${new Date().getTime()}.jpg`,
        });
        const response = await api.post(`/user/update/${type}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error
    }
};

export const updateFullname = async (fullname) => {
    try {
        const response = await api.post('/user/update/fullname', { fullname: fullname });
        return response.data;
    } catch (error) {
        throw error;
    }
}