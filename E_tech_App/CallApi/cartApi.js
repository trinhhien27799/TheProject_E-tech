
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../apiService'

const getCart = async () => {
    const token = await AsyncStorage.getItem('token');

    try {
        const response = await api.post('/cart/get-all', {token: token})
        return response.data
    } catch (error) {
        throw error;
    }
}


const addCart = async (newCart) => {
    try {
        const response = await api.post('/cart/add', newCart)
        return response.data
    } catch (error) {
        throw error
    }
}


const deleteCart = async (listIdCart) => {
    try {
        const response = await api.post('/cart/delete', { listIdCart: listIdCart })
        return response.data
    } catch (error) {
        throw error
    }
}

export { addCart, deleteCart, getCart }

