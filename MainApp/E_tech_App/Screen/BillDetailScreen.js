import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, Text, StyleSheet, View, Image, ScrollView, Button, TouchableOpacity } from 'react-native';
import { Touchable } from 'react-native-web';
import tailwind from 'twrnc'
const BillDetailScreen = () => {
    const data = [
        {
            id: 1,
            image: '',
            name: 'Iphone 15',
            category: 'Đen/128GB',
            price: '$62.50',
            quantity: '1',
            status: 'Còn hàng',
            total: '30.000.000'
        },
        {
            id: 2,
            image: '',
            name: 'Iphone 14',
            category: 'Đen/128GB',
            price: '$62.50',
            quantity: '1',
            status: 'Còn hàng',
            total: '70.000.000'
        },
        {
            id: 3,
            image: '',
            name: 'Iphone 13',
            category: 'Đen/128GB',
            price: '$62.50',
            quantity: '1',
            status: 'Còn hàng',
            total: '50.000.000'
        },
        {
            id: 4,
            image: '',
            name: 'Iphone 12',
            category: 'Đen/128GB',
            price: '$62.50',
            quantity: '1',
            status: 'Còn hàng',
            total: '45.000.000'
        },
        {
            id: 5,
            image: '',
            name: 'Iphone 11',
            category: 'Đen/128GB',
            price: '$62.50',
            quantity: '1',
            status: 'Còn hàng',
            total: '40.000.000'
        },
    ]
    return (
        <View style={styles.container}>
            <ScrollView>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.textTitle}>Đơn hàng đã hoàn thành</Text>
                        <Image
                            source={require('../img/billScreen/check_463574.png')}
                            style={tailwind`ml-3 w-5 h-5 self-center`}
                        />
                    </View>
                    <Text style={styles.textInfo}>Mã đơn hàng: ẠUN132443</Text>
                    <Text style={styles.textInfo}>Ngày mua: 30/10/2023</Text>
                    <Text style={styles.textInfo}>Ngày nhận hàng: 3/11/2023</Text>
                    <Text style={styles.textInfo}>Người mua: Nguyễn Văn A </Text>
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
                            <Text style={styles.textAddressInfo}>số nhà 15, ngõ 565, đường Lạc Long Quân, Tây Hồ, Hà Nội</Text>
                        </View>
                    </View>

                </View>
                <View style={styles.line}></View>

                {/* List Bill */}
                <FlatList
                    data={data}
                    style={styles.listCart}
                    renderItem={({ item }) => (

                        // Cart Item
                        <View style={styles.itemContainer}>
                            <View style={styles.cartItem}>

                                <View style={styles.imgItemView}>
                                    <Image style={styles.imgItem} />
                                </View>

                                <View style={styles.nameItemView}>
                                    <View >
                                        <Text style={styles.nameItem}>{item.name}</Text>
                                        <Text style={styles.categoryItem}>Loại: {item.category}</Text>
                                        <Text style={styles.categoryItem}>Giá: {item.price}</Text>
                                    </View>
                                    <View>

                                    </View>
                                </View>

                                <View style={styles.priceItemView}>
                                    <Text style={styles.textQuantity}>Số lượng: {item.quantity}</Text>
                                </View>
                            </View>
                            <View style={styles.textTotal}>
                                <Text style={styles.textTotal}>Tổng cộng: {item.total}</Text>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
                {/* Total Container */}
                <View style={styles.calContainer}>
                    <View style={styles.calView}>
                        <Text style={styles.textInfo}>Tổng đơn hàng:</Text>
                        <Text style={styles.textInfo}>56.000.000</Text>
                    </View>
                    <View style={styles.calView}>
                        <Text style={styles.textInfo}>Phí vận chuyển:</Text>
                        <Text style={styles.textInfo}>20.000</Text>
                    </View>
                    <View style={styles.calView}>
                        <Text style={styles.textInfo}>Áp dụng voucher:</Text>
                        <Text style={styles.textInfo}>-500.000</Text>
                    </View>
                    <View style={styles.calView}>
                        <Text style={styles.textInfo}>Giảm giá phí vận chuyển:</Text>
                        <Text style={styles.textInfo}>-10.000</Text>
                    </View>
                    <View style={styles.calViewTotal}>
                        <Text style={styles.textBold}>Thành tiền:</Text>
                        <Text style={styles.textBold}>56.510.000</Text>
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
                            <Text style={styles.textBold}>Phương thức thanh toán: </Text>
                            <Text style={styles.textMoneyType}> Tiền mặt</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.line}></View>

                {/* Button */}
                <View style={styles.Button}>
                <View style={styles.confirmContainer}>
            <TouchableOpacity  style={styles.buttonPayment}>
              <Text style={styles.textPayment}>Phản hồi đơn hàng</Text>
            </TouchableOpacity>
          </View>
          </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    Button:{
        backgroundColor:'#ECECEE',
       
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
        marginBottom:30,
        shadowOpacity:0.2
      },
    paymentContainer: {
        height: 50,
        marginLeft: 20,
        marginRight: 20,
        
        justifyContent:'center'
    },
    textMoneyType:{
        fontSize:14,
    },
    paymentType:{
        flexDirection:'row',
        marginLeft:10,
    },
    textBold:{
        fontWeight: 'bold',
    },
    calViewTotal:{
        flexDirection:'row',
        justifyContent: 'space-between',
        marginTop:25
    },
    calView:{
        flexDirection:'row',
        justifyContent: 'space-between',
    },
    calContainer:{
        height: 180,
        marginLeft: 30,
        marginRight: 30,
        marginTop:10
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
        paddingBottom: 20,
        borderBottomColor: '#D5D5D5',
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