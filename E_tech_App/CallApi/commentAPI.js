import api from '../apiService'

const getComments = async (productId) => {
  try {
    const rs = await api.get(`/comment/${productId}`)
    return rs.data
  } catch (error) {
    throw error
  }
}

const addComment = async (itemValidation, commentContent, numStar) => {
  const variationID = itemValidation.id;
  const productID = itemValidation.productId; 

  console.log('click')

  try {
    const rs = await api.post(`/comment/add`, {variationID: variationID, productID: productID, content: commentContent, numStar: numStar});
    console.log(rs.data);
    return rs.data;
  } catch (error) {
    console.log(error);
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

export { getComments, checkComment, pushComment, addComment }