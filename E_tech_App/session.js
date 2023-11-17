var user = null
var token = null

export const setUser = (newUser) => {
    user = newUser
  }
  
  export const setToken = (newToken) => {
    token = newToken
  }
  
  export const getUser = () => {
    return user
  }
  
  export const getToken = () => {
    return token
  }