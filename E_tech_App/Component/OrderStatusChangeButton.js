import { useNavigation } from '@react-navigation/native'
import React, { useRef, useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import tailwind from 'twrnc'
import { getBill } from '../Model/BillModel'
import { addCart } from '../CallApi/cartApi'
import { Dialog, Provider } from 'react-native-paper'
import BottomSheet from '@devvie/bottom-sheet'

const OrderStatusChangeButton = ({ statusNum, item, cancelButton }) => {  
    const navigation = useNavigation();

    const styleFeedback = 'self-end p-2 bg-gray-500 rounded-md';
    const styleCancel = 'self-end p-2 bg-red-500 rounded-md ml-2';
    const styleBuyAgain = 'self-end p-2 bg-blue-500 rounded-md ml-2';

    const AddCartArray = (productArray) => {
        console.log(productArray);
    
        for (let i = 0; i < productArray.length; i++) {
            addCart(productArray[i]);
        }

        navigation.navigate('CartScreen');
    }

    console.log(item); 

    switch (statusNum) {
        case 2:
            return (
                <View>
                    <View style={tailwind`w-full flex-row justify-end`}>
                        <TouchableOpacity style={tailwind `${styleFeedback}`}>
                            <Text style={tailwind`text-white font-bold`}>Phản Hồi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={tailwind `${styleBuyAgain}`}
                            onPress={() => AddCartArray(item.products)}
                        >
                            <Text style={tailwind`text-white font-bold`}>Mua Lại</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
            break;
    
        case -1:
            return (
                <View>
                    <View style={tailwind`w-full flex-row justify-end`}>
                        <TouchableOpacity style={tailwind `${styleFeedback}`}>
                            <Text style={tailwind`text-white font-bold`}>Phản Hồi</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
            break;

        case 2:
            return (
                <View>
                    <View style={tailwind`w-full flex-row justify-end`}>
                        <TouchableOpacity style={tailwind `${styleFeedback}`}>
                            <Text style={tailwind`text-white font-bold`}>Phản Hồi</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
            break;    

        default:
            return (
                <View style={tailwind`w-full flex-row justify-end`}>
                    <TouchableOpacity style={tailwind`${styleFeedback}`}>
                        <Text style={tailwind`text-white font-bold`}>Phản Hồi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('CancelOrderScreen', {item})}
                        style={tailwind`${styleCancel}`}
                    >
                        <Text style={tailwind`text-white font-bold`}>Hủy Đơn Hàng</Text>
                    </TouchableOpacity>
                </View>     
            )
            break;
    }
}

export default OrderStatusChangeButton