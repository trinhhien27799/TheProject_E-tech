import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View,Text,TouchableOpacity,Image,StyleSheet } from 'react-native';
import tailwind from 'twrnc';
export default HeaderEdit = ({ title}) => {
    const navigation = useNavigation();
    return (
        <View style={tailwind `bg-white py-3 align-center`}>
            <View style={tailwind `flex-row`}>
                <TouchableOpacity
                    onPress={
                        () => navigation.goBack()
                    }
                    style={tailwind `bg-white p-1 ml-3 shadow-md rounded-full`}
                >
                    <Image style={{ height: 30, width: 30 }} source={require('../img/previous.png')} />
                </TouchableOpacity>
                <Text style={tailwind `text-lg mt-0.9 ml-3 font-bold`}>{title}</Text>
                <View style={{ flex: 1 }}></View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    viewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textHeader: {
        flex: -1,
        fontSize: 18,
        fontWeight: 'bold',
    },
});