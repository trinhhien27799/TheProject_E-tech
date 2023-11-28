import { convertSpeed } from "geolib";

var user = null

var myVoucher = [];

const setMyVoucher = (voucherArray) => {
  myVoucher = voucherArray;
}

const getMyVoucher = () => {
  return myVoucher;
}

const setUser = (newUser) => {
  user = newUser
}

const getUser = () => {
  return user
}

var productSelected = null

const setProductSelected = (object) => {
  productSelected = object
}

const getProductSelected = () => {
  return productSelected
}


var listCart = []

const pushListCart = (object) => {
  listCart.push(object)
}

const getListCart = () => {
  return listCart
}

const clearListCart = () => {
  listCart = []
}

const deleteItemInListCart = (object) => {
  const listFilter = listCart.filter((item) => item._id != object._id)
  listCart = listFilter
}

const updateItemInCart = ({ id, quantity }) => {
  const newArray = listCart.map((item) => {
    if (item._id == id) item.quantity = quantity
    return item
  })
  listCart = newArray
}

export {
  setUser, getUser,
  setProductSelected, getProductSelected,
  pushListCart, clearListCart, deleteItemInListCart, getListCart, updateItemInCart,
  getMyVoucher, setMyVoucher
}

