
import api from '../apiService'

const getCart = async () => {
    try {
        const token = await AsyncStorage.getItem('token')
        const username = await AsyncStorage.getItem('username')
        const response = await fetch(`${API_BASE_URL}/api/cart/get-all`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, token: token })
        })
        const data = await response.json()
        if (data.code == 200) {
            alert('Lấy giỏ hàng thành công')
        }
        return data;
    } catch (error) {
        console.error('Lỗi yêu cầu mạng:', error);
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


const deleteCart = async (ItemCartId) => {
    const token = getToken()
    const username = getUser()
    const uId = getUserId()
    try {
        const response = await fetch(`${API_BASE_URL}/api/cart/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, token: token, userId: uId, listIdCart: ItemCartId })
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export { addCart, deleteCart, getCart }

