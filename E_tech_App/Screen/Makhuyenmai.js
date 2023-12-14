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
import ItemVoucher from './ItemVoucher'

export default function Makhuyenmai() {
  const navigation = useNavigation()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

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

    return unsubscribe;
  }, [navigation])


  const renderItem = ({ item, index }) => {
    return (
      <ItemVoucher item={item} index={index} setData={setData} data={data} />
    )
  }


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
          renderItem={renderItem}
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
  title: {
    fontSize: 13,
    marginTop: 10,
  },
})