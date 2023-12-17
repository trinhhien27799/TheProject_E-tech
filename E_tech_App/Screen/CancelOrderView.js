import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, FlatList, ScrollView, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { Text } from 'react-native'
import { View } from 'react-native'
import { RadioButton } from 'react-native-paper'
import tailwind from 'twrnc'
import { cancelBill, getItemBill } from '../CallApi/billApi'
import { formatPrice, formatTime } from '../utils/format'
import LockLoading from './authentication/lockLoading'


const CancelOrderView = () => {
    const route = useRoute();
    const billId = route.params?.billId;
    const [data, setData] = useState(null)
    const navigation = useNavigation();
    const [timeLate, setTimeLate] = useState(null)
    const [loading, setLoading] = useState(false)

    const getData = async () => {
        try {
            const response = await getItemBill(billId)
            if (response._id) {
                setData(response)
                const t = new Date(response.time).getTime()
                if (response.shipping_method == 0) {
                    setTimeLate(new Date(t + 4 * 24 * 60 * 60 * 1000))
                } else if (response.shipping_method == 1) {
                    setTimeLate(new Date(t + 2 * 24 * 60 * 60 * 1000))
                } else {
                    setTimeLate(new Date(t + 6 * 24 * 60 * 60 * 1000))
                }
            } else {
                Alert.alert('Thông báo', 'Đã xảy ra lỗi hãy thử lại sau', [{
                    text: 'Quay lại',
                    onPress: () => { navigation.goBack() }
                }])
            }
        } catch (error) {
            console.log('CancelOrderView: ', error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const [takeValue, setTakeValue] = useState('Sản phẩm hết hàng');


    const headerTextStyle = 'mb-2'

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
            id: 3,
            value: 'Sản phẩm không đúng với mô tả'
        },
    ];

    const ReasonCard = ({ item, index }) => {
        return (
            <View style={tailwind`flex-row p-2`}>
                <RadioButton value={item.value} />
                <Text style={tailwind`mt-1.5`}>{item.value}</Text>
            </View>
        )
    }

    const HandleCancel = async () => {
        Alert.alert('Thông báo', 'Xác nhận hủy đơn hàng', [{
            text: 'Xác nhận',
            onPress: cancelNow
        },
        {
            text: 'Quay lại',
            style: 'default',
        }])
    }

    const cancelNow = async () => {
        try {
            setLoading(true)
            const response = await cancelBill(billId, takeValue)
            setLoading(false)
            if (response.code == 200) {
                const msg = (data.payment_status == 1 && data.payment_method == 1) ? 'Hủy đơn thành công, Số tiền thanh toán sẽ được hoàn lại sau 3 đến 4 ngày' : 'Hủy đơn thành công'
                Alert.alert('Thông báo', msg, [
                    {
                        text: 'Quay lại',
                        onPress: () => { navigation.goBack() }
                    },
                ],)
            } else {
                Alert.alert('Thông báo', 'Hủy đơn hàng thất bại, vui lòng liên hệ cskh để tiến hánh hủy đơn')
            }
        } catch (error) {
            setLoading(false)
            Alert.alert('Thông báo', 'Hủy đơn hàng thất bại,vui lòng liên hệ cskh để tiến hánh hủy đơn')
        }
    }

    return (
        data &&
        <ScrollView>
            <View>

                {/* Bill Detail */}
                <View style={tailwind`bg-white justify-center`}>
                    <View style={tailwind`p-5`}>
                        <Text style={tailwind`self-center text-base font-bold mb-5`}>Thông tin chi tiết đơn hàng</Text>

                        <Text style={tailwind`${headerTextStyle}`}>Mã đơn hàng: {data._id}</Text>
                        <Text style={tailwind`${headerTextStyle}`}>Ngày mua: {formatTime(data.time)}</Text>
                        <Text style={tailwind`${headerTextStyle}`}>Ngày nhận hàng: {formatTime(timeLate)} </Text>
                        <Text style={tailwind`${headerTextStyle}`}>Người mua: {data.address.fullname}</Text>
                        <Text style={tailwind`${headerTextStyle}`}>Các sản phẩm: </Text>


                        <View style={tailwind`border border-gray-300 rounded-lg w-96`}>
                            <FlatList
                                scrollEnabled={false}
                                data={data.products}
                                keyExtractor={(item, index) => item._id + index}
                                style={styles.listCart}
                                renderItem={({ item, index }) => {
                                    return (
                                        // Cart Item
                                        <View style={styles.itemContainer}>
                                            <View style={styles.cartItem}>


                                                <Image
                                                    style={styles.imgItem}
                                                    source={{ uri: item.image }}
                                                />


                                                <View style={styles.nameItemView}>
                                                    <View >
                                                        <Text style={styles.nameItem}>{item.product_name}</Text>
                                                        <Text style={styles.textQuantity}>Số lượng: {item.quantity}</Text>
                                                    </View>
                                                </View>

                                            </View>
                                            <View style={styles.textTotal}>
                                                <Text style={styles.textTotal}>Tổng cộng: {formatPrice(item.price)}</Text>
                                            </View>
                                        </View>
                                    )
                                }}

                            />
                        </View>

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
                    </View>
                </View>

                <View style={tailwind`mt-3 bg-white p-3`}>
                    <View style={styles.addressHeader}>
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
                </View>

                <View style={tailwind`p-5 bg-white mt-3`}>
                    <Text style={tailwind`self-center text-base mb-3 font-bold`}>Lý do hủy đơn hàng</Text>

                    <RadioButton.Group
                        value={takeValue}
                        onValueChange={(item) => setTakeValue(item)}
                    >
                        <FlatList
                            scrollEnabled={false}
                            data={cancelReasonList}
                            keyExtractor={(item, index) => item.id + index}
                            renderItem={ReasonCard}
                        />
                    </RadioButton.Group>

                    <TouchableOpacity
                        style={[tailwind`bg-red-600 p-3 w-50 self-center mt-3 rounded-lg`]}
                        onPress={HandleCancel}
                    >
                        <Text style={tailwind`self-center font-bold text-white`}>Xác Nhận Hủy</Text>
                    </TouchableOpacity>
                </View>

            </View>
            {loading && <LockLoading />}
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
    },
    textPrice: {
        fontWeight: 'bold',
        textAlign: 'right'
    },
    textQuantity: {
        fontSize: 13.5,
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
        flex: 1,
        marginStart: 15
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
        flexGrow: 0,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    itemContainer: {
        flexDirection: 'column',
        borderBottomWidth: 1.3,
        paddingVertical: 10,
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