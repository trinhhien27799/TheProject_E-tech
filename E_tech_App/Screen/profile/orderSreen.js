import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import { getBillByStatus } from "../../CallApi/billApi";
import { getUser } from "../../session";
import { useRequireLogin } from "../../utils/alert";


export default OrderScreen = () => {
    const navigation = useNavigation();
    const [countZero, setCountZero] = useState(0)
    const [countOne, setCountOne] = useState(0)

    const getData = async () => {
        try {
            const resZero = await getBillByStatus(0)
            setCountZero(resZero.length)
            const resOne = await getBillByStatus(1)
            setCountOne(resOne.length)
        } catch (error) {
            console.log('OrderScreen:', error)
        }
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getData()
        })

        return unsubscribe
    }, [navigation])

    const hanldClick = (valueNum) => {
        navigation.navigate('NewOrderScreen', { getValueOrder: valueNum });
    }

    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                    if (getUser() == null) {
                        useRequireLogin(navigation)
                        return
                    }
                    hanldClick('get-all')
                }}
                style={{
                    marginTop: '5%', flexDirection: 'row', justifyContent: 'space-between',
                    paddingHorizontal: 20, borderBottomWidth: 0.5,
                    borderTopWidth: 0.5, borderColor: 'grey',
                    paddingVertical: 15, backgroundColor: 'white'
                }}>
                <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
                    <Image style={{ height: 20, width: 20, marginRight: '10%' }} source={require('../../img/notes.png')} />
                    <Text>Đơn mua</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>Lịch sử mua hàng</Text>
                    <Image style={{ height: 10, width: 10, marginLeft: 5, alignSelf: "center", }} source={require('../../img/next.png')} />
                </View>
            </TouchableOpacity>

            <View style={styles.containerChild}>
                <TouchableOpacity
                    onPress={() => {
                        if (getUser() == null) {
                            useRequireLogin(navigation)
                            return
                        }
                        hanldClick('0')
                    }}
                    style={{ flexDirection: 'column' }}>
                    <Image style={{ height: 20, width: 20, alignSelf: "center", marginBottom: "5%", marginRight: '10%', }} source={require('../../img/list.png')} />
                    <Text>Chờ xác nhận</Text>
                    {countZero > 0 && <Text style={styles.circle}>{countZero}</Text>}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        if (getUser() == null) {
                            useRequireLogin(navigation)
                            return
                        }
                        hanldClick('1')
                    }}
                    style={{ flexDirection: 'column' }}>
                    <Image style={{ height: 20, width: 20, alignSelf: "center", marginBottom: "5%", marginRight: '10%', }} source={require('../../img/truck.png')} />
                    <Text>Đang giao hàng</Text>
                    {countOne > 0 && <Text style={styles.circle}>{countOne}</Text>}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    if (getUser() == null) {
                        useRequireLogin(navigation)
                        return
                    }
                    hanldClick('2')
                }} style={{ flexDirection: 'column' }}>
                    <Image style={{ height: 20, width: 20, alignSelf: "center", marginBottom: "5%", marginRight: '10%', }} source={require('../../img/box.png')} />
                    <Text>Đã giao hàng</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    containerChild: {
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey',
        paddingVertical: 15
    },
    circle: {
        backgroundColor: 'red',
        width: 18, height: 18, fontSize: 12,
        textAlign: 'center',
        color: 'white',
        borderRadius: 10,
        position: 'absolute',
        top: 0,
        right: 15
    }
})