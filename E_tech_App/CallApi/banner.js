import api, { setAuthToken } from '../apiService'
 
 
 const getBanner = async () => {
    try {
      const response = await api.get('/banner/get-all')
      return response.data
    } catch (error) {
      console.error('Lỗi yêu cầu mạng:', error)
      throw error
    }
  }

  export {getBanner}