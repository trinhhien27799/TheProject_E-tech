import React, { useState, useEffect } from 'react'
import {
  Image,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { clearListCart, getListCart, getUser, getAddress, setAddress, getShipping, getVoucher, getPayment } from '../session'
import tailwind from 'twrnc'
import { formatPrice } from '../utils/format'

const Pay = () => {
  const navigation = useNavigation()
  const [transport_fee, setTransport_fee] = useState(0)
  const [shipping, setShipping] = useState(null)
  const [voucher, setVoucher] = useState(null)
  const [payment, setPayment] = useState(null)
  const [note, setNote] = useState(null)
  const [address, setAddressSelected] = useState(null)
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [saleValue, setSaleValue] = useState(0)

  const payNow = () => {
    const data = {
      address: address,
      shipping_id: shipping._id,
      listIdCart: getListCart().map((item) => { return item._id }),
      voucher_id: voucher?._id,
      value: payment.id == '1' ? null : total + transport_fee - saleValue,
      payment_method: payment.id == '1' ? 0 : 1,
      note: note
    }
    navigation.navigate('MoMoPaymentScreen', { data: data })
  }


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setData(getListCart())
      setAddressSelected(getAddress())
      setPayment(getPayment())
      setShipping(getShipping())
      setTransport_fee(getShipping()?.price ?? 0)
      const voucherSelected = getVoucher()
      setVoucher(voucherSelected)
      checkTotalPrice()
    })

    return unsubscribe
  }, [navigation])


  useEffect(() => {
    if (voucher) {
      var sale = 0
      if (voucher.type == 0) {
        if (voucher.discount_type == 0) {
          sale = transport_fee > voucher.discount_value ? voucher.discount_value : transport_fee
        } else {
          sale = transport_fee * voucher.discount_value / 100
        }
      } else {
        if (voucher.discount_type == 0) {
          sale = voucher.discount_value
        } else {
          sale = (total + transport_fee) * voucher.discount_value / 100
        }
      }
      setSaleValue(sale)
    }
  }, [voucher, transport_fee])





  const checkTotalPrice = () => {
    var price = 0
    getListCart().forEach(item => {
      price += item.quantity * item.price * (1 - item.percent_discount / 100)
    })
    setTotal(price)
    if (getVoucher()) {
      if (getVoucher().condition > price) setVoucher(null)
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.itemTitle}>
          <Image
            source={require('../img/map.png')}
            style={styles.icon}
          />
          <Text style={styles.title}>Thông tin người nhận</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddressScreen', { choose: true })}>
          <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center', marginBottom: 15 }}>
            {
              address ?
                <View style={{ flex: 1 }}>
                  <Text>{address.fullname} | {address.numberphone}</Text>
                  <Text>{address.address}</Text>
                </View> :
                <Text style={{ color: 'grey', flex: 1 }}>
                  Vui lòng chọn địa chỉ người nhận
                </Text>
            }
            <Image style={styles.iconSmall} source={require('../assets/right.png')} />
          </View>
        </TouchableOpacity>

        <View style={styles.itemTitle}>
          <Image
            source={require('../img/box1.png')}
            style={styles.icon}
          />
          <Text style={styles.title}>Danh sách sản phẩm</Text>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            onPress={() => { navigation.navigate('ButtonNavigation', { screen: 'Cart' }) }}>
            <Image
              source={require('../assets/cart.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          scrollEnabled={false}
          data={data}
          style={{ marginBottom: 15 }}
          keyExtractor={(item, index) => item._id}
          renderItem={({ item }) => (
            <View style={{
              flexDirection: 'row', borderWidth: 0.5, borderColor: 'grey',
              paddingVertical: 10, marginHorizontal: 15, borderRadius: 15, elevation: 10,
              backgroundColor: 'white', marginVertical: 10,
              alignItems: 'center'
            }}>
              <View style={tailwind`px-2`}>
                <Image style={styles.imgItem} source={{ uri: item.image }} />
              </View>

              <View style={{ flex: 1 }}>
                <View >
                  <Text style={{ fontWeight: '500' }}>{item.product_name}</Text>
                  <Text >Tổng tiền: {formatPrice(item.quantity * item.price * (1 - item.percent_discount / 100))}</Text>
                  <Text >Số lượng: {item.quantity}</Text>
                </View>
              </View>
            </View>
          )}
        />

        <View style={styles.itemTitle}>
          <Image
            source={require('../img/car.png')}
            style={styles.icon}
          />
          <Text style={styles.title}>Hình thức giao hàng</Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('ShippingMethod')}>
          <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center', marginBottom: 15 }}>
            {
              shipping ?
                <View style={{ flex: 1 }}>
                  <Text>Lựa chọn: {shipping.name}</Text>
                  <Text>Giá: {formatPrice(shipping.price)}</Text>
                </View> :
                <Text style={{ color: 'grey', flex: 1 }}>
                  Vui lòng chọn hình thức giao hàng
                </Text>
            }
            <Image style={styles.iconSmall} source={require('../assets/right.png')} />
          </View>
        </TouchableOpacity>

        <View style={styles.itemTitle}>
          <Image
            source={require('../img/voucher.png')}
            style={styles.icon}
          />
          <Text style={styles.title}>Áp dụng mã giảm giá</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ApDungVoucher', { totalBill: total })} >
          <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center', marginBottom: 15 }}>
            {
              voucher ?
                <View style={{ flex: 1 }}>
                  <Text>{voucher.description}</Text>
                  <Text>Giảm: {formatPrice(saleValue)}</Text>
                </View> :
                <Text style={{ color: 'grey', flex: 1 }}>
                  Chọn mã giảm giá để nhận thêm ưu đãi
                </Text>
            }
            <Image style={styles.iconSmall} source={require('../assets/right.png')} />
          </View>
        </TouchableOpacity>
        <View style={styles.itemTitle}>
          <Image
            source={require('../img/payment_method.png')}
            style={styles.icon}
          />
          <Text style={styles.title}>Phương thức thanh toán</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('PTTT')}>
          <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center', marginBottom: 15 }}>
            {
              payment ?
                <View style={{ flex: 1 }}>
                  <Text>Lựa chọn: {payment.name}</Text>
                </View> :
                <Text style={{ color: 'grey', flex: 1 }}>
                  Chọn phương thức thanh toán
                </Text>
            }
            <Image style={styles.iconSmall} source={require('../assets/right.png')} />
          </View>
        </TouchableOpacity>
        <Text style={[styles.textTitle, { fontSize: 22, marginTop: 20 }]}>
          Chi tiết thanh toán
        </Text>
        <View style={styles.contentTotalView}>
          <View>
            <Text style={styles.textTotal}>Tổng tiền hàng:</Text>
            <Text style={styles.textTotal}>Tiền phí vận chuyển:</Text>
            <Text style={styles.textTotal}>Áp dụng mã voucher:</Text>
            <Text style={styles.textHighlight}>Tổng thanh toán:</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.textTotal}>{formatPrice(total)}</Text>
            <Text style={styles.textTotal}>{formatPrice(transport_fee)}</Text>
            <Text style={styles.textTotal}>- {formatPrice(saleValue)}</Text>
            <Text style={styles.textHighlight}>{formatPrice(total + transport_fee - saleValue)}</Text>
          </View>
        </View>

        <View style={styles.btnPayContainer}>
          <TouchableOpacity
            onPress={payNow}
            disabled={!address || !shipping || !payment}
            style={[styles.btnPay, { backgroundColor: (!address || !shipping || !payment) ? 'grey' : '#336BFA', }]}>
            <Text style={{ fontWeight: 'bold', color: 'white' }}>
              Thanh toán
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView >
  )
}
export default Pay

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white'
  },
  itemTitle: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center'
  },
  icon: {
    width: 32,
    height: 32
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginStart: 10
  },
  iconSmall: {
    width: 16,
    height: 16
  },
  imgItem: {
    width: 60,
    height: 60,
    backgroundColor: '#D5D5D5',
    justifyContent: 'center',
    borderRadius: 5,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingStart: 10
  },
  textTotal: {
    marginTop: 10,
  },
  contentTotalView: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  btnPay: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 15,
    marginBottom: 95
  },
  btnPayContainer: {
    margin: 10
  },
  textHighlight: {
    marginTop: 10,
    fontWeight: 'bold'
  },
})
