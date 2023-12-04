import React, { useRef } from 'react'
import { Image, ScrollView, Text } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { FlatList } from 'react-native'
import tailwind from 'twrnc'

import OrderStatusSet from '../../Component/OrderStatusSet'
import OrderStatusChangeButton from '../../Component/OrderStatusChangeButton'
import { useNavigation } from '@react-navigation/native'
import { getBill } from '../../Model/BillModel'
import { formatPrice } from '../../utils/format'
import BottomSheet from '@devvie/bottom-sheet'

const CheckPayScreenFix = ({ orderList }) => {
    const navigation = useNavigation();
    console.log(orderList);


    const ProductCard = ({ item }) => {
        const currentDate = item.time;
        const splitDate = currentDate.split('T');
        const getDate = splitDate[0];

        return (
            <TouchableOpacity onPress={() => navigation.navigate('OrderDetailScreen', {dataId: item._id})}>
                <View style={tailwind`mt-3 bg-white p-5`}>
                    <View >
                        {/* Product View */}
                        <View style={tailwind``}>
                            <View style={tailwind`flex-row`}>
                                <Image
                                    source={require('../../img/order_3500833.png')}
                                    style={tailwind`h-16 w-16`}
                                />
    
                                <View style={tailwind`ml-3`}>
                                    <Text style={tailwind`font-bold text-base`}>Đơn hàng - {getDate}</Text>
                                    <Text>Mã: {item._id}</Text>
                                </View>
                            </View>
    
                            {/* Ship Status */}
                            <View style={tailwind``}>
                                <OrderStatusSet statusNum={item.status} />
                            </View>
                        </View>
                    </View>
    
                    <View style={tailwind `bg-gray-200 w-full h-0.5 my-3`}></View>
    
                    <View style={tailwind `justify-center flex-row flex-auto px-18`}>
                        <View>
                            <Text style={tailwind`py-2 justify-center`}>Số lượng sản phẩm: {item.products.length}</Text>
                            <Text style={tailwind``}>Tổng tiền: {formatPrice(item.total_price)}</Text>
                        </View>
    
                        <View style={tailwind `justify-center`}>
                            <OrderStatusChangeButton item={item} statusNum={item.status}/>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    // console.log(statusNumCheck);
    // var newData = [];
    // if (statusNumCheck != 0) {
    //     newData = ListOrder.filter((item) => item.shipStatus === statusNumCheck);
    // }
    // else {
    //     newData = ListOrder;
    // }

    if(orderList.length == 0){
        return(
            <View style={tailwind `h-200 justify-center`}>
                <Image 
                    source={require('../../img/package_862074.png')}
                    style={tailwind `w-50 h-50 mb-10 self-center`}
                />
                <Text style={tailwind `text-base self-center font-bold`}>Chưa có đơn hàng</Text>
            </View>
        )
    }
    else{
        return (
            <ScrollView>
                <FlatList
                    data={orderList}
                    renderItem={ProductCard}
                    style={tailwind `pb-40`}
                />
            </ScrollView>
        )
    } 
}

export default CheckPayScreenFix
