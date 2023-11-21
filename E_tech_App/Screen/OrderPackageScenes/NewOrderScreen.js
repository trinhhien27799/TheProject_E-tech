import React, { useState } from 'react'
import { Text } from 'react-native';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native'
import tailwind from 'twrnc';
import CheckPayScreen from './CheckPayScreen';
import { useNavigation } from '@react-navigation/native';

const NewOrderScreen = () => {
    const [value, setValue] = useState(0);
    const navigation = useNavigation();

    const buttonValueList = [
        {
            id: 1,
            buttonName: 'Tất cả',
            valueCheck: 0
        },
        {
            id: 2,
            buttonName: 'Xác nhận thanh toán',
            valueCheck: 1
        },
        {
            id: 3,
            buttonName: 'Đang giao hàng',
            valueCheck: 2
        },
        {
            id: 4,
            buttonName: 'Đã giao hàng',
            valueCheck: 3
        },
    ];

    const setValueFunction = (inValue) => {
        setValue(inValue);
        navigation.navigate('NewOrderScreen')
    }

    const ButtonCard = ({item}) => {
        return (
            <TouchableOpacity
                style={tailwind`mr-3 bg-gray-300 p-3 rounded-lg`}
                onPress={() => setValueFunction(item.valueCheck)}
            >
                <Text>{item.buttonName}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <FlatList
                data={buttonValueList}
                renderItem={ButtonCard}
                horizontal
                style={tailwind `mt-10 ml-5`}
            />

            <CheckPayScreen statusNumCheck={value}/>
        </View>
    )
}

export default NewOrderScreen