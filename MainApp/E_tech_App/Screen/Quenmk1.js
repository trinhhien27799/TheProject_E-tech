import React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Quenmk1 = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.view1}>
            <Ionicons name="arrow-back" size={24} color="black" />
            <Text style={styles.text}>Quên mật khẩu</Text>
          </View>
      <View style={styles.view}>
        <Text style={{fontSize: 18,fontWeight: 'bold'}}>Nhập địa chỉ Email hoặc Số điện thoại của bạn để tiếp tục
        </Text>
        <View style={{ marginBottom: 12 , marginTop: 30}}>
          <View style={styles.viewInput}>
            <TextInput
              placeholder="Email / Số điện thoại"
              placeholderTextColor={'black'}
              style={{ width: '100%' , fontSize: 16}}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' }}>
            TIẾP TỤC
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    marginTop: 20
  },
  view: {
    flex: 1,
    padding: 20,
    justifyContent:'center',
  },
  view1:{
      flexDirection: 'row',
      height: 30,
  },
  viewInput: {
    width: '100%',
    height: 60,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 22,
  },
  text: {
      marginLeft: 80,
      fontSize: 18,
      fontWeight: 'bold',
    },
  button: {
    height: 50,
    backgroundColor: '#336BFA',
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
    width: '48%',
    marginTop: 20,
  },
});

export default Quenmk1;
