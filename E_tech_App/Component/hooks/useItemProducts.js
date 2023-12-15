import { useEffect, useState } from "react"
import { getAllProduct } from "../../CallApi/productApi";
import { getAllVoucher } from "../../CallApi/voucherApi";

const ItemProduct = ()=>{
    const [isLoading,setLoading] = useState(true);
    const [dataItem,setDataItem] = useState([]);
    const [dataVoucher,setDataVoucher] = useState([]);
    const getData = async()=>{
        try {
            setLoading(true);
            const response = await getAllProduct();
            const rsVoucher = await getAllVoucher();
            setDataVoucher(rsVoucher);
            setDataItem(response);
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        getData();
    },[]);
    return {isLoading,dataItem,dataVoucher};
}

export default ItemProduct;