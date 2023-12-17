import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, Text, StyleSheet, View, Image, ScrollView, Button, TouchableOpacity } from 'react-native';
import tailwind from 'twrnc'
import OrderStatusHeader from '../Component/OrderStatusHeader';
import { formatPrice, formatTime } from '../utils/format';
import { getItemBill } from '../CallApi/billApi';
import ItemInBill from './itemInBill';
import { useNavigation, useRoute } from '@react-navigation/native';
import LoadingWidget from '../Component/loading';
import { getUser } from '../session';

const BillDetailScreen = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const { dataId } = route.params;
    const [data, setData] = useState(null)
    const [timeLate, setTimeLate] = useState(null)


    const getData = async () => {
        try {
            setData(null)
            const response = await getItemBill(dataId)
            setData(response)
            const t = new Date(response.time).getTime()
            if (response.shipping_method == 0) {
                setTimeLate(new Date(t + 4 * 24 * 60 * 60 * 1000))
            } else if (response.shipping_method == 1) {
                setTimeLate(new Date(t + 2 * 24 * 60 * 60 * 1000))
            } else {
                setTimeLate(new Date(t + 6 * 24 * 60 * 60 * 1000))
            }
        } catch (error) {
            console.log('BillDetailScreen: ', error)
        }
    }


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (getUser()) getData()
        })

        return unsubscribe
    }, [navigation])



    const renderItem = ({ item, index }) => {
        return <ItemInBill item={item} />
    }

    const payNow = () => {
        const json = {
            value: data.total_price,
            billId: data._id
        }
        navigation.navigate('MoMoPaymentScreen', { data: json })
    }


    return (

        <View style={styles.container}>
            {data ?
                <ScrollView>
                    {/* Header */}
                    <View style={styles.header}>
                        <OrderStatusHeader orderStatus={data.status} />
                        <Text style={styles.textInfo}>Mã đơn hàng: {data._id}</Text>
                        <Text style={styles.textInfo}>Người mua: {data.address.fullname} </Text>
                        <Text style={styles.textInfo}>Ngày mua: {formatTime(data.time)}</Text>
                        {(data.status == 0 || data.status == 1) && <Text style={styles.textInfo}>Ngày nhận hàng dự kiến: {formatTime(timeLate).slice(0, 10)}</Text>}
                        {data.status == -1 && <Text style={styles.textInfo}>Trạng thái: đã hủy đơn</Text>}
                        {data.status == 2 && <Text style={styles.textInfo}>Trạng thái: đã hoàn thành</Text>}

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
                            <Text style={styles.textInfo}>{formatPrice(data.total_price - data.transport_fee + data.voucher)}</Text>
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
                            <Text style={styles.textMoneyType}>{data.payment_method == 0 ? 'Thanh toán khi nhận hàng' : 'Thanh toán qua ví momo'}</Text>
                        </View>
                    </View>
                    {data.payment_method == 1 && <Text style={{ textAlign: 'center', marginBottom: 15 }}>{data.payment_status == 0 ? 'Chưa thanh toán' : 'Đã thanh toán'}</Text>}
                    <View style={styles.line}></View>

                    {/* Button */}



                    <View style={styles.Button}>
                        {data.payment_method == 1 && data.payment_status == 0 &&
                            <View style={[styles.confirmContainer, { backgroundColor: 'red', }]}>
                                <TouchableOpacity
                                    onPress={payNow}
                                    style={styles.buttonPayment}>
                                    <Text style={styles.textPayment}>Tiến hành thanh toán</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        <View style={[styles.confirmContainer, { backgroundColor: '#336BFA', }]}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('ContactScreen')}
                                style={styles.buttonPayment}>
                                <Text style={styles.textPayment}>Phản hồi đơn hàng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                :
                <View style={{ paddingTop: 30 }}>
                    <LoadingWidget />
                </View>
            }
        </View>

    )

}
const styles = StyleSheet.create({
    Button: {
        backgroundColor: '#ECECEE',
        paddingBottom: 30
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
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 7,
        height: 45,
        marginTop: 20,
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