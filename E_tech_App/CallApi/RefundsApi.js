import api, { setAuthToken } from '../apiService'

const getRefunds = async (status) => {
    try {
        const response = await api.get(`/refunds/${status}`)
        return response.data
    } catch (error) {
        throw error
    }
}



export { getRefunds }