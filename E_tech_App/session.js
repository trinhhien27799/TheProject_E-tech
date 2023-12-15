


var user = null

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

const setListCart = (list) => {
  listCart = list
}

var deviceToken = null


var address = null

const setAddress = (object) => {
  address = object
  console.log(address)
}

const getAddress = () => {
  return address
}

var shipping = null

const setShipping = (object) => {
  shipping = object
}

const getShipping = () => {
  return shipping
}

var voucher = null

const setVoucher = (object) => {
  voucher = object
}

const getVoucher = () => {
  return voucher
}

var payment = null

const setPayment = (object) => {
  payment = object
}

const getPayment = () => {
  return payment
}
var check = false;

const setCheck = (newCheck)=>{
  check = newCheck;
}
const getCheck = () => {
  return check;
}
var listChats = [];
const setChat = (newChats)=>{
  listChats.push(newChats);
}
const getChats = () => {
  return listChats;
}
const cleanChats = ()=>{
  listChats = [];
}
var deviceToken = null

const setDeviceToken = (token) => {
  deviceToken = token
}

const getDeviceToken = () => {
  return deviceToken
}




export {
  setUser, getUser,
  setProductSelected, getProductSelected,
  pushListCart, clearListCart, deleteItemInListCart, getListCart, updateItemInCart, setListCart,
  setAddress, getAddress,
  getShipping, setShipping,
  setVoucher, getVoucher,
  setPayment, getPayment,
  setCheck,getCheck,
  setChat,getChats,cleanChats
  setDeviceToken,getDeviceToken
}

