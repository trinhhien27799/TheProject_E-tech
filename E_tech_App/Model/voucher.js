import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../CallApi/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMyVoucher } from "../CallApi/voucherApi";

export const vouchers = () => {
  const [voucher, setVoucher] = useState(null);
  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/voucher/get-all`).then((res) => {
      setVoucher(res.data);
    })
  }, [])

  return voucher;
}

export const myvouchers = async () => {
  
  try {
    const data = await getMyVoucher();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }

  
}