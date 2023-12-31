import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native'
import { View, Text } from 'react-native'
import { Dialog, Provider, RadioButton } from 'react-native-paper'
import tailwind from 'twrnc'
import { useNavigation } from '@react-navigation/native'
import { ListAddress, getAllAddresses } from '../Model/AddressModel'
import { setAddress } from '../Component/HandleObj/AddressHandle'
import { BottomModalInput } from '../Component/AddAdressDialog'
import { ScrollView } from 'react-native'
import { deleteAddress, getAddress } from '../CallApi/AddressAPI'
import { Ionicons } from '@expo/vector-icons'


const DialogAddress = ({ route }) => {
    const [chooseAddress, setChooseAddress] = useState(null);
    const navigation = useNavigation();
    const [value, setValue] = useState('');
    const [data, setData] = useState(null);

    const { listOnlyAddresses } = route.params;

    const getData = async () => {
        try {
            const response = await getAddress()
            setData(response)
        } catch (error) {
            console.log('Address Screen: ', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getData()
        })

        return unsubscribe
    }, [navigation])

    const listData = data;
    console.log(listData);

    const [visible, setVisible] = React.useState(false);

    const hideDialog = () => setVisible(false);

    const handleValue = (value) => {
        setChooseAddress(value);
    }

    const sendValueToScreen = (address) => {
        navigation.navigate('PayScreen', {address: address, shipping: null, voucher: null});
    }

    const setLockButton = (value) => {
        if(value == null){
            return true;
        }
        else{
            return false;
        }
    }

    const setBgLockButton = (value) => {
        if(value == null){
            return 'bg-blue-300 justify-center w-24 h-8 rounded-md';
        }
        else{
            return 'bg-blue-500 justify-center w-24 h-8 rounded-md';
        }
    }

    const AddressCard = ({ item }) => {
        return (
            <View style={tailwind`flex-auto flex-row mb-5 bg-slate-50 py-3 rounded-md border border-gray-400`}>
                <RadioButton
                    value={item}
                />

                <View style={tailwind`justify-center`}>
                    <Text style={tailwind`w-40`}>{item.address}</Text>
                </View>

                <View style={tailwind`flex-row justify-center p-2 self-end ml-10`}>
                    <TouchableOpacity
                        style={tailwind`mr-2 bg-blue-400 p-2 rounded-lg shadow-md`}
                        onPress={() => navigation.navigate('NewAddress', { address: item })}
                    >
                        <Image source={require('../img/edit.png')} style={tailwind`w-5 h-5`} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={tailwind`bg-red-400 p-2 rounded-lg shadow-md`}
                        onPress={() => deleteAddress(item)}
                    >
                        <Image source={require('../img/delete.png')} style={tailwind`w-5 h-5`} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View>
            <View style={tailwind`bg-white flex-row py-3`}>
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
                    style={tailwind`bg-white p-1.5 rounded-full shadow-md ml-3`}
                >
                    <Ionicons name="arrow-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={tailwind`text-base mt-2 font-bold ml-3`}>Địa chỉ giao hàng</Text>
            </View>

            <ScrollView>
                <Provider>
                    <View style={tailwind`flex-auto p-8`}>
                        <Text style={tailwind`text-lg mb-5 font-bold self-center`}>Chọn địa chỉ</Text>

                        {/* Flatlist địa chỉ */}
                        <RadioButton.Group
                            onValueChange={(item) => handleValue(item)}
                            value={chooseAddress}
                        >
                            <FlatList
                                data={listData}
                                renderItem={AddressCard}
                                style={tailwind``}
                            />
                        </RadioButton.Group>

                        {/* Thêm địa chỉ */}
                        <TouchableOpacity
                            style={tailwind`self-center mb-5`}
                            onPress={() => { navigation.navigate('NewAddress', { address: null }) }}
                        >
                            <View style={tailwind`flex-row`}>
                                <Text>Thêm địa chỉ</Text>
                                <Image
                                    source={require('../img/add_box.png')}
                                    style={tailwind`w-5 h-5 ml-2`}
                                />
                            </View>
                        </TouchableOpacity>

                        {/* Bottom button */}
                        <View style={tailwind`flex-row self-end mb-15`}>
                            <TouchableOpacity
                                style={tailwind`justify-center w-24 h-8 rounded-md border-gray-800 border mr-3`}
                                onPress={() => navigation.goBack()}
                            >
                                <Text style={tailwind`self-center`}>Hủy</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={tailwind `${setBgLockButton(chooseAddress)}`}
                                onPress={() => { sendValueToScreen(chooseAddress) }}
                                disabled={setLockButton(chooseAddress)}
                            >
                                <Text style={tailwind`self-center text-white`}>Xác nhận</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Provider>
            </ScrollView>
        </View>

    )
}

export default DialogAddress