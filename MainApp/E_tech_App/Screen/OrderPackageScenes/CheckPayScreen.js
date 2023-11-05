import React from 'react'
import { Image, Text } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { FlatList } from 'react-native'
import tailwind from 'twrnc'

import OrderStatusSet from '../../Component/OrderStatusSet'
import OrderStatusChangeButton from '../../Component/OrderStatusChangeButton'
import { useNavigation } from '@react-navigation/native'

const ListOrder = [
    {
        billDate: '30/10/2023',
        billID: 'ABC123',
        shipStatus: 3,
        productQuantity: 1,
        billPrice: 30000000
    },
    {
        billDate: '30/10/2023',
        billID: 'ABC123',
        shipStatus: 2,
        productQuantity: 1,
        billPrice: 30000000
    },
    {
        billDate: '30/10/2023',
        billID: 'ABC123',
        shipStatus: 3,
        productQuantity: 1,
        billPrice: 30000000
    },
    {
        billDate: '30/10/2023',
        billID: 'ABC123',
        shipStatus: 2,
        productQuantity: 1,
        billPrice: 30000000
    },
    {
        billDate: '30/10/2023',
        billID: 'ABC123',
        shipStatus: 1,
        productQuantity: 1,
        billPrice: 30000000
    },
];

const SwitchScreen = () => {
    const navigation = useNavigation();
    navigation.navigate('BillDetailScreen');
    console.log('on switch screen')
}

const ProductCard = ({ item }) => {
    return (
        <TouchableOpacity onPress={() => SwitchScreen}>
            <View style={tailwind`mt-3 bg-white p-5`}>
                <View >
                    {/* Product View */}
                    <View style={tailwind``}>
                        <View style={tailwind`flex-row`}>
                            <Image
                                source={{ uri: 'https://cdn.hoanghamobile.com/i/preview/Uploads/2023/09/13/iphone-15-pro-natural-titanium-pure-back-iphone-15-pro-natural-titanium-pure-front-2up-screen-usen.png' }}
                                style={tailwind`h-26 w-18`}
                            />

                            <View style={tailwind`ml-3`}>
                                <Text style={tailwind`font-bold text-base`}>Đơn hàng - {item.billDate}</Text>
                                <Text>Mã: {item.billID}</Text>
                            </View>
                        </View>

                        {/* Ship Status */}
                        <View style={tailwind``}>
                            <OrderStatusSet statusNum={item.shipStatus} />
                        </View>
                    </View>
                </View>

                <View style={tailwind`bg-gray-200 w-full h-0.5 my-3`}></View>

                <View style={tailwind`justify-center flex-row flex-auto px-16`}>
                    <View style={tailwind``}>
                        <Text style={tailwind`py-2 justify-center`}>Số lượng sản phẩm: {item.productQuantity}</Text>
                        <Text style={tailwind``}>Tổng tiền: {item.billPrice}</Text>
                    </View>

                    <View>
                        <OrderStatusChangeButton statusNum={item.shipStatus} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const CheckPayScreen = ({ statusNumCheck }) => {
    console.log(statusNumCheck);
    var newData = [];
    if (statusNumCheck != 0) {
        newData = ListOrder.filter((item) => item.shipStatus === statusNumCheck);
    }
    else {
        newData = ListOrder;
    }

    return (
        <FlatList
            data={newData}
            renderItem={ProductCard}
        />
    )
}

export default CheckPayScreen
/*
const CheckPayScreen = ({statusNumCheck}) => {
    var newData = [];
    if(statusNumCheck != 0){
        newData = ListOrder.find((item) => item.shipStatus === statusNumCheck);
    }
    else{
        newData = ListOrder;
    }

    return (
        <FlatList
            data={newData}
            renderItem={ProductCard}
        />
    )
}
*/ 