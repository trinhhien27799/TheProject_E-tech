import { useEffect, useState } from "react"
import { getAllBill, getItemBill, getRealBill } from "../CallApi/billApi"

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

export const getDetailBill = (id) => {
    console.log('id: ' + id);
    const [data, setData] = useState(null)

    const getData = async () => {
        try {
            const response = await getItemBill(id)
            setData(response)
            console.log('data: ' + data)
        } catch (error) {
            console.log('CancelView: ', error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return data;
}



