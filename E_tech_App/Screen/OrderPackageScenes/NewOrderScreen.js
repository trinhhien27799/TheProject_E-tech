import React, { useState } from 'react'
import { Text } from 'react-native';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native'
import tailwind from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { getAllUserBill, getBill } from '../../Model/BillModel';
import CheckPayScreenFix from './CheckPayScreenFix';
import { getRealBill } from '../../CallApi/billAPI';
import { Image } from 'react-native';

const NewOrderScreen = () => {
    const [value, setValue] = useState(null);
    const navigation = useNavigation();
    const [hoveredButton, setHoveredButton] = useState(1);

    const handleMouseLeave = () => {
        setHoveredButton(null);
    };

    var data = null;

    const styleHoverIn = tailwind `mr-3 bg-gray-200 p-3 rounded-lg border-2 border-blue-300 shadow-md`;
    const styleHoverOut = tailwind `mr-3 bg-gray-200 p-3 rounded-lg shadow-md`;

    const buttonValueList = [
        {
            id: 1,
            buttonName: 'Tất cả',
            valueCheck: null
        },
        {
            id: 2,
            buttonName: 'Chờ xác nhận',
            valueCheck: 0
        },
        {
            id: 3,
            buttonName: 'Đang giao hàng',
            valueCheck: 1
        },
        {
            id: 4,
            buttonName: 'Đã giao hàng',
            valueCheck: 2
        },
        {
            id: 5,
            buttonName: 'Đã hủy',
            valueCheck: -1
        },
    ];

    const setValueFunction = (inValue, id) => {
        setValue(inValue);
        setHoveredButton(id);
    }

    data = getAllUserBill();
    console.log(data);

    const ChangeData = (valueNum) => {
        if(valueNum != null){
            return data.filter((item) => item.status == valueNum);
        }
        else{
            return data;
        }
    }

    const ButtonCard = ({item}) => {
        return (
            <TouchableOpacity
                style={hoveredButton == item.id ? styleHoverIn : styleHoverOut}
                onPress={() => setValueFunction(item.valueCheck, item.id)}
            >
                <Text>{item.buttonName}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <TouchableOpacity
                style={tailwind `bg-white w-10 h-10 m-3 justify-center rounded-full shadow-md`}
                onPress={() => navigation.goBack()}
            >
                <Image 
                    source={require('../../img/previous.png')}
                    style={tailwind `w-7 h-7 self-center`}
                />
            </TouchableOpacity>

            <FlatList
                data={buttonValueList}
                renderItem={ButtonCard}
                horizontal
                style={tailwind `my-3 ml-3`}
            />

            <CheckPayScreenFix orderList={ChangeData(value)}/>
        </View>
    )
}

export default NewOrderScreen