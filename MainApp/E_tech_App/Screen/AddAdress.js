import React from 'react'
import { TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native'
import { TextInput } from 'react-native-paper'
import tailwind from 'twrnc'

const AddAdress = () => {
  return (
    <View style={tailwind `flex-auto justify-center`}>
        <TextInput
            label={'Họ và tên'}
            placeholder={"Abc"}
            right={<TextInput.Icon icon={"account"}/>}
            style={tailwind `w-96 self-center rounded-md`}
            mode='outlined'
        />

        <TextInput
            label={'Số điện thoại'}
            placeholder={"028437535"}
            right={<TextInput.Icon icon={"phone"} />}
            style={tailwind`w-96 self-center rounded-md mt-5`}
            mode='outlined'
        />  

        <TextInput
            label={'Địa chỉ'}
            placeholder={"abc"}
            right={<TextInput.Icon icon={"map-outline"}/>}
            style={tailwind `w-96 self-center rounded-md mt-5`}
            mode='outlined'
        />

        <TouchableOpacity style={tailwind `self-center justify-center bg-blue-400 w-36 h-10 mt-10 rounded-md`}>
            <Text style={tailwind `self-center text-white font-bold`}>Thêm địa chỉ</Text>
        </TouchableOpacity>
    </View>
  )
}

export default AddAdress