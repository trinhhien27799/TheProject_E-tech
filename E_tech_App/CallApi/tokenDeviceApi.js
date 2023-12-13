import api from '../apiService'
import { getDeviceToken, getUser } from '../session'

const updateDeviceToken = async () => {
    try {
        if (!getUser()) return ''
        const response = await api.post('/token/update', { token: getDeviceToken() })
        return response.data
    } catch (error) {
        throw error
    }
}

const deleteDeviceToken = async () => {
    try {
        if (!getUser()) return ''
        const response = await api.delete('/token/delete')
        return response.data
    } catch (error) {
        throw error
    }
}



export { deleteDeviceToken, updateDeviceToken }