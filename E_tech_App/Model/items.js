import React, { useEffect, useState } from "react";
import axios from "axios";

const items = () => {
  const [product, setProduct] = useState(null);
  useEffect(() => {
    axios.get('http://192.168.11.3:3000/api/product/get-all').then((res) => {
      setProduct(res.data);
    })
  }, [])

  return product;
}

// const items = [
//   {
//     id: 1,
//     name: 'Iphone 15 Pro Max',
//     price: '34.990.000',
//     loai:'256gb',
//     company: 'Iphone',
//     status: true,
//     url: require('../img/iphone.jpg')
//   },
//   {
//     id: 2,
//     name: 'Samsung Galaxy S22',
//     price: '30.990.000',
//     loai: '128gb',
//     company: 'Samsung',
//     status: true,
//     url: require('../img/samsung.jpg')
//   },
//   {
//     id: 3,
//     name: 'Google Pixel 7 Pro',
//     price: '29.990.000',
//     company: 'Google',
//     loai: '256gb',
//     status: true,
//     url: require('../img/google.png')
//   },
//   {
//     id: 4,
//     name: 'OnePlus 10 Pro',
//     price: '28.990.000',
//     company: 'OnePlus',
//     loai: '256gb',
//     status: true,
//     url: require('../img/oneplus.jpeg')
//   },
//   {
//     id: 5,
//     name: 'Xiaomi Mi 12',
//     price: '25.990.000',
//     company: 'Xiaomi',
//     loai: '128gb',
//     status: false,
//     url: require('../img/Xiaomi.png')
//   },
//   {
//     id: 6,
//     name: 'Huawei P50 Pro',
//     price: '27.990.000',
//     company: 'Huawei',
//     loai: '256gb',
//     status: true,
//     url: require('../img/Hauwei.jpg')
//   },
// ];


export default items;