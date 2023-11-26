import React, { useEffect, useState } from "react"
import { getItemProduct } from "../../CallApi/productApi";
import { useFocusEffect } from "@react-navigation/native";

const useItemProduct = (productId)=>{
    const [loading,setLoading] = useState(true);
    const [dataItem,setDataItem] = useState([]);
    const getData = async()=>{
        try {
            setLoading(true);
            const response = await getItemProduct(productId);
            setDataItem(response);
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }
    useFocusEffect(
        React.useCallback(()=>{
            getData();
        },[])
    )
    return {loading,dataItem,getData};
}
export default useItemProduct;