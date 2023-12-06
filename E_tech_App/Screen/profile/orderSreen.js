import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";


export default OrderScreen = () => {
    const navigation = useNavigation();

    const hanldClick = (valueNum) => {
        navigation.navigate('NewOrderScreen', { getValueOrder: valueNum });
    }

    return (
        <View>
            <TouchableOpacity
                onPress={() => hanldClick('get-all')}
                style={{ marginTop: '5%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '7%' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={{ height: 20, width: 20, marginRight: '10%', tintColor: 'black' }} source={require('../../img/notes.png')} />
                    <Text>Đơn mua</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>Lịch sử mua hàng</Text>
                    <Image style={{ height: 10, width: 10, marginLeft: 5, alignSelf: "center", tintColor: 'black' }} source={require('../../img/next.png')} />
                </View>
            </TouchableOpacity>

            <View style={styles.containerChild}>


                <TouchableOpacity onPress={() => hanldClick('0')} style={{ flexDirection: 'column' }}>
                    <Image style={{ height: 20, width: 20, alignSelf: "center", marginBottom: "5%", marginRight: '10%', tintColor: 'black' }} source={require('../../img/list.png')} />
                    <Text>Chờ xác nhận</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => hanldClick('1')} style={{ flexDirection: 'column' }}>
                    <Image style={{ height: 20, width: 20, alignSelf: "center", marginBottom: "5%", marginRight: '10%', tintColor: 'black' }} source={require('../../img/truck.png')} />
                    <Text>Đang giao hàng</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => hanldClick('2')} style={{ flexDirection: 'column' }}>
                    <Image style={{ height: 20, width: 20, alignSelf: "center", marginBottom: "5%", marginRight: '10%', tintColor: 'black' }} source={require('../../img/box.png')} />
                    <Text>Đã giao hàng</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    containerChild: {
        marginTop: '5%',
        flexDirection: 'row',
        justifyContent: "space-around",
    }
})