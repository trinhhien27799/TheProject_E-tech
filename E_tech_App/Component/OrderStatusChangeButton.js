import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import tailwind from 'twrnc'
import { getBill } from '../Model/BillModel'
import { addCart } from '../CallApi/cartApi'

const OrderStatusChangeButton = ({ statusNum, item }) => {  
    const navigation = useNavigation();

    const AddCartArray = (productArray) => {
        console.log(productArray.length);
    
        for (let i = 0; i < productArray.length; i++) {
            addCart({dataCart: productArray[i]});
        }

        navigation.navigate('CartScreen');
    }

    console.log(item); 

    if (statusNum == 3) {
        return (
            <View>
                <View style={tailwind`w-full flex-row justify-end`}>
                    <TouchableOpacity style={tailwind`self-end p-3 bg-gray-500 rounded-md mr-2`}>
                        <Text style={tailwind`text-white font-bold`}>Phản Hồi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={tailwind`self-end p-3 bg-blue-500 rounded-md`}
                        onPress={() => AddCartArray(item.products)}
                    >
                        <Text style={tailwind`text-white font-bold`}>Mua Lại</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    else {
        return (
            <View>
                <View style={tailwind`w-full flex-row justify-end`}>
                    <TouchableOpacity style={tailwind`self-end p-3 bg-gray-500 rounded-md mr-2`}>
                        <Text style={tailwind`text-white font-bold`}>Phản Hồi</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}

export default OrderStatusChangeButton