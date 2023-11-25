import React, { useEffect, useRef, useState } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import tailwind from 'twrnc'
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';

import MapViewScreen from '../Component/MapView'
import * as Location from 'expo-location'
import Geocoder from 'react-native-geocoding'
import { useNavigation } from '@react-navigation/native'
import { addAddress } from '../CallApi/AddressAPI'

const AddAdress = () => {
    const [mapRegion, setMapRegion] = useState(null);
    const [address, setAddress] = useState(null);
    const [fullname, setFullnamne] = useState('');
    const [phone, setPhone] = useState('');

    const sheetRef = useRef(null);

    const handleFullname = (text) => {
        setFullnamne(text);
    }

    const handlePhone = (text) => {
        setPhone(text);
    }

    const handleAddress = (text) => {
        setAddress(text);
    }

    const BottomModalInput = (getLocation) => {
        var locationName = getLocation.country;
        console.log(locationName)
    
        return (
            <View style={tailwind`flex-auto justify-center`}>
                <TextInput
                    label={'Họ và tên'}
                    placeholder={"Abc"}
                    onChangeText={handleFullname}
                    right={<TextInput.Icon icon={"account"} />}
                    style={tailwind`w-96 self-center rounded-md`}
                    mode='outlined'
                />
    
                <TextInput
                    label={'Số điện thoại'}
                    placeholder={"028437535"}
                    onChangeText={handlePhone}
                    right={<TextInput.Icon icon={"phone"} />}
                    style={tailwind`w-96 self-center rounded-md mt-5`}
                    mode='outlined'
                />
    
                <TextInput
                    label={'Địa chỉ'}
                    placeholder={"abc"}
                    onChangeText={handleAddress}
                    right={<TextInput.Icon icon={"map-outline"} />}
                    style={tailwind`w-96 self-center rounded-md mt-5`}
                    mode='outlined'
                />
    
                <TouchableOpacity 
                    style={tailwind`self-center justify-center bg-blue-400 w-36 h-10 mt-10 rounded-md`}
                    onPress={() => {console.log(address + ' ' + phone + ' ' + fullname)}}
                >
                    <Text style={tailwind`self-center text-white font-bold`}>Thêm địa chỉ</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const userLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('User not granted');
        }

        let location = await Location.getCurrentPositionAsync();
        setMapRegion(location.coords);

        const { latitude, longitude } = location.coords;

        const currentAddress = await Location.reverseGeocodeAsync({ latitude, longitude });
        setAddress(currentAddress[0]);
    }

    useEffect(() => {
        userLocation();
    }, [])

    const place = mapRegion;
    const navigation = useNavigation();

    return (
        <View>
            <View style={tailwind `flex-auto justify-end`}>
                <MapViewScreen currentLocation={place} />
                <View style={tailwind`absolute self-end`}>
                    <View style={tailwind`mb-5 mr-5 self-end flex-row`}>
                        <TouchableOpacity
                            onPress={() => sheetRef.current.open()}
                            style={tailwind`bg-white shadow-md rounded-full w-12 h-12 justify-center mr-3`}
                        >
                            <Image
                                source={require('../img/location/add_location.png')}
                                style={tailwind`w-8 h-8 self-center`}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={tailwind`bg-green-200 shadow-md rounded-full w-12 h-12 justify-center`}
                            onPress={() => {
                                userLocation
                            }
                            }
                        >
                            <Image
                                source={require('../img/location/get_location.png')}
                                style={tailwind`w-8 h-8 self-center`}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                
                <BottomSheet ref={sheetRef}>
                    <BottomModalInput locationName={address} />
                </BottomSheet>
            </View>
        </View>
    )
}

export default AddAdress