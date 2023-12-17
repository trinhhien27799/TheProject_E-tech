import React, { useState } from 'react';
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
import { isPassWord, isConfirm } from '../../Component/validation';
import { useNavigation } from '@react-navigation/native';
import { forgotPassword } from '../../CallApi/authenApi';
import tailwind from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import LockLoading from './lockLoading';


const Taomk = ({ route }) => {
  const navigation = useNavigation();
  const [isPasswordShow, setisPasswordShow] = useState(false);
  const [password, setPassword] = useState('');
  const [errorConfim, setErrorConfim] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [isRepasswordShow, setisRepasswordShow] = useState(false);
  const [loading, setLoading] = useState(false)

  const isValidOk = () => password.length >= 6 && confirmPass == password

  const handleCheck = async () => {

    try {
      Keyboard.dismiss()
      setLoading(true)
      const email = route.params;
      const response = await forgotPassword(email, password);
      setLoading(false)
      console.log(email,response)
      if (response.code == 200) {
        Alert.alert('Thông báo', 'Cập nhật mật khẩu thành công', [{
          text: 'Xác nhận',
          onPress: () => {
            navigation.replace('Login')
          }
        }])
      } else {
        Alert.alert('Thông báo', response.message, [{
          text: 'Xác nhận',
          onPress: () => {
            if (response.code == 404) {
              navigation.goBack()
            }
          }
        }])
      }
    } catch (error) {
      setLoading(false)
      console.error('Error:', error);
      Alert.alert('Thông báo', 'Đã xảy ra lỗi trong quá trình cập nhật mật khẩu, hãy thử lại sau giây lát', [{
        text: 'Trở lại đăng nhập',
        onPress: () => { navigation.replace('Login') }
      }])
    }
  }

  return (
    <SafeAreaView style={[tailwind`flex-1`, { backgroundColor: 'white' }]}>
      <StatusBar backgroundColor='white' />
      <TouchableOpacity
        style={[tailwind`bg-white w-10 h-10 shadow-md rounded-full`, { position: 'absolute', top: 80, left: 20, alignItems: 'center', justifyContent: 'center' }]}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons name="arrow-back" style={tailwind`self-center`} size={24} color="black" />
      </TouchableOpacity>


      <View style={styles.view}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Xác nhận thành công
        </Text>
        <Text style={{ color: 'grey' }}>
          Vui lòng Nhập mật khẩu mới của bạn:
        </Text>
        <View style={{ marginBottom: 12, marginTop: 20 }}>
          <Text style={styles.textInput}>Mật khẩu mới:</Text>
          <View style={styles.viewInput}>
            <TextInput
              placeholder="Mật khẩu"
              value={password}
              onChangeText={(text) => {
                setPassword(text.trim());
                setErrorPassword(isPassWord(text) ? '' : 'Mật khẩu lớn hơn 6 ký tự');
                setErrorConfim(isConfirm(confirmPass) ? text.trim() != confirmPass ? 'Mật khẩu không khớp' : '' : '')
              }}
              style={{ width: '100%', marginLeft: 10 }}
              secureTextEntry={!isPasswordShow}
            />
            <TouchableOpacity
              onPress={() => setisPasswordShow(!isPasswordShow)}
              style={{
                position: 'absolute',
                right: 12,
              }}

            >
              {
                isPasswordShow != true ? (
                  <Ionicons name="eye-off" size={24} color={'black'} />
                ) : (
                  <Ionicons name="eye" size={24} color={'black'} />
                )
              }
            </TouchableOpacity>
          </View>
          <Text style={{ color: 'red', margin: 10 }}>{errorPassword}</Text>
        </View>
        <View style={{ marginBottom: 12, marginTop: 10 }}>
          <Text style={styles.textInput}>Nhập lại mật khẩu:</Text>
          <View style={styles.viewInput}>
            <TextInput
              value={confirmPass}
              placeholder="Xác nhận mật khẩu"
              onChangeText={(text) => {
                setConfirmPass(text.trim());
                setErrorConfim(isConfirm(text.trim()) ? text.trim() != password ? 'Mật khẩu không khớp' : '' : 'Mật khẩu lớn hơn 6 ký tự');
              }}
              style={{ width: '100%', marginLeft: 10 }}
              secureTextEntry={!isRepasswordShow}
            />
            <TouchableOpacity
              onPress={() => setisRepasswordShow(!isRepasswordShow)}
              style={{
                position: 'absolute',
                right: 12,
              }}

            >
              {
                isRepasswordShow != true ? (
                  <Ionicons name="eye-off" size={24} color={'black'} />
                ) : (
                  <Ionicons name="eye" size={24} color={'black'} />
                )
              }
            </TouchableOpacity>
          </View>
          <Text style={{ color: 'red', margin: 10 }}>{errorConfim}</Text>
        </View>
        <TouchableOpacity
          disabled={!isValidOk()}
          onPress={handleCheck}
          style={[tailwind`w-60 p-4 rounded-lg shadow-md self-center`, { backgroundColor: isValidOk() == true ? '#336BFA' : 'grey' }]}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFFFF', alignSelf: 'center' }}>
            Cập nhật mật khẩu mới
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
    padding: 10,
    marginTop: '10%',
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    marginTop: 80
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
    marginTop: 8
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
    width: '60%',
    marginTop: 40,
  },
});

export default Taomk;
