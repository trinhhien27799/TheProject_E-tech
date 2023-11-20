import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../CallApi/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const vouchers = () => {
  const [voucher, setVoucher] = useState(null);
  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/voucher/get-all`).then((res) => {
      setVoucher(res.data);
    })
  }, [])

  return voucher;
}

export const myvouchers = () => {
    const username = AsyncStorage.getItem('username');
    console.log(username);
    const [myvoucher, setMyVoucher] = useState(null);
    useEffect(() => {
      axios.get(`${API_BASE_URL}/api/voucher/get`, {username: username}).then((res) => {
        setMyVoucher(res.data);
      })
    }, [])
  
    return myvoucher;
  }