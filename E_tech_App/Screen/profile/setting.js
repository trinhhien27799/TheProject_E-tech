import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
const SettingScreen = () => {
    const navigation = useNavigation();

    return (
        <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <TouchableOpacity
                style={{
                    backgroundColor: 'red',
                    width: 300,
                    height: 50,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}

                onPress={() => {
                    navigation.replace('SignUp')
                }}

            >
                <Text style={{ fontWeight: 'bold', color: 'white' }}>Đăng ký</Text>
            </TouchableOpacity>
        </View>
    )
}
export default SettingScreen;