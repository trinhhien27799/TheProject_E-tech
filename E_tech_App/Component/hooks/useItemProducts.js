import { useEffect, useState } from "react"
import { getItemProduct } from "../../CallApi/productApi";

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
    useEffect(()=>{
        getData();
    },[]);
    return {loading,dataItem};
}
export default useItemProduct;