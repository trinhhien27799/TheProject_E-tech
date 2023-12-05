import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { getUser, setUser } from "../../session";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SettingScreen = () => {
    const navigation = useNavigation();
    const handleClick = async () => {
        await AsyncStorage.removeItem('token');
        navigation.navigate('Login');
    }
    return (
        <View
        >
            <TouchableOpacity
                style={{
                    backgroundColor: 'red',
                    width: 300,
                    height: 50,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    marginTop: 70
                }}

                onPress={handleClick}

            >
                <Text style={{ fontWeight: 'bold', color: 'white' }}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    )
}
export default SettingScreen;