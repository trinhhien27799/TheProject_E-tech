import React from 'react'
import { Image } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import tailwind from 'twrnc';

const OrderStatusHeader = ({ orderStatus }) => {

    return (
        <>
            {orderStatus == 0 && <View style={styles.titleContainer}>
                <Text style={styles.textTitle}>Đơn hàng đang xác nhận</Text>
                <Image
                    source={require('../img/statusIcon/wait_img.png')}
                    style={tailwind`ml-3 w-5 h-5 self-center`}
                />
            </View>}

            {
                orderStatus == 0 && <View style={styles.titleContainer}>
                    <Text style={styles.textTitle}>Đơn hàng đang giao hàng</Text>
                    <Image
                        source={require('../img/statusIcon/ship_img.png')}
                        style={tailwind`ml-3 w-7 h-5 self-center`}
                    />
                </View>
            }

            {
                orderStatus == 2 && <View style={styles.titleContainer}>
                    <Text style={styles.textTitle}>Đơn hàng đã hoàn thành</Text>
                    <Image
                        source={require('../img/billScreen/check_463574.png')}
                        style={tailwind`ml-3 w-5 h-5 self-center`}
                    />
                </View>
            }
            </>
    )
}

const styles = StyleSheet.create({
    textTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 5
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default OrderStatusHeader