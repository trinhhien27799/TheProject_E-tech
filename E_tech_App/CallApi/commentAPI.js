import api from '../apiService'

const getComments = async (productId) => {
  try {
    const rs = await api.get(`/comment/${productId}`)
    return rs.data
  } catch (error) {
    throw error
  }
}


const checkComment = async (data) => {
  try {
    const rs = await api.post('/comment/check', data)
    return rs.data
  } catch (error) {
    throw error
  }
}

const pushComment = async (form) => {
  try {
    const rs = await api.post('/comment/add', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return rs.data
  } catch (error) {
    throw error
  }
}

export { getComments, checkComment, pushComment}