import api from '../apiService'

export const getAllComments = async (productID) => {
    try {
        const rs = await api.get(`/comment/${productID}`)
        return rs.data
      } catch (error) {
        console.log(error)
        throw error
      }
}