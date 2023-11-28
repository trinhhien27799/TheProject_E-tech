import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { Text } from 'react-native'
import { View } from 'react-native'
import { RadioButton } from 'react-native-paper'
import tailwind from 'twrnc'
import { cancelBill } from '../CallApi/billAPI'

const CancelOrderView = () => {
    const route = useRoute();
    const data = route.params
    const [takeValue, setTakeValue] = useState(null);
    const navigation = useNavigation();

    const cancelReasonList = [
        {
            id: 1, 
            value: 'Sản phẩm hết hàng'
        },
        {
            id: 2, 
            value: 'Sản phẩm bị lỗi'
        },
        {
            id: 1, 
            value: 'Sản phẩm không đúng với mô tả'
        },
    ];

    const ReasonCard = ({item}) => {
        return(
            <View style={tailwind `flex-row p-2`}>
                <RadioButton value={item.value}/>
                <Text style={tailwind`mt-1.5`}>{item.value}</Text>
            </View>
        )
    }

    return (
        <View>
            <TouchableOpacity
                style={tailwind`w-12 h-12 bg-white m-8 justify-center rounded-full shadow-md`}
                onPress={() => navigation.goBack()}
            >
                <Image
                    source={require('../img/previous.png')}
                    style={tailwind`w-8 h-8 self-center`} />
            </TouchableOpacity>

            <View style={tailwind`p-3`}>
                <Text style={tailwind`self-center text-base mb-3 font-bold`}>Lý do hủy đơn hàng</Text>

                <RadioButton.Group
                    value={takeValue}
                    onValueChange={(item) => setTakeValue(item)}
                >
                    <FlatList
                        data={cancelReasonList}
                        renderItem={ReasonCard}
                    />
                </RadioButton.Group>

                <TouchableOpacity
                    style={tailwind`bg-red-600 p-3 w-50 self-center mt-3 rounded-lg`}
                    onPress={() => {cancelBill(data, takeValue)}}
                >
                    <Text style={tailwind`self-center font-bold text-white`}>Xác Nhận Hủy</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    )
}

export default CancelOrderView