import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import tailwind from 'twrnc'
import { addCart } from '../../CallApi/cartApi'
import { getListCart, pushListCart } from '../../session'
import LoadingWidget from '../../Component/loading'
import { getItemBill } from '../../CallApi/billApi'
import { getDetailBill } from '../../Model/BillModel'

const OrderStatusChangeButton = ({ item }) => {
    const navigation = useNavigation();

    const styleFeedback = 'self-end p-2 bg-gray-500 rounded-md';
    const styleCancel = 'self-end p-2 bg-red-500 rounded-md ml-2';
    const styleBuyAgain = 'self-end p-2 bg-blue-500 rounded-md ml-2';
    const [loading, setLoading] = useState(false);

    const detailBill = getDetailBill(item._id)

    const AddCartArray = async (products) => {
        try {
            setLoading(true)
            await Promise.all(products.map(async (item) => {
                const cart = await addCart(item)
                pushListCart(cart)
            }))
            navigation.navigate('ButtonNavigation', { screen: 'Cart' }) 
        } catch (error) {
            console.log('OrderStatusChangeButton: ', error)
            alert("Đã xảy ra lỗi!")
        } finally {
            setLoading(false)
        }
    }
    return (
        <View>
            <View style={tailwind`w-full flex-row justify-end`}>
                {item.status != -1 &&
                    <TouchableOpacity style={tailwind`${styleFeedback}`}>
                        <Text style={tailwind`text-white font-bold`}>Phản Hồi</Text>
                    </TouchableOpacity>}
                {(item.status == 2 || item.status == -1) &&
                    (loading ?
                        <LoadingWidget />
                        :
                        <TouchableOpacity
                            style={tailwind`${styleBuyAgain}`}
                            onPress={() => AddCartArray(item.products)}
                        >
                            <Text style={tailwind`text-white font-bold`}>Mua Lại</Text>
                        </TouchableOpacity>)}
                {item.status == 0 &&
                    <TouchableOpacity
                        onPress={() => {navigation.navigate('CancelOrderScreen', { dataId: detailBill })}}
                        style={tailwind`${styleCancel}`}
                    >
                        <Text style={tailwind`text-white font-bold`}>Hủy Đơn Hàng</Text>
                    </TouchableOpacity>}
            </View>
        </View>
    )
}

export default OrderStatusChangeButton