import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, Text, StyleSheet, View, Image, ScrollView, Button, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-web';
import axios from 'axios';
import { getCart } from '../../CallApi/cartApi';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import tailwind from 'twrnc';
import { TotalProductBill } from '../../DataMathResolve/TotalProductBill';
import { formatPrice } from '../../utils/format';

const CartScreen = () => {
  const navigation = useNavigation();
  const [cart, setCart] = useState([]);
  const isFocus = useIsFocused()

  useEffect(() => {
    const fetchData =async()=>{
      const data = await getCart();
      setCart(data);
    }
    fetchData();
  }, [isFocus]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>

        <View style={styles.header}>
          <Text style={styles.textHeader}>Giỏ hàng của bạn</Text>
        </View>

        {/* List Cart */}
        <FlatList
          data={cart}
          style={styles.listCart}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (

              // Cart Item
              <View style={styles.cartItem}>             
                <View style={styles.imgItemView}>
                  <Image style={styles.imgItem} source={{uri:item.image}}/>
                </View>
  
                <View style={styles.nameItemView}>
                  <View >
                    <Text style={tailwind `text-base font-bold`}>{item.product_name}</Text>
                    {/* <Text style={styles.categoryItem}>Loại: {item.brand_name}</Text> */}
                  </View>
                  {/* <View>
                    <Text style={styles.statusItem}>{item.status}</Text>
                  </View> */}
                </View>
  
                <View style={styles.priceItemView}>
                  <View>
                    <Text style={styles.textPrice}>{formatPrice(item.price * (1 - item.percent_discount / 100))}</Text>
  
                    <Text style={styles.textQuantity}>{item.quantity}</Text>
                  </View>
                  <TouchableOpacity
                    
                  >
                    <Text style={styles.textDelete}>Xóa</Text>
                  </TouchableOpacity>  
                </View>
              </View>
  
  
            )
          }}
        />

        {/* Payment Container */}
        <View style={tailwind `border-2 border-blue-300 rounded-lg px-3 py-3 w-96 self-center`}>
          <View style={tailwind `p-5`}>
            <View style={styles.productTotal}>
              <Text style={styles.productTotalPriceText}>Tổng cộng:</Text>
              <Text style={styles.productTotalPriceText}>{formatPrice(TotalProductBill(cart))}</Text>
            </View>
          </View >
          <View style={styles.confirmContainer}>
            <TouchableOpacity style={styles.buttonPayment}  onPress={() => {navigation.navigate('PayScreen')}}>
              <Text style={styles.textPayment}>Xác nhận thanh toán</Text>
            
            </TouchableOpacity>
          </View>
        </View>


      </SafeAreaView>
    </View>
  )
}

export default CartScreen;
const styles = StyleSheet.create({
  textPayment: {
    color: 'white',
    fontSize: 16,
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
    marginVertical: 10
  },
  line: {
    borderBottomWidth: 0.8,
    borderBottomColor: '#797979',
    marginTop: 15,
    width: '100%'
  },
  productTotalPriceText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  productTotalText: {
    color: '#3C3C3C'
  },
  productTotal: {
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
    marginHorizontal: 20
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
    paddingVertical: 30,
    flex: 1,
    backgroundColor: "whitesmoke",
  },
})