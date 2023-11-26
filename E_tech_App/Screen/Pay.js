import React, { useState , useEffect} from 'react';
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
import { createBill } from '../CallApi/billApi2';
import { formatPrice } from '../utils/format';



const Pay = ({route}) => {
  const {voucher_idd, voucher_name} = route.params; 
  const navigation = useNavigation();
  const [cart, setCart] = useState([]);


  const [listIDcart, setListIDcart] = useState([]);
  const [address, setAddress] = useState('123 Trịnh Văn Bô, Phương Canh, Nam Từ Liêm, Hà Nội');
  const [transport_fee, setTransport_fee] = useState([]);
  
  const [note, setNote] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCart();
      setCart(data);
    }
    fetchData();
  }, []);

  const handlePay = async () => {
    try {
      createBill(address, listIDcart, transport_fee, shipping_id,voucher_idd, note);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  // var totalResult = TotalProductBill(data);
  // var totalShipMoney = ShipMoneyResolve_City(data, 1, 2.987);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header Screen */}
        <View style={styles.view}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons style={tailwind`ml-5`} name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <Text style={styles.text}>Thanh toán</Text>
        </View>

        <View style={{ marginTop: 20 }}>
          {/* Address View */}
          <View >
            <View style={{ flexDirection: 'row', height: 30, marginLeft: 20 }}>
              <Text style={{ fontSize: 18, flex: 1, fontWeight: 'bold' }}>
                Địa chỉ nhận hàng
              </Text>
              <Image
                source={require('../img/location.png')}
                style={styles.img1}
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              height: 50,
              flexDirection: 'row',
              marginLeft: 20,
            }}>

            {/* Address Detail */}
            <View style={{ flex: 1 }}>
              <Text>
                Username - Phone 
              </Text>
              <Text>
                Địa chỉ 
              </Text>
            </View>
            <TouchableOpacity onPress={() => { navigation.navigate('ChooseAddressScreen') }}>
              <Feather
                name="chevron-right"
                size={45}
                color="black"
                style={{
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  marginRight: 40,
                }}
              />
            </TouchableOpacity>
          </View>

          {/* Ship Bill */}
          <View style={tailwind`w-93 self-center flex-row mt-3`}>
            <Text style={{ fontWeight: 'bold' }}>
              Phí vận chuyển:
            </Text>
            <Text style={tailwind`flex-1 self-end ml-51`}>
              30000đ
            </Text>
          </View>
          {/* Split Space */}
          <View style={styles.view3}></View>

          {/* Payment Products */}
          <View style={tailwind`flex-row self-center w-full`}>
            <Text style={{ fontSize: 18, flex: 1, fontWeight: 'bold', marginLeft: 20, alignSelf: 'center' }}>
              Các sản phẩm
            </Text>
            <Image source={require('../img/store.png')} style={styles.img1} />
          </View>

          {/* List Product */}
          <View style={{ marginTop: 10 }}>
            <FlatList
              data={cart}
              renderItem={({ item }) => (
                <View style={tailwind`rounded-xl w-90 self-center mt-3 border border-black py-5`}>
                  <View style={tailwind `flex-row`}>
                    <View style={tailwind `px-2`}>
                      <Image style={styles.imgItem} source={{ uri: item.image }} />
                    </View>

                    <View style={tailwind `w-40`}>
                      <View >
                        <Text style={tailwind `text-base`}>{item.product_name}</Text>
                        {/* <Text style={styles.categoryItem}>Loại: {item.brand_name}</Text> */}
                      </View>
                      {/* <View>
                    <Text style={styles.statusItem}>{item.status}</Text>
                  </View> */}
                    </View>

                    <View style={tailwind `w-23`}>
                      <View>
                        <Text style={styles.textPrice}>{formatPrice(item.price)}</Text>

                        <Text style={styles.textQuantity}>{item.quantity}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={(item) => {item.id ; setListIDcart == item.id}}
            />
          </View>

          {/* Total Product */}
          <View style={{ marginTop: 10 }}>
            <TextInput
              placeholder="Ghi chú cho cửa hàng"
              onChangeText={(text) => {
                setNote(text);
              }}
              placeholderTextColor={'black'}
              style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}
            />
            <View style={tailwind`w-93 self-center flex-row mt-5`}>
              <Text style={{ fontWeight: 'bold' }}>
                Tổng Cộng:
              </Text>
              <Text style={tailwind`flex-1 self-end ml-53`}>
                {formatPrice(TotalProductBill(cart))}
              </Text>
            </View>
          </View>
          
          {/* Split Space */}
          <View style={styles.view3}></View>
          

          {/* Phương thức vận chuyển */}
          <View style={{ marginTop: 30 }}>
            <View style={{ flexDirection: 'row', height: 30, marginLeft: 20 }}>
              <Text style={{ fontSize: 18, flex: 1, fontWeight: 'bold' }}>
              Phương thức vận chuyển
              </Text>
              <Image
                source={require('../img/sale.png')}
                style={styles.img1}
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              height: 50,
              flexDirection: 'row',
              marginLeft: 20,
            }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 14.5,
                  marginLeft: 10,
                  marginTop: 'auto',
                  marginBottom: 'auto',
                }}>
                Chọn phương thức vận chuyển
              </Text>
            </View>
            <TouchableOpacity onPress={() => { navigation.navigate('ShippingMethod') }}>
              <Feather
                name="chevron-right"
                size={45}
                color="black"
                style={{
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  marginRight: 40,
                }}
              />
            </TouchableOpacity>
          </View>

          {/* Split Space */}
          <View style={styles.view3}></View>


          {/* Voucher */}
          <View style={{ marginTop: 30 }}>
            <View style={{ flexDirection: 'row', height: 30, marginLeft: 20 }}>
              <Text style={{ fontSize: 18, flex: 1, fontWeight: 'bold' }}>
                Áp dụng Voucher giảm giá
              </Text>
              <Image
                source={require('../img/sale.png')}
                style={styles.img1}
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              height: 50,
              flexDirection: 'row',
              marginLeft: 20,
            }}>
            <View style={{ flex: 1 }}>
              { voucher_idd == '' ? <Text
                style={{
                  fontSize: 14.5,
                  marginLeft: 10,
                  marginTop: 'auto',
                  marginBottom: 'auto',
                }}>
                Chọn mã giảm giá của bạn
              </Text> : <Text
                style={{
                  fontSize: 14.5,
                  marginLeft: 10,
                  marginTop: 'auto',
                  marginBottom: 'auto',
                }}>
                {voucher_name}
              </Text>}
            </View>
            <TouchableOpacity onPress={() => { navigation.navigate('ApDungVoucher') }}>
              <Feather
                name="chevron-right"
                size={45}
                color="black"
                style={{
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  marginRight: 40,
                }}
              />
            </TouchableOpacity>
          </View>

          {/* Split Space */}
          <View style={styles.view3}></View>

          {/* Payment Method */}
          <View style={{ marginTop: 30 }}>
            <View style={{ flexDirection: 'row', height: 50, marginLeft: 20 }}>
              <Text style={{ fontSize: 18, flex: 1, fontWeight: 'bold' }}>
                Phương thức thanh toán
              </Text>
              <Image
                source={require('../img/paymain.png')}
                style={styles.img1}
              />
            </View>
          </View>
          <View
            style={{
              height: 50,
              flexDirection: 'row',
              marginLeft: 20,
              marginTop: 10,
            }}>
            <View style={{ flex: 1 }}>
              <Text style={{ marginTop: 10 }}>
                Thanh toán khi nhận hàng
              </Text>
            </View>
            <TouchableOpacity onPress={() => { navigation.navigate('PTTT') }}>
              <Feather
                name="chevron-right"
                size={45}
                color="black"
                style={{
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  marginRight: 40,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Space Split */}
        <View style={styles.view3}></View>

        {/* Total Payment */}
        <View
          style={{
            marginTop: 20,
          }}>
          <View style={{ marginLeft: 20 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Chi tiết thanh toán
            </Text>
            <View style={{ height: 120, flexDirection: 'row', marginLeft: 10, }}>
              <View>
                <Text>Tổng tiền hàng:</Text>
                <Text>Tiền phí vận chuyển:</Text>
                <Text>Áp dụng mã voucher:</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Tổng thanh toán:</Text>
              </View>
              <View style={{ marginLeft: 80 }}>
                <Text>{formatPrice(TotalProductBill(cart))}</Text>
                <Text>50.000đ</Text>
                <Text>200.000đ</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'red' }}>1.850.000đ</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.button2} onPress={handlePay}>
            <Text style={{ fontWeight: 'bold', color: 'white' }}>
              Đặt hàng
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Pay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30,
  },
  view: {
    flexDirection: 'row',
    height: 30,
    marginTop: 20,
  },
  text: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  view2: {
    width: '90%',
    height: 80,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    marginTop: 15,
  },
  view3: {
    height: 1,
    width: '90%',
    backgroundColor: 'black',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
  },
  img: {
    height: 60,
    width: 60,
    padding: 10,
    marginLeft: 20,
    marginTop: 10,
    resizeMode: 'cover',
  },
  img1: {
    height: 40,
    width: 35,
    marginRight: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  title2: {
    fontSize: 13,
  },
  button2: {
    backgroundColor: '#336BFA',
    width: '40%',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
    marginRight: 20,
    marginLeft: 'auto',
    marginBottom: 20
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
