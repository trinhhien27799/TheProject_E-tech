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

export const getLike = async () => {
  try {
    const token = await AsyncStorage.getItem('token')
    const username = await AsyncStorage.getItem('username')
    const response = await fetch(`${API_USER_URL}/api/favorite/get-all`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, username })
    })
    const data = response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
export const toggleLike = async ({ product_id, action }) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const username = await AsyncStorage.getItem('username');

    let endpoint = '';
    let method = '';

    switch (action) {
      case 'add':
        endpoint = `${API_USER_URL}/api/favorite/add`;
        method = 'POST';
        break;
      case 'check':
        endpoint = `${API_USER_URL}/api/favorite/check`;
        method = 'POST';
        break;
      case 'delete':
        endpoint = `${API_USER_URL}/api/favorite/delete`;
        method = 'POST';
        break;
      default:
        throw new Error('Invalid action');
    }

    const response = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, username, product_id }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const getNotifi = async ({ action }) => {
  try {
    const token = await AsyncStorage.getItem('token')
    const username = await AsyncStorage.getItem('username')
    let endpoint = '';
    switch (action) {
      case 'get':
        endpoint = `${API_USER_URL}/api/notification/get-all`;
        break;
      case 'seenAll':
        endpoint = `${API_USER_URL}/api/notification/seen-all`;
        break;
      default:
        throw new Error('Invalid action');

    }
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, username })
    })
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}


export const getBrandName = async ({ brand_name }) => {
  try {
    const response = await axios.get(`${API_USER_URL}/api/product/get/brand/${brand_name}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

