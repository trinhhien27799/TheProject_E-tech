import React from 'react';
import { FlatList, SafeAreaView, Text, StyleSheet, View, Image, ScrollView,Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-web';
import SelectDropdown from 'react-native-select-dropdown';
const CartScreen = () => {
  const data = [
    {
      id: 1,
      image: '',
      name: 'Iphone 15',
      category: 'Đen/128GB',
      price: '$62.50',
      quantity: '1',
      status: 'Còn hàng'
    },
    {
      id: 2,
      image: '',
      name: 'Iphone 14',
      category: 'Đen/128GB',
      price: '$62.50',
      quantity: '1',
      status: 'Còn hàng'
    },
    {
      id: 3,
      image: '',
      name: 'Iphone 13',
      category: 'Đen/128GB',
      price: '$62.50',
      quantity: '1',
      status: 'Còn hàng'
    },
    {
      id: 4,
      image: '',
      name: 'Iphone 12',
      category: 'Đen/128GB',
      price: '$62.50',
      quantity: '1',
      status: 'Còn hàng'
    },
    {
      id: 5,
      image: '',
      name: 'Iphone 11',
      category: 'Đen/128GB',
      price: '$62.50',
      quantity: '1',
      status: 'Còn hàng'
    },
  ]
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
     
        <View style={styles.header}>
          <Text style={styles.textHeader}>Giỏ hàng của bạn</Text>
        </View>

        {/* List Cart */}
        <FlatList
          data={data}
          style={styles.listCart}
          renderItem={({ item }) => (

            // Cart Item
            <View style={styles.cartItem}>

              <View style={styles.imgItemView}>
                <Image style={styles.imgItem} />
              </View>

              <View style={styles.nameItemView}>
                <View >
                  <Text style={styles.nameItem}>{item.name}</Text>
                  <Text style={styles.categoryItem}>Loại: {item.category}</Text>
                </View>
                <View>
                  <Text style={styles.statusItem}>{item.status}</Text>
                </View>
              </View>

              <View style={styles.priceItemView}>
                <View>
                  <Text style={styles.textPrice}>{item.price}</Text>

                  <Text style={styles.textQuantity}>{item.quantity}</Text>
                </View>
                <Text style={styles.textDelete}>Xóa</Text>
              </View>



            </View>


          )}
          keyExtractor={(item) => item.id}
        />
        {/* Voucher Container */}
        <View style={styles.voucherContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textVoucher}>Áp dụng mã giảm giá</Text>
            <Text style={styles.textVoucher}>➜ </Text>
          </View>
        </View>
        {/* Payment Container */}
        <View style={styles.paymentContainer}>
          <View style={styles.paymentBox}>
            
            <Text style={styles.paymentText}>Thanh toán</Text>
            <View style={styles.productTotal}>
              <Text style={styles.productTotalText}>Tổng cộng sản phẩm</Text>
              <Text style={styles.productTotalPriceText}>$140.00</Text>
            </View>
            <View style={styles.line}></View>

            <View style={styles.productTotal}>
              <Text style={styles.productTotalText}>Áp dụng mã giảm giá</Text>
              <Text style={styles.productTotalPriceText}>Ô nhập mã giảm giá</Text>
            </View>
            <View style={styles.line}></View>

            <View style={styles.productTotal}>
              <Text style={styles.productTotalPriceText}>Tổng cộng</Text>
              <Text style={styles.productTotalPriceText}>$168.60</Text>
            </View>
          </View >
          <View style={styles.confirmContainer}>
        <View style={styles.buttonPayment}>
          <Text style={styles.textPayment} >Xác nhận thanh toán</Text>
        </View>
        </View>
        </View>
        
     
      </SafeAreaView>
      </View>
  )
}

export default CartScreen;
const styles = StyleSheet.create({
  textPayment:{
    color:'white',
    fontSize:16,
  },
  buttonPayment:{
    alignItems:'center',
    flex: 1,
    justifyContent:'center'
  },
  confirmContainer:{
    backgroundColor:'#336BFA',
    marginLeft:30,
    marginRight:30,
    borderRadius:7,
    height:45,
    marginTop:10
  },
  line:{
    borderBottomWidth: 0.8,
    borderBottomColor: '#797979',
    marginTop:15,
    width: '77%'
  },
  productTotalPriceText:{
    fontWeight:'bold',
    fontSize:16
  },
  productTotalText:{
    color:'#3C3C3C'
  },
  productTotal:{
    marginTop:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  paymentBox: {
  
    margin: 20
  },
  paymentContainer: {
    backgroundColor: '#A9B7FF',
    margin: 12,
    height: 285,
    borderRadius: 10,

  },
  textVoucher: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textContainer: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center'


  },
  voucherContainer: {
    backgroundColor: '#6388E6',
    height: 60,
    paddingLeft: 40,
    paddingRight: 40,
    justifyContent: 'center',
    shadowOpacity: 0.3,

  },
  textDelete: {
    textAlign: 'right',
    color: '#326CC7'
  },
  textPrice: {
    fontWeight: 'bold',
    textAlign: 'right'
  },
  textQuantity: {
    textAlign: 'right',
    marginTop: 15,
    fontWeight: 'bold',
  },
  priceItemView: {
    width: '20%',
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  statusItem: {
    color: '#767676',
    fontSize: 13
  },
  categoryItem: {
    color: '#767676',
    fontSize: 13,
    marginTop: 5
  },
  nameItem: {
    fontSize: 17,
    fontWeight: 'bold',

  },
  nameItemView: {
    width: '45%',
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  imgItem: {
    width: 80,
    height: 80,
    backgroundColor: '#D5D5D5',
    justifyContent: 'center',
    borderRadius: 5,
  },
  cartItem: {
    width: '100%',
    height: 120,
    borderBottomWidth: 1.1,
    borderBottomColor: '#D5D5D5',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20
  },
  listCart: {
    maxHeight: 400,
    marginLeft: 20,
    marginRight: 20,
  },
  header: {
    height: 50,
    borderBottomWidth: 1.1,
    borderBottomColor: '#D5D5D5',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  textHeader: {
    fontSize: 25,
    fontWeight: 'bold',

  },
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: "whitesmoke",
  },
})