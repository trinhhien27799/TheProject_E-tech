import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, Text, StyleSheet, View, Image, ScrollView, Button, TouchableOpacity } from 'react-native';
import tailwind from 'twrnc'
import OrderStatusHeader from '../Component/OrderStatusHeader';
import { TotalProductBill } from '../DataMathResolve/TotalProductBill';
import { formatPrice, formatTime } from '../utils/format';
import CommentButton from '../Component/CommentButton';
import { checkComment } from '../CallApi/commentAPI';
import { getItemBill } from '../CallApi/billApi';



const BillDetailScreen = ({ route }) => {
    const { dataId } = route.params;


    const [item, setItem] = useState(null)
    const [caches, setGetCacheArray] = useState(null)


    const getData = async () => {
        try {
            const response = await getItemBill(dataId)
            setItem(response)
        } catch (error) {
            console.log('BillDetailScreen: ', error)
        }
    }

    const getCache = async (data) => {
        try {
            const data = await checkComment(data);
            console.log("-----------------\n",data)
            setGetCacheArray(data);
        } catch (error) {
            console.log('BillDetailScreen: ', error)
        }
    }


    useEffect(() => {
        getData()

    }, [])

    useEffect(() => {
        getCache()
    }, [item])





    // useEffect(() => {
    //     const hideComponent = async () => {
    //         const timer = setTimeout(() => {
    //             setIsVisible(false);
    //             AsyncStorage.setItem('componentVisibility', 'hidden'); // Store the visibility state
    //         }, 3000); // Change the duration to 3000 milliseconds (3 seconds)

    //         return () => clearTimeout(timer); // Clean up the timer when the component unmounts
    //     };

    //     const checkVisibility = async () => {
    //         const visibility = await AsyncStorage.getItem('componentVisibility'); // Retrieve the visibility state
    //         if (visibility === 'hidden') {
    //             setIsVisible(false);
    //         } else {
    //             hideComponent();
    //         }
    //     };

    //     checkVisibility();
    // }, []);

    return (
        item &&
        <View style={styles.container}>
            <ScrollView>
                {/* Header */}
                <View style={styles.header}>
                    <OrderStatusHeader orderStatus={item.status} />
                    <Text style={styles.textInfo}>Mã đơn hàng: {item._id}</Text>
                    <Text style={styles.textInfo}>Ngày mua: {formatTime(item.time)}</Text>
                    <Text style={styles.textInfo}>Ngày nhận hàng: 3/11/2023</Text>
                    <Text style={styles.textInfo}>Người mua: {item.address.fullname} </Text>
                </View>

                <View style={styles.line}></View>

                {/* Address */}
                <View style={styles.addressContainer}>
                    <View style={styles.addressHeader}>
                        <Image
                            source={require('../img/store.png')}
                            style={tailwind`ml-3 w-5 h-5 self-center mt--10`}
                        />
                        <View style={styles.addressInfo}>
                            <Text style={styles.textAddress}>Địa chỉ nhận hàng</Text>
                            <Text style={styles.textAddressInfo}>{item.address.address}</Text>
                        </View>
                    </View>

                </View>
                <View style={styles.line}></View>

                {/* List Bill */}
                <FlatList
                    data={item.products}
                    style={styles.listCart}
                    renderItem={({ item }) => {
                        // console.log('variation id: ' + item.variations_id);
                        // setComment(item.variations_id);
                        return (
                            // Cart Item
                            <View style={styles.itemContainer}>
                                <View style={styles.cartItem}>

                                    <View style={styles.imgItemView}>
                                        <Image
                                            style={styles.imgItem}
                                            source={{ uri: item.image }}
                                        />
                                    </View>

                                    <View style={styles.nameItemView}>
                                        <View >
                                            <Text style={styles.nameItem}>{item.product_name}</Text>
                                            <Text style={styles.categoryItem}>Loại: </Text>
                                            <Text style={styles.categoryItem}>Giá: {formatPrice(item.price)}</Text>
                                        </View>
                                        <View>

                                        </View>
                                    </View>

                                    <View style={styles.priceItemView}>
                                        <Text style={styles.textQuantity}>Số lượng: {item.quantity}</Text>
                                    </View>
                                </View>
                                <View style={styles.textTotal}>
                                    <Text style={styles.textTotal}>Tổng cộng: {formatPrice(item.price * item.quantity)}</Text>
                                </View>

                                {caches.length > 0 && <CommentButton item={item} />}
                            </View>
                        )
                    }}
                    keyExtractor={(item) => item.id}
                />

                {/* Total Container */}
                <View style={styles.calContainer}>
                    <View style={styles.calView}>
                        <Text style={styles.textInfo}>Tổng đơn hàng:</Text>
                        <Text style={styles.textInfo}>{formatPrice(TotalProductBill(item.products))}</Text>
                    </View>
                    <View style={styles.calView}>
                        <Text style={styles.textInfo}>Phí vận chuyển:</Text>
                        <Text style={styles.textInfo}>{formatPrice(item.transport_fee)}</Text>
                    </View>
                    <View style={styles.calView}>
                        <Text style={styles.textInfo}>Voucher giảm giá:</Text>
                        <Text style={styles.textInfo}>- {formatPrice(500000)}</Text>
                    </View>
                    <View style={styles.calViewTotal}>
                        <Text style={styles.textBold}>Thành tiền:</Text>
                        <Text style={styles.textBold}>{formatPrice(TotalProductBill(item.products) + item.transport_fee - 500000)}</Text>
                    </View>
                </View>
                <View style={styles.line}></View>

                <View style={styles.paymentContainer}>
                    <View style={styles.addressHeader}>
                        <Image
                            source={require('../img/paymain.png')}
                            style={tailwind`ml-3 w-5 h-5 self-center mt--1`}
                        />
                        <View style={styles.paymentType}>
                            <Text style={styles.textBold}>Phương thức thanh toán:</Text>
                            <Text style={styles.textMoneyType}>{item.payment_method}</Text>
                        </View>
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

        justifyContent: 'center'
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
    textTotal: {
        textAlign: 'right',
        fontSize: 13.5,
        fontWeight: 'bold',
        marginTop: 30
    },
    textPrice: {
        fontWeight: 'bold',
        textAlign: 'right'
    },
    textQuantity: {
        textAlign: 'right',
        fontSize: 13.5,
        marginTop: 1
    },
    priceItemView: {
        width: '30%',
    },
    statusItem: {
        color: '#767676',
        fontSize: 13
    },
    categoryItem: {
        color: 'black',
        fontSize: 13,
        marginTop: 10
    },
    nameItem: {
        fontSize: 15,
        fontWeight: 'bold',

    },
    nameItemView: {
        width: '35%',

    },
    imgItem: {
        width: 80,
        height: 110,
        backgroundColor: '#D5D5D5',
        justifyContent: 'center',
        borderRadius: 5,
    },
    cartItem: {
        width: '100%',
        height: 135,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20
    },
    itemContainer: {
        flexDirection: 'column',
        borderBottomWidth: 1.3,
        paddingVertical: 20,
        borderBottomColor: '#D5D5D5',
        justifyContent: 'center'

    },
    listCart: {
        maxHeight: 1000,
        marginLeft: 20,
        marginRight: 20,
    },
    addressHeader: {
        flexDirection: 'row',
    },
    addressContainer: {
        height: 80,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15
    },
    textAddressInfo: {
        marginLeft: 13,
        fontSize: 13,
        marginTop: 10,
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
        height: 180,
        marginHorizontal: 30,
        marginVertical: 30,
    },

    container: {
        flex: 1,
        backgroundColor: "whitesmoke",

    },
})

export default BillDetailScreen