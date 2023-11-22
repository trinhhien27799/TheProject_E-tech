import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Image, View,Text, TouchableOpacity } from "react-native";


export default OrderScreen = () => {
    const navigation = useNavigation();
    const hanldClick = ()=>{
    navigation.navigate('OrderScreen');
    
}
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={hanldClick} style={{flexDirection:'column'}}>
                <Image style={{ height: 20, width: 20,alignSelf:"center",marginBottom:"5%", marginRight: '10%', tintColor: 'black' }} source={require('../../img/list.png')} />
                <Text>Tất cả đơn hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={hanldClick} style={{flexDirection:'column'}}>
                <Image style={{ height: 20, width: 20,alignSelf:"center",marginBottom:"5%", marginRight: '10%', tintColor: 'black' }} source={require('../../img/truck.png')} />
                <Text>Chờ giao hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={hanldClick} style={{flexDirection:'column'}}>
                <Image style={{ height: 20, width: 20,alignSelf:"center",marginBottom:"5%", marginRight: '10%', tintColor: 'black' }} source={require('../../img/box.png')} />
                <Text>Đã giao hàng</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        // marginLeft: '10%',
        marginTop: '5%',
        flexDirection:'row',
        justifyContent:"space-around",
    }
})