import api, { setAuthToken } from '../apiService'

const getShipping = async () => {
    try {
        const response = await api.get('/shipping/get-all')
        return response.data
    } catch (error) {
        console.error('Lỗi yêu cầu mạng:', error)
        throw error
    }
}

export { getShipping }