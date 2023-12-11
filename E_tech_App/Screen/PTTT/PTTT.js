import React, { useState } from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { RadioButton } from 'react-native-paper';
import tailwind from 'twrnc';
import { Ionicons } from '@expo/vector-icons';

const PTTT = () => {
    const [selectedRadio, setSelectedRadio] = useState(null);
    const navigation = useNavigation();

    const Check = (value) => {
        navigation.navigate('PayScreen', {address: null, shipping: null, voucher: null, payment: value});
    }

    const selectedButtonList = [
        {
            value: 1,
            name: 'Thanh toán bằng tiền mặt'
        },
        {
            value: 2,
            name: 'Thanh toán chuyển khoản (mã QR)'
        },
    ];
    const ButtonCard = ({ item }) => {
        return (
            <View style={tailwind`flex-row py-2 `}>
                <RadioButton value={item}/>
                <Text style={tailwind`mt-1.6`}>{item.name}</Text>
            </View>
        )
    }

    console.log(selectedRadio)

    return (
        <SafeAreaView style={tailwind``}>
            <View style={tailwind`bg-white flex-row py-3`}>
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
                    style={tailwind`bg-white p-1.5 rounded-full shadow-md ml-3`}
                >
                    <Ionicons name="arrow-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={tailwind`text-base mt-2 font-bold ml-3`}>Phương thức thanh toán</Text>
            </View>

            <View style={tailwind`p-5`}>
                <Text style={tailwind`text-lg font-bold self-center mb-3`}>Phương thức thanh toán</Text>

                {/* Flatlist */}
                <RadioButton.Group
                    onValueChange={(item) => setSelectedRadio(item)}
                    value={selectedRadio}
                >
                    <FlatList
                        data={selectedButtonList}
                        renderItem={ButtonCard}
                    />
                </RadioButton.Group>

                <View style={tailwind`flex-row mt-3 self-center`}>
                    <TouchableOpacity style={tailwind `bg-slate-600 w-40 rounded-xl justify-center shadow-md py-4`} onPress={() => { navigation.goBack() }}>
                        <Text style={tailwind `font-bold text-base text-white self-center`}>Hủy</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={tailwind `bg-blue-600 w-40 rounded-xl justify-center shadow-md ml-5`} onPress={() => Check(selectedRadio)}>
                        <Text style={tailwind `font-bold text-base text-white self-center`}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 5
    },
    view: {
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    view3: {
        flexDirection: 'row',
    },
    text: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
    text1: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    radio: {
        width: 22,
        height: 22,
        borderColor: 'black',
        borderRadius: 20,
        borderWidth: 2,
    },
    radioBg: {
        backgroundColor: 'black',
        height: 15.5,
        width: 15.5,
        margin: 1,
        borderRadius: 15
    },
    button2: {
        backgroundColor: '#336BFA',
        width: '40%',
        height: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        padding: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
});
export default PTTT;
