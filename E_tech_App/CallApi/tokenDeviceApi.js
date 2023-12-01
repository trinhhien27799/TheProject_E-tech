import api from '../apiService'
import { getUser, getDeviceToken } from '../session'

const updateDeviceToken = async () => {
    try {
        if (!getUser() || !getDeviceToken()) return ''
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



export { updateDeviceToken }