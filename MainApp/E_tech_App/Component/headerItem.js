import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View,Text,TouchableOpacity,Image,StyleSheet } from 'react-native';
export default HeaderEdit = ({ title}) => {
    const navigation = useNavigation();
    return (
        <View style={{ padding: 20 }}>
            <View style={styles.viewHeader}>
                <TouchableOpacity
                    onPress={
                        () => navigation.goBack()
                    }
                    style={{ flex: 1 }}
                >
                    <Image style={{ height: 30, width: 30 }} source={require('../img/previous.png')} />
                </TouchableOpacity>
                <Text style={styles.textHeader}>{title}</Text>
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