import { useEffect, useState } from "react"
import { getAllBill } from "../CallApi/billAPI"

export const getBill = (statusNum) => {
    console.log(statusNum);
    const [data, setData] = useState([])

    const getData = async () => {
        try {
            const rs = await getAllBill(statusNum)
            setData(rs)
        } catch (error) {
            console.log(`ListOrder : ${error}`)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return data;
}

