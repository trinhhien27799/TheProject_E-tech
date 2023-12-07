import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, Text, StyleSheet, View, Image, ScrollView, Button, TouchableOpacity } from 'react-native';
import tailwind from 'twrnc'
import OrderStatusHeader from '../Component/OrderStatusHeader';
import { TotalProductBill } from '../DataMathResolve/TotalProductBill';
import { formatPrice, formatTime } from '../utils/format';
import { getItemBill } from '../CallApi/billApi';
import ItemInBill from './itemInBill';



const BillDetailScreen = ({ route }) => {
    const { dataId } = route.params;
    const [data, setData] = useState(null)


    const getData = async () => {
        try {
            const response = await getItemBill(dataId)
            console.log(response)
            setData(response)
        } catch (error) {
            console.log('BillDetailScreen: ', error)
        }
    }


    useEffect(() => {
        getData()
    }, [])


    const renderItem = ({ item, index }) => {
        return <ItemInBill item={item} status={data.status} />
    }


    return (
        data &&
        <View style={styles.container}>
            <ScrollView>
                {/* Header */}
                <View style={styles.header}>
                    <OrderStatusHeader status={data.status} />
                    <Text style={styles.textInfo}>Mã đơn hàng: {data._id}</Text>
                    <Text style={styles.textInfo}>Ngày mua: {formatTime(data.time)}</Text>
                    <Text style={styles.textInfo}>Ngày nhận hàng: 3/11/2023</Text>
                    <Text style={styles.textInfo}>Người mua: {data.address.fullname} </Text>
                </View>

                <View style={styles.line}></View>

                {/* Address */}
                <View style={styles.addressContainer}>
                    <Image
                        source={require('../img/store.png')}
                        style={tailwind`ml-3 w-5 h-5 self-center mb-7`}
                    />
                    <View style={styles.addressInfo}>
                        <Text style={styles.textAddress}>Địa chỉ nhận hàng</Text>
                        <Text style={styles.textAddressInfo}>{data.address.fullname} | {data.address.numberphone}</Text>
                        <Text style={styles.textAddressInfo}>{data.address.address}</Text>
                    </View>
                </View>
                <View style={styles.line}></View>

                {/* List Bill */}
                <FlatList
                    scrollEnabled={false}
                    data={data.products}
                    style={styles.listCart}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                />

                {/* Total Container */}
                <View style={styles.calContainer}>
                    <View style={styles.calView}>
                        <Text style={styles.textInfo}>Tổng đơn hàng:</Text>
                        <Text style={styles.textInfo}>{formatPrice(data.total_price - data.transport_fee)}</Text>
                    </View>
                    <View style={styles.calView}>
                        <Text style={styles.textInfo}>Phí vận chuyển:</Text>
                        <Text style={styles.textInfo}>{formatPrice(data.transport_fee)}</Text>
                    </View>
                    <View style={styles.calView}>
                        <Text style={styles.textInfo}>Voucher giảm giá:</Text>
                        <Text style={styles.textInfo}>- {formatPrice(data.voucher)}</Text>
                    </View>
                    <View style={styles.calViewTotal}>
                        <Text style={styles.textBold}>Thành tiền:</Text>
                        <Text style={styles.textBold}>{formatPrice(data.total_price)}</Text>
                    </View>
                </View>
                <View style={styles.line}></View>

                <View style={styles.paymentContainer}>
                    <Image
                        source={require('../img/paymain.png')}
                        style={tailwind`ml-3 w-5 h-5 self-center mt--1`}
                    />
                    <View style={styles.paymentType}>
                        <Text style={styles.textBold}>Phương thức thanh toán:</Text>
                        <Text style={styles.textMoneyType}>{data.payment_method}</Text>
                    </View>
                </View>
                <View style={styles.line}></View>

                {/* Button */}
                <View style={styles.Button}>
                    <View style={styles.confirmContainer}>
                        <TouchableOpacity style={styles.buttonPayment}>
                            <Text style={styles.textPayment}>Phản hồi đơn hàng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>

    )

}
const styles = StyleSheet.create({
    Button: {
        backgroundColor: '#ECECEE',

    },
    textPayment: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonPayment: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    confirmContainer: {
        backgroundColor: '#336BFA',
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 7,
        height: 45,
        marginTop: 50,
        marginBottom: 30,
        shadowOpacity: 0.2
    },
    paymentContainer: {
        height: 50,
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textMoneyType: {
        fontSize: 14,
        width: '50%'
    },
    paymentType: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    textBold: {
        fontWeight: 'bold',
    },
    calViewTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25
    },
    calView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    calContainer: {
        height: 180,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10
    },

    textPrice: {
        fontWeight: 'bold',
        textAlign: 'right'
    },


    statusItem: {
        color: '#767676',
        fontSize: 13
    },


    listCart: {
        maxHeight: 1000,
        marginLeft: 20,
        marginRight: 20,
    },
    addressContainer: {
        paddingVertical: 10,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
        flexDirection: 'row',
    },
    addressInfo: {
        flex: 1
    },
    textAddressInfo: {
        marginLeft: 13,
        fontSize: 13,
        width: '80%'
    },
    textAddress: {
        marginLeft: 13,
        fontSize: 15,
        fontWeight: 'bold',
    },
    textInfo: {
        fontSize: 14,
        marginTop: 17
    },
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
    line: {
        borderBottomWidth: 15,
        borderBottomColor: '#ECECEE',
    },
    header: {
        paddingVertical: 10,
        marginHorizontal: 30,
        marginVertical: 30,
    },

    container: {
        flex: 1,
        backgroundColor: "whitesmoke",

    },
})

export default BillDetailScreen