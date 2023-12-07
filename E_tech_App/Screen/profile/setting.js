import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

import { setUser } from "../../session";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SettingScreen = () => {
    const navigation = useNavigation();

    const clearToken = async () => {
        try {
            await AsyncStorage.removeItem('token');
            console.log('Token đã được xóa thành công.');
        } catch (error) {
            console.error('Lỗi khi xóa token:', error);
        }
    };

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

                onPress={() => {
                    clearToken()
                    setUser(null)
                    navigation.replace('Login')
                }}

            >
                <Text style={{ fontWeight: 'bold', color: 'white' }}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    )
}
export default SettingScreen;