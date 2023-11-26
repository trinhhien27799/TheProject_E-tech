var user = null
var token = null
var userId = null

export const setUser = (newUser) => {
    user = newUser
  }
export const setUserId = (newUserId) => {
    userId = newUserId
  }
  
  export const setToken = (newToken) => {
    token = newToken
  }
  
  export const getUser = () => {
    return user
  }
  export const getUserId = () => {
    return userId
  }
  
  export const getToken = () => {
    return token
  }