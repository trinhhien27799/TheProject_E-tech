import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const VoucherChitiet = ({ title , noidung , time, status }) => {
  const urlImg = require('../img/sale.png');
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
          {title} Giảm giá 30%
        </Text>
      </View>
                <Image source={urlImg} style={styles.img} />
      <View style={{marginTop: 10}}>
        <Text style={styles.text}>{noidung}Voucher này bao gồm những thứ ......</Text>
                <Text style={styles.text}>{time}10/10/2023</Text>
                <Text style={styles.text}>{status}Còn hàng</Text>

      </View>
      <TouchableOpacity onPress={() => {}} style={styles.button}>
        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>
          Add to my voucher
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  button: {
    height: 60,
    backgroundColor: '#336BFA',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
    width: '60%',
    marginTop: 80,
  },
  text: {
    fontSize: 14,
    marginTop: 10
  },
  img:{
    marginTop: 30,
    width: 200,
    height: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    resizeMode:'cover'
  }
});

export default VoucherChitiet;
