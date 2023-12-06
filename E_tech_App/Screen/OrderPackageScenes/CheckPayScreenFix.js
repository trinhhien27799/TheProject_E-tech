import React, { useRef } from 'react'
import { Dimensions, Image, Text } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { FlatList } from 'react-native'
import tailwind from 'twrnc'

import OrderStatusSet from '../../Component/OrderStatusSet'
import OrderStatusChangeButton from '../../Component/OrderStatusChangeButton'
import { useNavigation } from '@react-navigation/native'
import { formatPrice } from '../../utils/format'
import { formatTime } from '../../utils/format'

const CheckPayScreenFix = ({ orderList }) => {
    const navigation = useNavigation();
    const ProductCard = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('OrderDetailScreen', { dataId: item._id })}>
                <View style={tailwind`mb-3 bg-white p-5`}>
                    <View >
                        {/* Product View */}
                        <View style={tailwind``}>
                            <View style={tailwind`flex-row`}>
                                <Image
                                    source={require('../../img/order_3500833.png')}
                                    style={tailwind`h-16 w-16`}
                                />

                                <View style={tailwind`ml-3`}>
                                    <Text style={tailwind`font-bold text-base`}>Đơn hàng - {formatTime(item.time)}</Text>
                                    <Text>Mã: {item._id}</Text>
                                </View>
                            </View>

                            {/* Ship Status */}
                            <View style={tailwind``}>
                                <OrderStatusSet statusNum={item.status} />
                            </View>
                        </View>
                    </View>

                    <View style={tailwind`bg-gray-200 w-full h-0.5 my-3`}></View>

                    <View style={tailwind`justify-center flex-row flex-auto px-18`}>
                        <View>
                            <Text style={tailwind`py-2 justify-center`}>Số lượng sản phẩm: {item.products.length}</Text>
                            <Text style={tailwind``}>Tổng tiền: {formatPrice(item.total_price)}</Text>
                        </View>

                        <View style={tailwind`justify-center`}>
                            <OrderStatusChangeButton item={item} statusNum={item.status} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <FlatList
            data={orderList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={ProductCard}
            style={{ width: Dimensions.get('window').width}}
        />
    )
}

export default CheckPayScreenFix
