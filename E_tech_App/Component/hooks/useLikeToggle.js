import { useState,useEffect } from "react";
import { toggleLike } from "../../CallApi/productApi";

const useLikeToggle = (productId)=>{
    const [checkHeart,setCheckHeart] = useState(false);
    useEffect(()=>{
        const fectData = async()=>{
            const resultCheckLike = await toggleLike({ product_id: productId, action: 'check' });
            setCheckHeart(resultCheckLike);
        };
        fectData();
    },[productId]);
    const handleUnlike = async ()=>{
        if (!checkHeart) {
            setCheckHeart(true);
            await toggleLike({ product_id: productId, action: 'add' });
          }else{
            setCheckHeart(false);
            await toggleLike({ product_id: productId, action: 'delete' });
          }
    };
    return {checkHeart,handleUnlike};

};
export default useLikeToggle;