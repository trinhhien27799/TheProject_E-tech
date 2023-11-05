import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Button, Dialog, Portal, Provider } from 'react-native-paper'
import tailwind from 'twrnc'
import { useNavigation } from '@react-navigation/native'

const AddressTest = () => {
    const navigation = useNavigation();
    return (
        <View style={tailwind `flex-1 justify-center`}>
            <Button onPress={() => {
                navigation.navigate('ChooseAddressScreen')
            }}>
                Address
            </Button>
        </View>
    )
}

export default AddressTest