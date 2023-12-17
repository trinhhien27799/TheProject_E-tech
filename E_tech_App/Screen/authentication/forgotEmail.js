import React, { useEffect, useState } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { isValidEmail } from '../../Component/validation';
import { useNavigation, useRoute } from '@react-navigation/native';
import { insertOtp } from '../../CallApi/authenApi';
import tailwind from 'twrnc';
import LockLoading from './lockLoading';
import {  getCountDownSession, setCounDowntSession } from '../../session';

const ForgotEmail = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  const isValidOk = () => !!email.trim() && isValidEmail(email);
  const [loading, setLoading] = useState(false)
  const [countDown, setCounDownt] = useState(0)

  const handleCheck = async () => {
    try {
      Keyboard.dismiss()
      setLoading(true)
      const instert = await insertOtp(email, true);
      setLoading(false)
      if (instert.code == 200) {
        setCounDowntSession(30)
        navigation.navigate('ConfirmOTP', { email: email });
      } else {
        Alert.alert('Thông báo', instert.message)
      }
    } catch (error) {
      setLoading(false)
      console.error('Error:', error);
      Alert.alert('Thông báo', 'Đã xảy ra lỗi hãy thử lại sau')
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCounDownt(getCountDownSession())
    })

    return unsubscribe
  }, [navigation])

  useEffect(() => {
    if (countDown > 0) {
      setTimeout(() => {
        const time = countDown
        setCounDownt(time - 1)
        setCounDowntSession(time - 1)
      }, 1000)
    }
  }, [countDown])


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.view1}>
        <TouchableOpacity
          style={[tailwind`bg-white w-10 h-10 shadow-md rounded-full`, { position: 'absolute', top: 50, left: 20, alignItems: 'center', justifyContent: 'center' }]}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" style={tailwind`self-center`} size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.view}>
        <View style={{ marginLeft: 5 }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 5 }}>Email xác nhận</Text>
          <Text>Nhập địa chỉ Email để xác minh</Text>
        </View>
        <View style={{ marginBottom: 12, marginTop: 30 }}>
          <Text style={{ margin: 10, fontSize: 20 }}>Email</Text>
          <View style={styles.viewInput}>
            <TextInput
              placeholder="Nhập email hoặc số điện thoại"
              value={email}
              onChangeText={(text) => {
                setErrorEmail(text.trim().length == 0 ? 'Email không được để trống' : isValidEmail(text) ? '' : 'Email không hợp lệ');
                setEmail(text.trim());
              }}
              style={{ width: '100%', fontSize: 16 }}
            />
          </View>
          <Text style={{ color: 'red', margin: 10 }}>{errorEmail}</Text>
        </View>
        <TouchableOpacity
          disabled={!isValidOk() || countDown > 0}
          onPress={handleCheck}
          style={[styles.button, { backgroundColor: (isValidOk() == true && countDown == 0) ? '#336BFA' : 'grey' }]}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' }}>
            {countDown > 0 ? `Tiếp tục sau ${countDown} giây` : 'Gửi mã xác nhận'}
          </Text>
        </TouchableOpacity>
      </View>
      {loading && <LockLoading />}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  view: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
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

export default ForgotEmail;
