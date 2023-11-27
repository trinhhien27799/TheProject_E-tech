import { useState,useEffect } from "react";
import { toggleLike } from "../../CallApi/productApi";

const useLikeToggle = (productId)=>{
    console.log(productId);
    const [checkHeart,setCheckHeart] = useState(false);
    useEffect(()=>{
        const fectData = async()=>{
            const resultCheckLike = await toggleLike({ product_id: route._id, action: 'check' });
            setCheckHeart(resultCheckLike);
            console.log("==============="+resultCheckLike);
        };
        fectData();
    },[productId]);
    const handleUnlike = async ()=>{
        if (!checkHeart) {
            setCheckHeart(true);
            await toggleLike({ product_id: route._id, action: 'add' });
          }else{
            setCheckHeart(false);
            await toggleLike({ product_id: route._id, action: 'delete' });
      
          }
    };
    return {checkHeart,handleUnlike};

};
export default useLikeToggle;