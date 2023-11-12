import {
  Image,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import tailwind from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { TotalProductBill } from '../DataMathResolve/TotalProductBill';
import { ShipMoneyResolve_City } from '../DataMathResolve/ShipMoneyResolve';

const Pay = ({ username, diachi, price1, ship }) => {
  const navigation = useNavigation();
  const priceall = price1 + ship;
  const data = [
    {
      id: 1,
      name: 'IPhone 15 Pro Max',
      price: 20000000,
      hang: 'Apple',
      quantity: 1,
      weight: 0.758
    },
    {
      id: 2,
      name: 'IPhone 15 Pro Max',
      price: 20000000,
      hang: 'Apple',
      quantity: 1,
      weight: 0.758
    },
    {
      id: 3,
      name: 'IPhone 15 Pro Max',
      price: 20000000,
      hang: 'Apple',
      quantity: 1,
      weight: 0.758
    },
    {
      id: 4,
      name: 'IPhone 15 Pro Max',
      price: 20000000,
      hang: 'Apple',
      quantity: 1,
      weight: 0.758
    },
  ];

  var totalResult = TotalProductBill(data);
  var totalShipMoney = ShipMoneyResolve_City(data, 1, 2.987);

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
              data={data}
              renderItem={({ item }) => (
                <View style={tailwind`rounded-xl w-90 self-center mt-3 border border-black`}>
                  <View style={styles.view2}>
                    <View style={{ width: '28%', paddingTop: 10 }}>
                      <Image
                        source={require('../img/store.png')}
                        style={styles.img}
                      />
                    </View>
                    <View
                      style={{ paddingTop: 10, width: '60%', marginLeft: 10 }}>
                      <Text style={styles.title}>{item.name}</Text>
                      <Text style={styles.title2}>{item.price}</Text>
                      <Text style={styles.title2}>{item.hang}</Text>
                    </View>
                  </View>



                  <View style={tailwind`flex-row m-3 self-end`}>
                    <Text>Số lượng: </Text>
                    <Text>{item.quantity}</Text>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>

          {/* Total Product */}
          <View style={tailwind`w-93 self-center flex-row mt-5`}>
            <Text style={{ fontWeight: 'bold' }}>
              Tổng Cộng:
            </Text>
            <Text style={tailwind`flex-1 self-end ml-53`}>
              {totalResult}đ
            </Text>
          </View>

          {/* Split Space */}
          <View style={styles.view3}></View>

          {/* Address View */}
          <View style={{ marginTop: 30 }}>
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
                Username - Phone {username}
              </Text>
              <Text>
                Địa chỉ {diachi}
              </Text>
            </View>
            <TouchableOpacity onPress={() => {navigation.navigate('ChooseAddressScreen')}}>
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
              {totalShipMoney}đ
            </Text>
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
                <Text
                  style={{
                    fontSize: 14.5,
                    marginLeft: 10,
                    marginTop: 'auto',
                    marginBottom: 'auto',
                  }}>
                  Chọn mã giảm giá của bạn
                </Text>
              </View>
              <TouchableOpacity onPress={() => {navigation.navigate('ChooseAddressScreen')}}>
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
            <TouchableOpacity onPress={() => {navigation.navigate('PTTT')}}>
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
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
          <View style={tailwind`flex-1`}>
            <View style={tailwind`ml-6`}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Thanh toán:
              </Text>
              <Text
                style={{
                  fontSize: 18,
                }}>
                {totalResult + totalShipMoney}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.button2}>
            <Text style={{ fontWeight: 'bold', color: 'white' }}>
              Thanh toán
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
});
