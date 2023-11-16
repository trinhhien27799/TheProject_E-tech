import api, { setAuthToken } from '../apiService'

const getTypeProduct = async () => {
    try {
        const response = await api.get('/type-product/get-all')
        return response.data
    } catch (error) {
        console.error('Lỗi yêu cầu mạng:', error)
        throw error
    }
}

const getProductByType = async (name) => {
    try {
        const response = await api.get(`/type-product/get/${name}`)
        return response.data
    } catch (error) {
        console.error('Lỗi yêu cầu mạng:', error)
        throw error
    }
}

export { getTypeProduct, getProductByType }