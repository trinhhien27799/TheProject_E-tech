import React, { useEffect,useState } from "react";
import { deleteCart, getCart } from "../../CallApi/cartApi";
import { useFocusEffect } from "@react-navigation/native";
const CartHooks = ()=>{
    const [isLoading,setIsLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const fetchData =async()=>{
        try {
            setIsLoading(true);
            const data = await getCart();
            setCart(data);
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }
    useFocusEffect(
        React.useCallback(()=>{
            fetchData();
        },[])
    )
    const handleDelete = async(productId) => {
        try {
            await deleteCart(productId);
            fetchData();
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }
    return {isLoading,cart,handleDelete,fetchData}
}
export default CartHooks;