import React, { useEffect, useState } from 'react';
import { Image, FlatList, Text, View, StyleSheet, Dimensions, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getMyVoucher } from '../CallApi/voucherApi';
import tailwind from 'twrnc';
import LoadingWidget from '../Component/loading';
import { formatPrice, formatTime } from '../utils/format';

const MyVoucher = () => {
  const [voucher, setVoucher] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false)

  const getData = async () => {
    try {
      setLoading(true)
      const data = await getMyVoucher();
      setVoucher(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { getData() }, [])


  return (
    <View style={{ alignItems: 'center' }}>
      {loading ?
        <LoadingWidget />
        : <FlatList
          data={voucher}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => { navigation.navigate('ButtonNavigation', { screen: 'Cart' }) }}
              style={tailwind `bg-white w-96 p-3 flex-row border border-slate-300 rounded-lg mt-3`}>
              <Image source={require('../img/sale.png')} style={tailwind `w-20 h-20 mt-1.5`} />
              <View style={styles.viewText}>
                <Text style={tailwind`text-base font-bold mb-1`}>{item.description}</Text>
                <Text>Đơn tối thiểu {formatPrice(item.condition)}</Text>
                <Text style={styles.title2}>HSD: {formatTime(item.expiration_date)}</Text>
              </View>
            </TouchableOpacity>
          )}
        />}
    </View>
  );
}

export default MyVoucher;

const styles = StyleSheet.create({
  viewItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: Dimensions.get('screen').width,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    alignItems: 'center'
  },
  img: {
    width: 70,
    height: 70
  },
  viewText: {
    paddingTop: 10,
    marginLeft: 10,
    width: '70%'
  }


});
