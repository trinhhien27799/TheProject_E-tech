
import api from '../apiService'
import { getUser } from '../session.js'


const getNotifications = async () => {
    try {
        if (!getUser()) return []
        const response = await api.get('/notification/get-all')
        return response.data
    } catch (error) {
        throw error
    }
}

const seenAllNotification = async () => {
    try {
        if (!getUser()) return ''
        const response = await api.get('/notification/seen-all')
        return response.data
    } catch (error) {
        throw error
    }
}

const deleteAllNotification = async () => {
    try {
        if (!getUser()) return ''
        const response = await api.delete('/notification/delete-all')
        return response.data
    } catch (error) {
        throw error
    }
}

export { getNotifications, seenAllNotification, deleteAllNotification }