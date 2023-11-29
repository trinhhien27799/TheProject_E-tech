import axios from 'axios';
import { API_USER_URL } from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api, { setAuthToken } from '../apiService'
import { getUser } from '../session.js'

export const getVariationDetail = async (variationID) => {
  try {
    const rs = await api.get(`/product/variation/${variationID}`)
    return rs.data;
  } catch (error) {
    console.log(error);
  }
}

const getAllProduct = async () => {
  try {
    const rs = await api.get('/product/get-all')
    return rs.data
  } catch (error) {
    throw error
  }
}

const getAllProductByFilter = async (data) => {
  try {
    const rs = await api.get(`/${data.route}/get/${data.id}`)
    return rs.data
  } catch (error) {
    throw error
  }
}

const getItemProduct = async (productId) => {
  try {
    const response = await api.post(`/product/${productId}`, {
      userId: getUser() ? getUser()._id : null
    })
    return response.data
  } catch (error) {
    throw error
  }
}

const handleLike = async (boolean, productId) => {
  try {
    const option = boolean ? 'add' : 'delete'
    const response = await api.post(`/favorite/${option}`, {
      productId: productId
    })
    return response.data
  } catch (error) {
    throw error
  }
}

const getRelated = async (productId) => {
  try {
    const response = await api.get(`/product/related/${productId}`)
    return response.data
  } catch (error) {
    throw error
  }
}



export { getAllProduct, getAllProductByFilter, getItemProduct, handleLike, getRelated }
