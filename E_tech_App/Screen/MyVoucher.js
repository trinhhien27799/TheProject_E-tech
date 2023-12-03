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
import tailwind from 'twrnc';


const MyVoucher = () => {
  const [voucher, setVoucher] = useState([]);
  const navigation = useNavigation();

  const myvouchers = async () => {
    try {
      const data = await getMyVoucher();
      setVoucher(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {myvouchers()}, [])

  // const data = [
  //   {
  //     id: 1,
  //     description: 'Giảm giá 20% phí ship',
  //     release_date: '9/11/2023',
  //     condition: 100,
  //     expiration_date: '30/12/2023',
  //     type: 0,
  //     discount_type: 1,
  //     discount_value: 20,
  //     used: false,
  //   },
  //   {
  //     id: 2,
  //     description: 'Giảm giá 20% phí ship',
  //     release_date: '9/11/2023',
  //     condition: 100,
  //     expiration_date: '30/12/2023',
  //     type: 0,
  //     discount_type: 1,
  //     discount_value: 20,
  //     used: false,
  //   },
  //   {
  //     id: 3,
  //     description: 'Giảm giá 20% phí ship',
  //     release_date: '9/11/2023',
  //     expiration_date: '30/12/2023',
  //     condition: 100,
  //     type: 0,
  //     discount_type: 1,
  //     discount_value: 20,
  //     used: false,
  //   },
  //   {
  //     id: 4,
  //     description: 'Giảm giá 20% phí ship',
  //     release_date: '9/11/2023',
  //     expiration_date: '30/12/2023',
  //     condition: 100,
  //     type: 0,
  //     discount_type: 1,
  //     discount_value: 20,
  //     used: false,
  //   },
  //   {
  //     id: 5,
  //     description: 'Giảm giá 20% phí ship',
  //     release_date: '9/11/2023',
  //     expiration_date: '30/12/2023',
  //     condition: 100,
  //     type: 0,
  //     discount_type: 1,
  //     discount_value: 20,
  //     used: false,
  //   },
  // ];

  return (
    <SafeAreaView style={tailwind `flex-1`}>
      <View style={tailwind `bg-white flex-row py-3`}>
        <TouchableOpacity 
          onPress={() => { navigation.goBack() }}
          style={tailwind `bg-white p-1.5 rounded-full shadow-md ml-3`}
        >
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={tailwind `text-base mt-2 font-bold ml-3`}>Voucher của bạn</Text>
      </View>
      <View>
        <FlatList
          data={voucher}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={tailwind `bg-white flex-row mt-2 p-3 w-96 self-center border border-slate-300 rounded-lg`}>
              <View
                style={{
                  width: '35%',
                  paddingTop: 10,
                  alignContent: 'center',
                  justifyContent: 'center'
                }}>
                <Image source={require('../img/sale.png')} style={styles.img} />
              </View>
              <View style={{ paddingTop: 10, marginLeft: 10, width: '60%' }}>
                <Text style={tailwind `text-base font-bold mb-1`}>{item.description}</Text>
                <Text >Đơn tối thiểu {item.condition}.000đ</Text>
                <Text style={styles.title2}>HSD: {item.expiration_date}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

export default MyVoucher;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  view: {
    flexDirection: 'row',
    height: 30,
  },
  text: {
    marginLeft: 90,
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
    width: 100,
    marginBottom: 10,
    marginLeft: 10
  },
  title: {
    fontSize: 16,
  },
  title2: {
    fontSize: 13,
    marginTop: 10,
  },

});
