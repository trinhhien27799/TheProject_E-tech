import React from 'react'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native'
import { View, Text } from 'react-native'
import { RadioButton } from 'react-native-paper'
import tailwind from 'twrnc'
import { useNavigation } from '@react-navigation/native'
import {ListAddress} from '../Model/AddressModel'

const AddressCard = ({item}) => (
    <View style={tailwind `flex-auto flex-row mb-5 bg-slate-50 py-3 rounded-md border border-gray-400`}>
        <RadioButton />

        <View style={tailwind `ml-1`}>
            <View style={tailwind `flex-row mb-1`}>
                <Text style={tailwind `mr-3`}>{item.username}</Text>
                <Text>{item.phone}</Text>
            </View>

            <Text>{item.address}</Text>
        </View>
    </View>
)

const DialogAddress = () => {
    const navigation = useNavigation();
    return (
        <View>
            <Text style={tailwind `text-lg mb-5`}>Chọn địa chỉ</Text>

            {/* Flatlist địa chỉ */}
            <FlatList
                data={ListAddress}
                renderItem={AddressCard}
                style={tailwind ``}
            />

            {/* Thêm địa chỉ */}
            <TouchableOpacity 
                style={tailwind `self-center mb-5`}   
                onPress={() => {navigation.navigate('AddAdressScreen')}}         
            >
                <View style={tailwind `flex-row`}>
                    <Text>Thêm địa chỉ</Text>
                    <Image 
                        source={require('../img/add_box.png')}
                        style={tailwind `w-5 h-5 ml-2`}
                    />
                </View>
            </TouchableOpacity>

            {/* Bottom button */}
            <View style={tailwind `flex-row self-end`}>
                <TouchableOpacity 
                    style={tailwind `justify-center w-24 h-8 rounded-md border-gray-800 border mr-3`}
                    
                >
                    <Text style={tailwind `self-center`}>Hủy</Text>
                </TouchableOpacity>

                <TouchableOpacity style={tailwind `bg-blue-500 justify-center w-24 h-8 rounded-md`}>
                    <Text style={tailwind `self-center text-white`}>Xác nhận</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DialogAddress