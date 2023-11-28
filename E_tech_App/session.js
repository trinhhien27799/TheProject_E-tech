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

const deleteItemInListCart = (cartId) => {
  const listFilter = listCart.filter((item) => item._id != cartId)
  listCart = listFilter
}

export {
  setUser, getUser,
  setProductSelected, getProductSelected,
  pushListCart, clearListCart, deleteItemInListCart, getMyVoucher, setMyVoucher
}

