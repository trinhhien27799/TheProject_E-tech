import React, { useEffect, useState } from "react";
import axios from "axios";

export const vouchers = () => {
  const [voucher, setVoucher] = useState(null);
  useEffect(() => {
    axios.get('http://192.168.110.173:3000/api/voucher/get-all').then((res) => {
      setVoucher(res.data);
    })
  }, [])

  return voucher;
}

export const myvouchers = () => {
    const [myvoucher, setMyVoucher] = useState(null);
    useEffect(() => {
      axios.get('http://192.168.110.173:3000/api/voucher/get').then((res) => {
        setMyVoucher(res.data);
      })
    }, [])
  
    return myvoucher;
  }