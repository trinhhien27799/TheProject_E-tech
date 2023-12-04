import React, { useState } from 'react'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native'
import { View, Text } from 'react-native'
import { Dialog, Provider, RadioButton } from 'react-native-paper'
import tailwind from 'twrnc'
import { useNavigation } from '@react-navigation/native'
import { ListAddress, getAllAddresses } from '../Model/AddressModel'
import items from '../items'
import { setAddress } from '../Component/HandleObj/AddressHandle'
import { BottomModalInput } from '../Component/AddAdressDialog'
import { ScrollView } from 'react-native'
import { deleteAddress } from '../CallApi/AddressAPI'




const DialogAddress = ({ route }) => {
    const [getAddress, setGetAddress] = useState(null);
    const navigation = useNavigation();
    const [value, setValue] = useState('');

    const { listOnlyAddresses } = route.params;
    const listData = listOnlyAddresses.data;
    console.log(listData);

    const [visible, setVisible] = React.useState(false);

    const hideDialog = () => setVisible(false);

    const handleValueChange = (newValue) => {
        setValue(newValue);
        setVisible(true);
    };

    const sendValueToScreen = (address) => {
        setAddress(address)
        navigation.navigate('PayScreen', {data:{address:address}});
    }

    const AddressCard = ({ item }) => {
        return (
            <View style={tailwind`flex-auto flex-row mb-5 bg-slate-50 py-3 rounded-md border border-gray-400`}>
                <RadioButton
                    value={item.address}
                />
    
                <View style={tailwind`justify-center`}>
                    <Text style={tailwind`w-40`}>{item.address}</Text>
                </View>
    
                <View style={tailwind`flex-row justify-center p-2 self-end ml-3`}>
                    <TouchableOpacity
                        style={tailwind`mr-2 bg-blue-400 p-2 rounded-lg shadow-md`}
                        onPress={() => handleValueChange(item)}
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
        <ScrollView>
            <Provider>
                <View style={tailwind`flex-auto p-12`}>
                    <Text style={tailwind`text-lg mb-5 font-bold`}>Chọn địa chỉ</Text>

                    {/* Flatlist địa chỉ */}
                    <RadioButton.Group
                        onValueChange={(item) => setGetAddress(item)}
                        value={getAddress}
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
                        onPress={() => { handleValueChange('') }}
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
                    <View style={tailwind`flex-row self-end`}>
                        <TouchableOpacity
                            style={tailwind`justify-center w-24 h-8 rounded-md border-gray-800 border mr-3`}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={tailwind`self-center`}>Hủy</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={tailwind`bg-blue-500 justify-center w-24 h-8 rounded-md`}
                            onPress={() => { sendValueToScreen(getAddress) }}
                        >
                            <Text style={tailwind`self-center text-white`}>Xác nhận</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Dialog visible={visible} onDismiss={hideDialog} style={tailwind`bg-white`}>
                    <Dialog.Content>
                        <BottomModalInput value={value}/>
                    </Dialog.Content>
                </Dialog>
            </Provider>
        </ScrollView>
    )
}

export default DialogAddress