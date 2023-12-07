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
import { BottomModalInput } from '../Component/AddAdressDialog'

const AddAddress = () => {
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
{/*                 
                <BottomSheet ref={sheetRef}>
                    <BottomModalInput locationName={address} />
                </BottomSheet> */}
            </View>
        </View>
    )
}

export default AddAddress