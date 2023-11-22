import React, { useState, useEffect } from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    FlatList,
    SafeAreaView,
    RadioButton,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import tailwind from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { getShipping } from '../CallApi/shippingApi';

const ShippingMethod = () => {
    const navigation = useNavigation();
    const [shipping, setShipping] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getShipping();
            setShipping(data);
        }
        fetchData();
    }, []);

    const ShippingItem= ({ item }) => {
        return (
            <View style={tailwind`flex-auto flex-row mb-5 bg-slate-50 py-3 rounded-md border border-gray-400`}>
                <RadioButton />

                <View style={tailwind`justify-center`}>
                    <Text>{item.name} ({item.price}đ)</Text>
                </View>
            </View>
        )
    }
    

    return (
        <View style={tailwind`flex-auto p-12`}>
            <Text style={tailwind`text-lg mb-5 font-bold`}>Chọn Phương thức vận chuyển</Text>

            {/* Flatlist PTCV */}
            <FlatList
                data={shipping}
                renderItem={ShippingItem}
                style={tailwind``}
            />

            {/* Bottom button */}
            <View style={tailwind`flex-row self-end`}>
                <TouchableOpacity
                    style={tailwind`justify-center w-24 h-8 rounded-md border-gray-800 border mr-3`}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={tailwind`self-center`}>Hủy</Text>
                </TouchableOpacity>

                <TouchableOpacity style={tailwind`bg-blue-500 justify-center w-24 h-8 rounded-md`} onPress={() => navigation.goBack()}>
                    <Text style={tailwind`self-center text-white`}>Xác nhận</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default ShippingMethod;
