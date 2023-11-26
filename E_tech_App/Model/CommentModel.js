import { useEffect, useState } from "react"
import { getAllComments } from "../CallApi/commentAPI";

export const getComment = (productID) => {
    const [commentData, setCommentData] = useState(null);

    const getData = async () => {
        try {
            const rs = await getAllComments(productID);
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