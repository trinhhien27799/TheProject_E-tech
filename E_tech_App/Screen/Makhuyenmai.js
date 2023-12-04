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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { vouchers } from '../Model/voucher';
import { addVoucher } from '../CallApi/voucherApi';
import { useNavigation } from '@react-navigation/native';
import { getUser } from '../session';
import tailwind from 'twrnc';
import { formatPrice, formatTime } from '../utils/format';

export default function Makhuyenmai() {
  const navigation = useNavigation();
  const voucherArray = vouchers();

  const [voucherCode, setVoucherCode] = useState('');
  const [voucherId, setVoucherID] = useState('');
  const [save, setSave] = useState('');

  const [click, isClick] = useState(false);

  const handleVoucher = async () => {
    try {
      const data = await addVoucher(voucherCode, voucherId);    
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  console.log(voucherArray);

  // const renderItemVoucher = (item) => (
  //   <View style={styles.view2}>
  //     <View
  //       style={{
  //         width: '28%',
  //         paddingTop: 10,
  //         borderColor: 'black',
  //         borderRightWidth: 1,
  //         alignContent: 'center',
  //         justifyContent: 'center',
  //       }}>
  //       <Image source={require('../img/sale.png')} style={styles.img} />
  //     </View>
  //     <View style={{ paddingTop: 10, width: '50%', marginLeft: 10 }}>
  //       <Text style={styles.title} >{item.description}</Text>
  //       <Text >Đơn tối thiểu {item.condition}.000đ</Text>
  //       <Text style={styles.title2}>HSD: {item.expiration_date}</Text>
  //     </View>
  //     <View style={{ paddingTop: 10, alignContent: 'center', justifyContent: 'center' }}>
  //       <TouchableOpacity style={styles.button2} onPress={handleVoucher}>
  //         <Text style={{ color: 'white', fontSize: 16 }}>Lưu</Text>
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // );


  return (
    <SafeAreaView style={tailwind `flex-1`}>
      <View style={tailwind `bg-white flex-row py-5`}>
        <Text style={tailwind `text-lg font-bold ml-5`}>Voucher của Shop</Text>
      </View>

      <View>
        <FlatList
          data={voucherArray}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={tailwind `bg-white mt-2 p-3 w-96 self-center border border-slate-300 rounded-lg`}>
              <View style={tailwind`flex-row`}>
                <View
                  style={{
                    width: '28%',
                    paddingVertical: 10,
                    alignContent: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image source={require('../img/sale.png')} style={styles.img} />
                </View>
                <View style={{ paddingTop: 10, width: '60%', marginLeft: 10 }}>
                  <Text style={tailwind `text-base font-bold mb-1`} >{item.description}</Text>
                  <Text >Đơn tối thiểu: {formatPrice(item.condition)}</Text>
                  <Text style={styles.title2}>HSD: {formatTime(item.expiration_date)}</Text>
                </View>
              </View>

              <View style={{ paddingVertical: 5, alignContent: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={tailwind `bg-blue-600 py-3 justify-center mt-5 rounded-md shadow-md`} onPress={() => {
                  setVoucherID(item._id);
                  setVoucherCode(item.code);
                  console.log(voucherCode + ' ' + voucherId);
                  handleVoucher();
                }}>
                  {
                    !click
                      ? <Text style={{ color: 'white', fontSize: 16, alignSelf: 'center', fontWeight: 'bold' }}>Lưu</Text>
                      : <Text style={{ color: 'white', fontSize: 16, alignSelf: 'center', fontWeight: 'bold' }}>Đã Lưu</Text>
                  }
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
    backgroundColor: '#fff'
  },
  view: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  text: {
    marginLeft: 60,
    fontSize: 18,
  },
  view2: {
    width: '90%',
    height: 150,
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
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
});
