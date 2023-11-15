import api, { setAuthToken } from '../apiService'

const getBrand = async () => {
    try {
        const response = await api.get('/brand/get-all')
        return response.data
    } catch (error) {
        console.error('Lỗi yêu cầu mạng:', error)
        throw error
    }
}



export { getBrand }