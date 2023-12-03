import { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";

import tailwind from "twrnc";
import { addAddress, editAddress } from "../CallApi/AddressAPI";

export const BottomModalInput = ({value}) => {
    const obj = value;
    console.log('obj: ' + obj);
    console.log(obj)

    const [address, setAddress] = useState(obj.address);
    const [fullname, setFullnamne] = useState(obj.fullname);
    const [phone, setPhone] = useState(obj.numberphone);

    return (
        <View style={tailwind`flex-auto justify-center`}>
            <Text style={tailwind `self-center text-base font-bold my-3`}>{obj == null || obj == '' ? 'Thêm' : 'Sửa'} Địa Chỉ</Text>

            <TextInput
                label={'Họ và tên'}
                placeholder={"Abc"}
                value={fullname}
                onChangeText={(item) => setFullnamne(item)}
                right={<TextInput.Icon icon={"account"} />}
                style={tailwind`w-70 self-center rounded-md`}
                mode='outlined'
            />

            <TextInput
                label={'Số điện thoại'}
                placeholder={"028437535"}
                value={phone}
                onChangeText={(text) => setPhone(text)}
                right={<TextInput.Icon icon={"phone"} />}
                keyboardType="phone-pad"
                style={tailwind`w-70 self-center rounded-md mt-5`}
                mode='outlined'
            />

            <TextInput
                label={'Địa chỉ'}
                placeholder={"abc"}
                value={address}
                onChangeText={(text) => setAddress(text)}
                right={<TextInput.Icon icon={"map-outline"} />}
                style={tailwind`w-70 self-center rounded-md mt-5`}
                mode='outlined'
            />

            <TouchableOpacity 
                style={tailwind`self-center justify-center bg-blue-400 w-36 h-10 mt-10 rounded-md`}
                onPress={() => {
                    obj == null || obj == '' 
                    ? addAddress(fullname, phone, address)
                    : editAddress(obj._id, fullname, phone, address)  
                }}
            >
                <Text style={tailwind`self-center text-white font-bold`}>{obj == null || obj == '' ? 'Thêm' : 'Sửa'} Địa Chỉ</Text>
            </TouchableOpacity>
        </View>
    )
}