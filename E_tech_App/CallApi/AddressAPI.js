import { getUser } from '../session';
import api from '../apiService'

export const addAddress = async (fullname, phone, address) => {
    try {
        if (!getUser()) throw "Đăng nhập để tiếp tục?"
        const rs = await api.post('/user/address/new', { numberphone: phone, address: address, fullname: fullname });
        return rs.data;
    } catch (error) {
        console.log(error);
    }
}

export const getListAddress = async () => {
    try {
        if (!getUser()) throw "Đăng nhập để tiếp tục?"
        const rs = await api.get('/user/address/get-all');
        return rs.data;
    } catch (error) {
        throw error
    }
}

export const deleteAddress = async (data) => {
    try {
        if (!getUser()) throw "Đăng nhập để tiếp tục?"
        const rs = await api.post(`/user/address/delete`, { addressId: data._id });
        const dataRs = rs.data;

        if (dataRs.code == 200) {
            alert('Xóa thành công')
        }
        else {
            alert(dataRs)
            console.log(dataRs)
        }
    } catch (error) {
        console.log(error);
    }
}

export const deleteListAddress = async (list) => {
    try {
        if (!getUser()) throw "Đăng nhập để tiếp tục?"
        const response = await api.post('/user/address/delete-list', { listAddressId: list });
        return response.data
    } catch (error) {
        throw error
    }
}


export const editAddress = async (_id, fullname, numberphone, address) => {
    try {
        if (!getUser()) throw "Đăng nhập để tiếp tục?"
        const response = await api.post('/user/address/update', {
            _id: _id, fullname: fullname, numberphone: numberphone, address: address
        })
        return response.data
    } catch (error) {
        throw error
    }
}


export const getProvinces = async () => {
    try {
        const response = await api.get('/address/provinces')
        return response.data
    } catch (error) {
        throw error
    }
}

export const getDistricts = async (parent_code) => {
    try {
        const response = await api.get(`/address/districts/${parent_code}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const getWards = async (parent_code) => {
    try {
        const response = await api.get(`/address/wards/${parent_code}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const getAllInfoByQuery = async (query) => {
    try {
        if (!getUser()) throw "Đăng nhập để tiếp tục?"
        const response = await api.get('/address/info/path_with_type', {
            params: {
                path: query
            }
        })
        return response.data
    } catch (error) {
        throw error
    }
}