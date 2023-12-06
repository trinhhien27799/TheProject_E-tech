import React, { useState, useEffect } from 'react';
import {
  Image,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import tailwind from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { TotalProductBill } from '../DataMathResolve/TotalProductBill';
import { ShipMoneyResolve_City } from '../DataMathResolve/ShipMoneyResolve';
import { getCart } from '../CallApi/cartApi';
import { createBill } from '../CallApi/billApi'; 
import { formatPrice } from '../utils/format';
import { getAllAddresses } from '../Model/AddressModel';
import { getAddress, setAddress } from '../Component/HandleObj/AddressHandle';
import { getHandleVoucher } from '../Component/HandleObj/VoucherHandle';
import { getHandleShipping } from '../Component/HandleObj/ShippingHandle';
import { clearListCart, getListCart } from '../session';

const Pay = () => {
  const navigation = useNavigation();
  const [cart, setCart] = useState([]);

  var address = getAddress();
  const [transport_fee, setTransport_fee] = useState(20000);
  const [shipping_id, setShipping_id] = useState('65564a5792fc5d16ae6e3cdf');
  const [voucher_id, setVoucher_id] = useState();
  const [note, setNote] = useState('');
  const [selectedAddresses, setSelectedAddresses] = useState('6563170414a1947ecd79c246');
  
  // useEffect(() => {
  //   if(route.params?.data){
  //     if(!route.params.data.voucher){
  //       console.log('route: ' + route.params.data.voucher._id);
  //       setVoucher_id(route.params.data.voucher.voucher._id)
  //     }
  //     else if(!route.params.data.shipping){
  //       setShipping_id(route.params.data.shipping)
  //     }
  //     else if(!route.params.data.address){
  //       setVoucher_id(route.params.data.address.address._id)
  //     }
  //   }
  // }, [route.params?.data])


  useEffect(() => {
    setCart(getListCart())
}, [])

  // useEffect(() => {
  //   setSelectedAddresses(getAddress());
  // }, [])

  console.log(getAddress())

//   useEffect(() => {
//     setVoucher_id(getHandleVoucher());
//   }, [])

//   useEffect(() => {
//     setShipping_id(getHandleShipping());
//   })

  const listAddressData = getAllAddresses();
  // console.log('address: ' + selectedAddresses);
  // console.log('voucher: ' + voucher_id);
  // console.log('shipping: ' + shipping_id);

  console.log(getAddress());

  
  const getListId = cart.map((item) => item._id);
  console.log(getListId);
//
  const handlePay = async () => {
    try {
      const data = await createBill(selectedAddresses, getListId, transport_fee, shipping_id, voucher_id, note);
      if(data.message !== null){
        clearListCart();
        navigation.navigate('ButtonNavigation');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  // var totalResult = TotalProductBill(data);
  // var totalShipMoney = ShipMoneyResolve_City(data, 1, 2.987);

  return (
    <SafeAreaView>
      <View style={tailwind `bg-blue-600 flex-row py-3`}>
        <TouchableOpacity 
          onPress={() => { navigation.goBack() }}
          style={tailwind `bg-white p-1.5 rounded-full shadow-md ml-3`}
        >
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={tailwind `text-base mt-2 text-white shadow-md font-bold ml-3`}>Thanh toán</Text>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.containerInfo}>
          {/* Address View */}
          <View>
            <View style={{ flexDirection: 'row', alignItems: "center" }}>
              <Image
                source={require('../img/map.png')}
                style={styles.imgIcon}
              />
              <Text style={styles.textTitle}>
                Địa chỉ giao hàng
              </Text>
            </View>
          </View>

          <View>
            <TouchableOpacity style={styles.contentView} onPress={() => { navigation.navigate('ChooseAddressScreen', {listOnlyAddresses: listAddressData}) }}>
              {/* Address Detail */}
              <View>
                <Text style={styles.textInfo} >Tên người mua - Số điện thoại</Text>
                {selectedAddresses == null
                  ? <Text style={{ marginTop: 5 }}>
                    Địa chỉ
                  </Text>
                  : <Text style={{ marginTop: 5 }}>
                    {selectedAddresses}
                  </Text>
                }
                
              </View>

              <Feather
                name="chevron-right"
                size={30}
                color="black"
              />
            </TouchableOpacity>
            {/* Ship Bill */}
            <View style={tailwind`flex-row mt-3`}>
              <Text style={{ fontWeight: 'bold' }}>Phí vận chuyển: </Text>
              <Text style={tailwind`flex-1 self-end`}>
                {formatPrice(30000)}
              </Text>
            </View>
          </View>
          {/* Split Space */}
          <View style={styles.textLine}></View>

          {/* Payment Products */}
          <View style={{ flexDirection: 'row', alignItems: "center" }}>
            <Image
              source={require('../img/box1.png')}
              style={styles.imgIcon}
            />
            <Text style={styles.textTitle}>
              Sản phẩm đã chọn
            </Text>
          </View>

          {/* List Product */}
          <View style={{ marginTop: 10 }}>
            <FlatList
              data={cart}
              renderItem={({ item }) => (
                <View style={tailwind`rounded-xl w-90 self-center mt-3 border border-black py-5`}>
                  <View style={tailwind`flex-row`}>
                    <View style={tailwind`px-2`}>
                      <Image style={styles.imgItem} source={{ uri: item.image }} />
                    </View>

                    <View style={tailwind`w-40`}>
                      <View >
                        <Text style={tailwind`text-base`}>{item.product_name}</Text>
                        {/* <Text style={styles.categoryItem}>Loại: {item.brand_name}</Text> */}
                      </View>
                      {/* <View>
                    <Text style={styles.statusItem}>{item.status}</Text>
                  </View> */}
                    </View>

                    <View style={tailwind`w-23`}>
                      <View>
                        <Text style={styles.textPrice}>{formatPrice(item.price)}</Text>

                        <Text style={styles.textQuantity}>{item.quantity}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={(item) => { item._id }}
            />
          </View>

          {/* Total Product */}
          <View>
            <TextInput
              placeholder="Ghi chú cho cửa hàng"
              multiline
              onChangeText={(text) => {
                setNote(text);
              }}
              placeholderTextColor={'#8E8E8E'}
              style={{
                borderWidth: 0.3,
                borderRadius: 3,
                padding: 5,
                height: 70,
                marginVertical: 10
              }}
            />
             <View style={{flexDirection:'row',justifyContent:'space-between', marginTop:10}}>
              <Text style={{ fontWeight: 'bold' }}>Tổng cộng: </Text>
              <Text style={tailwind`self-end`}>
              {formatPrice(TotalProductBill(cart))}
              </Text>
            </View>
          </View>

          {/* Split Space */}
          <View style={styles.textLine}></View>


          {/* Phương thức vận chuyển */}
          <View style={{ flexDirection: 'row', alignItems: "center" }}>
            <Image
              source={require('../img/car.png')}
              style={styles.imgIcon}
            />
            <Text style={styles.textTitle}>
              Phương thức vận chuyển
            </Text>
          </View>

          <TouchableOpacity style={styles.contentView} onPress={() => { navigation.navigate('ShippingMethod') }}>
              {/* Address Detail */}
              <View>
                <Text>{shipping_id == null ? 'Chọn phương thức vận chuyển' : shipping_id}</Text>
              </View>

              <Feather
                name="chevron-right"
                size={30}
                color="black"
              />
            </TouchableOpacity>

          {/* Split Space */}
          <View style={styles.textLine}></View>


          {/* Voucher */}
          <View style={{ flexDirection: 'row', alignItems: "center" }}>
            <Image
              source={require('../img/voucher.png')}
              style={styles.imgIcon}
            />
            <Text style={styles.textTitle}>
              Voucher giảm giá
            </Text>
          </View>
          
          <View>
               <TouchableOpacity  style={styles.contentView} onPress={() => { navigation.navigate('ApDungVoucher') }}>
            <View style={{ flex: 1 }}>
              {/* { voucher_id == '' ?  */}
              <Text
                style={{
                  fontSize: 14.5,
                  marginTop: 'auto',
                  marginLeft: 2,
                  marginBottom: 'auto',
                }}>
                {voucher_id == null ? 'Chọn mã giảm giá của bạn' : voucher_id}
              </Text> 
              {/* : <Text
                style={{
                  fontSize: 14.5,
                  marginLeft: 2,
                  marginTop: 'auto',
                  marginBottom: 'auto',
                }}>
                {voucher_name}
              </Text>} */}
            </View>
           
            <Feather
                name="chevron-right"
                size={30}
                color="black"
              />
            </TouchableOpacity>
          </View>

          {/* Split Space */}
          <View style={styles.textLine}></View>

          {/* Payment Method */}
          <View style={{ flexDirection: 'row', alignItems: "center" }}>
            <Image
              source={require('../img/payment_method.png')}
              style={styles.imgIcon}
            />
            <Text style={styles.textTitle}>
              Phương thức thanh toán
            </Text>
          </View>
          <View>
            <TouchableOpacity style={styles.contentView} onPress={() => { navigation.navigate('PTTT') }}>
            <View>
              <Text>
                Thanh toán khi nhận hàng
              </Text>
            </View>
         
            <Feather
                name="chevron-right"
                size={30}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Space Split */}
        <View style={styles.textLine}></View>

        {/* Total Payment */}
        <View>
          <View>
            <Text style={styles.textTitle}>
              Chi tiết thanh toán
            </Text>
            <View style={styles.contentTotalView}>
              <View>
                <Text style={styles.textTotal}>Tổng tiền hàng:</Text>
                <Text  style={styles.textTotal}>Tiền phí vận chuyển:</Text>
                <Text style={styles.textTotal}>Áp dụng mã voucher:</Text>
                <Text style={styles.textTotal}>Tổng thanh toán:</Text>
              </View>
              <View>
                <Text style={styles.textTotal}>{formatPrice(TotalProductBill(cart))}</Text>
                <Text style={styles.textTotal}>30.000đ</Text>
                <Text style={styles.textTotal}>200.000đ</Text>
                <Text style={styles.textHighlight}>1.850.000đ</Text>
              </View>
            </View>
          </View>
          <View style={styles.btnPayContainer}>
          <TouchableOpacity style={styles.btnPay} onPress={handlePay}>
            <Text style={{ fontWeight: 'bold', color: 'white' }}>
              Đặt hàng
            </Text>
          </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Pay;

const styles = StyleSheet.create({
  container: {
    padding: 7
  },
  containerInfo: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  contentView: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center"
  },
  contentTotalView:{
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    marginHorizontal:10,
    marginBottom:15
  },
  textTotal:{
    marginTop:10,
  },
  textHighlight:{
    color:'red',
    marginTop:10,
    fontWeight:'bold'
  },
  textLine: {
    height: 0.3,
    width: '100%',
    backgroundColor: 'black',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    marginBottom: 15
  },
  textBlur:{
    color:"#8E8E8E"
  },
 
  img: {
    height: 60,
    width: 60,
    padding: 10,
    marginLeft: 20,
    marginTop: 10,
    resizeMode: 'cover',
  },
  imgIcon: {
    width: 25,
    height: 25,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10
  },
  textInfo: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  btnPay: {
    backgroundColor: '#336BFA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 15,
    marginBottom: 95
  },
  btnPayContainer:{
    margin:10
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
  textPrice: {
    fontWeight: 'bold',
    textAlign: 'right'
  },
  textQuantity: {
    textAlign: 'right',
    marginTop: 15,
    fontWeight: 'bold',
  },
});
