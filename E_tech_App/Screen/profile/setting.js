import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet,TouchableOpacity,Text, View } from "react-native";
const SettingScreen = ()=>{
    const navigation = useNavigation();

    return(
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
                    navigation.replace('Login');
                }}
            >
                <Text style={{ fontWeight: 'bold', color: 'white' }}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    )
}
export default SettingScreen;