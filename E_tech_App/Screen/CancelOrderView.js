import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { Text } from 'react-native'
import { View } from 'react-native'
import { RadioButton } from 'react-native-paper'
import tailwind from 'twrnc'
import { cancelBill } from '../CallApi/billApi'
import { formatPrice } from '../utils/format'
import { TotalProductBill } from '../DataMathResolve/TotalProductBill'
import { getItemProduct } from '../CallApi/productApi'

const CancelOrderView = () => {
    const route = useRoute();
    const data = route.params
    const item = data.item;

    const [takeValue, setTakeValue] = useState(null);
    const navigation = useNavigation();

    const headerTextStyle = 'mb-2'

    console.log(item);

    const cancelReasonList = [
        {
            id: 1,
            value: 'Sản phẩm hết hàng'
        },
        {
            id: 2,
            value: 'Sản phẩm bị lỗi'
        },
        {
            id: 1,
            value: 'Sản phẩm không đúng với mô tả'
        },
    ];

    console.log(item.products);



    const ReasonCard = ({ item }) => {
        return (
            <View style={tailwind`flex-row p-2`}>
                <RadioButton value={item.value} />
                <Text style={tailwind`mt-1.5`}>{item.value}</Text>
            </View>
        )
    }

    return (
        <ScrollView>
            <View>
                <View style={tailwind `flex-row bg-white mb-3`}>
                    <TouchableOpacity
                        style={tailwind`w-9 h-9 bg-white my-5 ml-5 mr-3 justify-center rounded-full shadow-md`}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={require('../img/previous.png')}
                            style={tailwind`w-5 h-5 self-center`} />
                    </TouchableOpacity>

                    <Text style={tailwind `text-base font-bold mt-6`}>Hủy đơn hàng</Text>
                </View>

                {/* Bill Detail */}
                <View style={tailwind`bg-white justify-center`}>
                    <View style={tailwind`p-5`}>
                        <Text style={tailwind `self-center text-base font-bold mb-5`}>Thông tin chi tiết đơn hàng</Text>

                        <Text style={tailwind`${headerTextStyle}`}>Mã đơn hàng: {item._id}</Text>
                        <Text style={tailwind`${headerTextStyle}`}>Ngày mua: {item.time}</Text>
                        <Text style={tailwind`${headerTextStyle}`}>Ngày nhận hàng: </Text>
                        <Text style={tailwind`${headerTextStyle}`}>Người mua: {item.address.fullname}</Text>
                        <Text style={tailwind`${headerTextStyle}`}>Các sản phẩm: </Text>

                        {/* List Bill */}
                        <View style={tailwind `border border-gray-300 rounded-lg w-96`}>
                            <FlatList
                                data={item.products}
                                style={styles.listCart}
                                renderItem={({ data }) => {
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
                                        </View>
                                    )
                                }}
                                keyExtractor={(item) => item.id}
                            />
                        </View>

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
                    </View>
                </View>

                <View style={tailwind`mt-3 bg-white p-3`}>
                    <View style={styles.addressHeader}>
                        <Image
                            source={require('../img/paymain.png')}
                            style={tailwind`ml-3 w-5 h-5 self-center mt--1`}
                        />
                        <View style={styles.paymentType}>
                            <Text style={tailwind `ml-2 mr-1 font-bold`}>Phương thức thanh toán:</Text>
                            <Text style={tailwind `w-40`}>{item.payment_method}</Text>
                        </View>
                    </View>
                </View>

                <View style={tailwind`p-5 bg-white mt-3`}>
                    <Text style={tailwind`self-center text-base mb-3 font-bold`}>Lý do hủy đơn hàng</Text>

                    <RadioButton.Group
                        value={takeValue}
                        onValueChange={(item) => setTakeValue(item)}
                    >
                        <FlatList
                            data={cancelReasonList}
                            renderItem={ReasonCard}
                        />
                    </RadioButton.Group>

                    <TouchableOpacity
                        style={tailwind`bg-red-600 p-3 w-50 self-center mt-3 rounded-lg`}
                        onPress={() => { cancelBill(data, takeValue) }}
                    >
                        <Text style={tailwind`self-center font-bold text-white`}>Xác Nhận Hủy</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
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
        justifyContent: 'center',
    },
    textMoneyType: {
        fontSize: 14,
        width: '45%',
        marginLeft: 3
    },
    paymentType: {
        flexDirection: 'row'
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

export default CancelOrderView