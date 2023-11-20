import React from "react";
import { StyleSheet,TouchableOpacity,Text, View } from "react-native";
const SettingScreen = ()=>{
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
                    navigation.navigate('Login');
                }}
            >
                <Text style={{ fontWeight: 'bold', color: 'white' }}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    )
}
export default SettingScreen;