import React, { useState, useEffect, useRef } from 'react'
import { Animated, FlatList, View, Text, StyleSheet, Image, TouchableOpacity, TextComponent, Alert, Dimensions } from 'react-native'
import { getCart, deleteCart } from '../../CallApi/cartApi'
import { useNavigation } from '@react-navigation/native'
import { formatPrice } from '../../utils/format'
import LoadingWidget from '../../Component/loading'
import CartItem from './cartItem'
import { getListCart, clearListCart, setListCart } from '../../session'
import LottieView from 'lottie-react-native'

const CartScreen = () => {
  const navigation = useNavigation()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [show, setShow] = useState(false)
  const [update, setUpdate] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [allowDelete, setAllowDelete] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [clear, setClear] = useState(0)
  const translateY = useRef(new Animated.Value(0)).current


  const fetchData = async () => {
    try {
      setShow(false)
      setLoading(true)
      setData([])
      const response = await getCart()
      const resultArray = response.filter((itemA) =>
        getListCart().some((itemB) => itemB._id === itemA._id)
      )
      setListCart(resultArray)
      setData(response)
    } catch (error) {
      console.log(`Cart Screen : ${error}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (show) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start()
    } else {
      Animated.timing(translateY, {
        toValue: 500,
        duration: 500,
        useNativeDriver: false,
      }).start()
    }
  }, [show])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData()
    })

    return unsubscribe
  }, [navigation])

  useEffect(() => {
    var price = 0
    getListCart().forEach((item) => {
      price += item.price * item.quantity * (1 - item.percent_discount / 100)
    })
    setTotalPrice(price)
    setAllowDelete(getListCart().length > 0)
  }, [update, clear])

  const deleteItems = async () => {
    try {
      setDeleteLoading(true)
      const listId = getListCart().map((item) => { return item._id })
      const response = await deleteCart(listId)
      if (response > 0) {
        const newData = data.filter(item => !getListCart().includes(item))
        setData(newData)
        setShow(false)
        clearListCart()
        setClear(new Date().getTime())
      }
    } catch (error) {
      console.log('Xóa thất bại')
    } finally {
      setDeleteLoading(false)
      setAllowDelete(false)
    }
  }

  const handleDelete = () => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc muốn xóa không?',
      [{ text: 'Hủy', style: 'cancel', },
      {
        text: 'Xóa',
        onPress: () => {
          deleteItems()
        },
      },],
      { cancelable: false }
    )
  }

  const renderItem = ({ item, index }) => {
    return <CartItem item={item} index={index} setShow={setShow} setUpdate={setUpdate} clear={clear} setData={setData} data={data} />
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Giỏ hàng của bạn</Text>
        <View style={{ flex: 1 }} />
        {data.length > 0 && (
          deleteLoading ?
            <LottieView
              autoPlay
              style={{ width: 28, height: 28 }}
              source={require('../../assets/logo.json')}
            />
            :
            <TouchableOpacity
              onPress={handleDelete}
              disable={!allowDelete}>
              <Text style={{ fontSize: 18, color: allowDelete ? 'red' : 'grey' }}>Xóa</Text>
            </TouchableOpacity>
        )}
      </View>
      <View style={{
        alignItems: 'center',
        flex: 1
      }}>
        {loading ?
          <LoadingWidget />
          :
          <>

            <FlatList
              data={data}
              style={styles.listCart}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
            />

            {/* Payment Container */}
            {allowDelete &&
              <Animated.View
                style={{
                  position: 'relative',
                  width: '90%',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  borderWidth: 1,
                  borderColor: 'blue',
                  margin: 10,
                  borderRadius: 10,
                  paddingHorizontal: 40,
                  paddingVertical: 15,
                  transform: [{ translateY }],
                }}
              >
                <View style={styles.productTotal}>
                  <Text style={styles.productTotalPriceText}>Tổng cộng:</Text>
                  <Text style={[styles.productTotalPriceText, { color: 'red' }]}>{formatPrice(totalPrice)}</Text>
                </View>
                <View style={styles.confirmContainer}>
                  <TouchableOpacity style={styles.buttonPayment} onPress={() => navigation.navigate('PayScreen', {address: null, shipping: null, voucher: null})}>
                    <Text style={styles.textPayment}>Xác nhận thanh toán</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>}


          </>
        }
      </View>
    </View>
  )
}

export default CartScreen
const styles = StyleSheet.create({
  textPayment: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  buttonPayment: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  confirmContainer: {
    backgroundColor: '#336BFA',
    borderRadius: 7,
    height: 45,
  },
  productTotalPriceText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  productTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  paymentText: {
    fontWeight: 'bold',
    fontSize: 16
  },

  listCart: {
    marginBottom: 10,
    width: Dimensions.get('screen').width
  },
  header: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    alignItems: 'center',
    padding: 15,
    flexDirection: 'row',
    backgroundColor:'white'
  },
  textHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
  },

})