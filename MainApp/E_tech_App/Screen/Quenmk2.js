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

const Quenmk2 = (navigation) => {

  const [otp, setOtp] = useState('');
  const [errorOtp, setErrorOtp] = useState('');

  const isValidOk = () => !!otp.trim();
  const handleCheck = async () => {
    try {
      navigation.navigate('Taomk')
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.view1}>
        <Ionicons name="arrow-back" size={24} color="black" onPress={() => {
          navigation.navigate('Quenmk1')
        }} />
        <Text style={styles.text}>Quên mật khẩu</Text>
      </View>
      <View style={styles.view}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          Chúng tôi vừa gửi mã xác nhận đến địa chỉ Email của bạn.
        </Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          Nhập mã xác nhận :
        </Text>
        <View style={{ marginBottom: 12, marginTop: 30 }}>
          <View style={styles.viewInput}>
            <TextInput
              placeholder="Mã xác nhận"
              onChangeText={(text) => {
                setErrorOtp( 'Mã xác nhận không hợp lệ');
                setOtp(text);
              }}
              placeholderTextColor={'black'}
              style={{ width: '100%', fontSize: 16 }}
            />
          </View>
          <Text style={{ color: 'red', margin: 10 }}>{errorOtp}</Text>
        </View>
        <TouchableOpacity disabled={!isValidOk()}
          onPress={handleCheck}
          style={[styles.button, { backgroundColor: isValidOk() == true ? '#336BFA' : 'grey' }]}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' }}>
            TIẾP TỤC
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 80,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 15,
                color: '#336BFA',
                marginRight: 8,
              }}>
              Gửi lại mã
            </Text>
          </TouchableOpacity>
          <View
            style={{
              height: 3,
              width: 8,
              backgroundColor: '#0000FF',
              marginTop: 10,
            }}></View>
          <TouchableOpacity onPress={() => {
          navigation.navigate('Login')
        }}>
            <Text
              style={{
                fontSize: 15,
                color: 'red',
                marginLeft: 8,
              }}>
              Hủy bỏ
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    marginTop: 20,
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  view1: {
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
    justifyContent: 'center',
    borderRadius: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
    width: '48%',
    marginTop: 20,
  },
});

export default Quenmk2;
