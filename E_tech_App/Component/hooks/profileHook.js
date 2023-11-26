import React, { useEffect,useState } from "react";
import { getLike } from "../../CallApi/productApi";
import { getMyVoucher } from "../../CallApi/voucherApi";
import { useFocusEffect } from "@react-navigation/native";
const ProfileHooks = ()=>{
    const [likeData, setLikeData] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    const fetchData = async () => {
       try {
        setIsLoading(true);
        const data = await getMyVoucher();
        const like = await getLike();
        setLikeData(like);
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
    return {likeData,isLoading};
}
export default ProfileHooks;
