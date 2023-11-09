import React, { useState } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  RadioButton,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DialogQR = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image source={require('../img/QR.png')} style={styles.img}/>
        <View style={{marginTop: 20}}>
          <Text style={styles.text1}>Quý khách vui lòng điền Nội dung chuyển khoản là : Tên tài khoản đang sử dụng.
          </Text>
        </View>
        <View style={styles.view3}>
          <TouchableOpacity style={styles.button2} onPress={() => { navigation.goback() }}>
            <Text style={styles.text}>Hủy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button2}>
            <Text style={styles.text}>Xác nhận Thanh toán </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30,
  },
  
  view3: {
    flexDirection: 'row',
    marginTop: 100
  },
  text: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  text1: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 20
  },
  img:{
    width: 400,
    height: 400
  },
  button2: {
    backgroundColor: '#336BFA',
    width: '40%',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 180,
  },
});
export default DialogQR;
