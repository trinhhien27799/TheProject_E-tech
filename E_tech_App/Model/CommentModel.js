import { useEffect, useState } from "react"
import { getComments } from "../CallApi/commentAPI";

export const getAllComment = (productID) => {
    const [commentData, setCommentData] = useState(null);

    const getData = async () => {
        try {
            const rs = await getComments(productID);
            setCommentData(rs);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return commentData;
}