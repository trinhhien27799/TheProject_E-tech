import React, { useState } from 'react';
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
import { myvouchers } from '../Model/voucher';
import { useNavigation } from '@react-navigation/native';


export default function MyVoucher() {
  const navigation = useNavigation();

  
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
  const renderItemVoucher = ({ item }) => (
    <View style={styles.view2}>
      <View
        style={{
          width: '35%',
          paddingTop: 10,
          borderColor: 'black',
          borderRightWidth: 1,
          alignContent: 'center',
          justifyContent: 'center'
        }}>
        <Image source={require('../img/sale.png')} style={styles.img} />
      </View>
      <View style={{ paddingTop: 10, marginLeft: 10 }}>
        <Text style={styles.title}>{item.description}</Text>
        <Text >Đơn tối thiểu {item.condition}.000đ</Text>
        <Text style={styles.title2}>HSD: {item.expiration_date}</Text>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
      <TouchableOpacity onPress={() => { navigation.goback() }}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.text}>Voucher của bạn</Text>
      </View>
      <View>
      <FlatList
          data={myvouchers}
          keyExtractor={item}
          renderItem={renderItemVoucher}
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
