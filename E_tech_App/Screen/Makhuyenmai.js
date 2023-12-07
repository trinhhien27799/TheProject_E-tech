import React, { useState, useEffect } from 'react'
import {
  Image,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import { getAllVoucher } from '../CallApi/voucherApi'
import { addVoucher } from '../CallApi/voucherApi'
import { useNavigation } from '@react-navigation/native'
import tailwind from 'twrnc'
import { formatPrice, formatTime } from '../utils/format'
import LoadingWidget from '../Component/loading'

export default function Makhuyenmai() {
  const navigation = useNavigation()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingAdd, setLoadingAdd] = useState(false)

  const handleVoucher = async (voucherId, voucherCode) => {
    try {
      setLoadingAdd(true)
      const response = await addVoucher(voucherCode, voucherId)
      if (response.userId) {
        const newArray = data.filter(item => item._id !== voucherId)
        setData(newArray)
      } else {
        alert('Thêm thất bại')
      }
    } catch (error) {
      console.error('Add voucher:', error)
    } finally {
      setLoadingAdd(false)
    }
  }

  const getData = async () => {
    try {
      setLoading(true)
      const response = await getAllVoucher()
      setData(response)
    } catch (error) {
      console.error('Makhuyenmai Screen:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData()
    })
  }, [navigation])



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Mã giảm giá mới
        </Text>
      </View>

      {loading ? <LoadingWidget /> :
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={[tailwind`bg-white mt-2 p-3 w-96 self-center border border-slate-300 rounded-lg`, { alignItems: 'center' }]}>
              <View style={[tailwind`flex-row`, { alignItems: 'center' }]}>
                <Image source={require('../img/sale.png')} style={styles.img} />
                <View style={{ paddingTop: 10, width: '60%', marginLeft: 10 }}>
                  <Text style={tailwind`text-base font-bold mb-1`} >{item.description}</Text>
                  <Text >Đơn tối thiểu: {formatPrice(item.condition)}</Text>
                  <Text style={styles.title}>HSD: {formatTime(item.expiration_date)}</Text>
                </View>
              </View>


              {loadingAdd ?
                <View style={{ alignItems: 'center', paddingTop: 5 }}>
                  <LoadingWidget />
                </View> :
                <TouchableOpacity style={[tailwind`bg-blue-600 py-1 justify-center mt-5 rounded-md shadow-md`, { width: '90%' }]} onPress={() => {
                  handleVoucher(item._id, item.code)
                }}>
                  <Text style={{ color: 'white', fontSize: 16, alignSelf: 'center', fontWeight: 'bold' }}>Lưu</Text>

                </TouchableOpacity>}
            </View>
          )}
        />}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    alignItems: 'center',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  text: {
    marginLeft: 60,
    fontSize: 18,
  },
  img: {
    height: 80,
    width: 90,
    marginLeft: 6,
    marginBottom: 8,
  },
  title: {
    fontSize: 13,
    marginTop: 10,
  },
})
