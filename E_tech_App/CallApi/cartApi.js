
import api from '../apiService'

const getCart = async () => {
    try {
        const response = await api.get('/cart/get-all')
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

const updateCart = async (data) => {
    try {
        const response = await api.post('/cart/update',data)
        return response.data
    } catch (error) {
        throw error
    }
}

export { addCart, deleteCart, getCart,updateCart }

