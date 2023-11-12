import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import tailwind from 'twrnc'

const OrderStatusChangeButton = ({ statusNum }) => {
    if (statusNum == 3) {
        return (
            <View>
                <View style={tailwind`w-full flex-row justify-end`}>
                    <TouchableOpacity style={tailwind`self-end p-3 bg-gray-500 rounded-md mr-2`}>
                        <Text style={tailwind`text-white font-bold`}>Phản Hồi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={tailwind`self-end p-3 bg-blue-500 rounded-md`}>
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