import { useEffect, useState } from "react"
import { getAllBill, getRealBill } from "../CallApi/billAPI"

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

export const getAllUserBill = () => {
    const [data, setData] = useState([])

    const getData = async () => {
        try {
            const rs = await getRealBill();
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



