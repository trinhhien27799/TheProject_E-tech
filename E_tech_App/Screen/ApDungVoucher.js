import React, { useEffect, useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { getMyVoucher } from '../CallApi/voucherApi';
import { setHandleVoucher } from '../Component/HandleObj/VoucherHandle';
import tailwind from 'twrnc';
import { formatPrice, formatTime } from '../utils/format';

export default function Makhuyenmai() {
  const [voucher, setVoucher] = useState([]);
  const navigation = useNavigation();

  const myvouchers = async () => {
    try {
      const data = await getMyVoucher();
      setVoucher(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {myvouchers()}, [])

  const setNewVoucher = (voucher) => {
    navigation.navigate('PayScreen', {address: null, shipping: null, voucher: voucher});
  }

  return (
    <SafeAreaView style={tailwind `flex-1`}>
      <View style={tailwind `bg-white flex-row py-3`}>
        <TouchableOpacity 
          onPress={() => { navigation.goBack() }}
          style={tailwind `bg-white p-1.5 rounded-full shadow-md ml-3`}
        >
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={tailwind `text-base mt-2 font-bold ml-3`}>Áp dụng Voucher của bạn</Text>
      </View>
      <View>
        <FlatList
          data={voucher}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={tailwind `bg-white mt-2 p-3 w-96 self-center border border-slate-300 rounded-lg`}>
              <View style={tailwind`flex-row`}>
                <View
                  style={{
                    width: '28%',
                    paddingTop: 10,
                    alignContent: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image source={require('../img/sale.png')} style={styles.img} />
                </View>
                <View style={{ paddingTop: 10, width: '65%', marginLeft: 10 }}>
                  <Text style={tailwind `text-base font-bold`} >{item.description}</Text>
                  <Text >Đơn tối thiểu {formatPrice(item.condition)}</Text>
                  <Text style={styles.title2}>HSD: {formatTime(item.expiration_date)}</Text>
                </View>
              </View>

              <View style={{ paddingTop: 10, alignContent: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={tailwind `bg-blue-600 py-3 justify-center mt-5 rounded-md shadow-md`} onPress={() => setNewVoucher(item)}>
                  <Text style={{ color: 'white', fontSize: 16, alignSelf: 'center', fontWeight: 'bold' }}>Sử dụng</Text>
                </TouchableOpacity>
              </View>
            </View>        
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30,
  },
  view: {
    flexDirection: 'row',
    height: 30,
  },
  text: {
    marginLeft: 60,
    fontSize: 18,
  },
  view2: {
    width: '90%',
    height: 120,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 20,
  },
  img: {
    height: 80,
    width: 90,
    marginLeft: 6,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
  },
  title2: {
    fontSize: 13,
    marginTop: 10,
  },
  button2: {
    backgroundColor: '#336BFA',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
});
