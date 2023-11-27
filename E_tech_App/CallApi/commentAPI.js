import api from '../apiService'

const getComments = async (productId) => {
  try {
    const rs = await api.get(`/comment/${productId}`)
    return rs.data
  } catch (error) {
    throw error
  }
}

const checkComment = async (productId) => {
  try {
    const rs = await api.post('/comment/check', {
      productId: productId
    })
    return rs.data
  } catch (error) {
    throw error
  }
}

export { getComments,checkComment }