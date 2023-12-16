import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image, StatusBar,
  ScrollView,
  Alert,
  Keyboard,
} from 'react-native';
import { isValidEmail, isPassWord, isValidUsername, isConfirm } from '../../Component/validation';
import { Ionicons } from "@expo/vector-icons";
import { insertOtp, registerUser } from '../../CallApi/authenApi';
import VerifyDialog from './verifyOTP';
import tailwind from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import LockLoading from './lockLoading';

const SignUp = () => {
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorFullname, setErrorFullname] = useState('');
  const [errorConfim, setErrorConfim] = useState('');
  const [isPasswordShow, setisPasswordShow] = useState(false);
  const [isRepasswordShow, setisRepasswordShow] = useState(false);
  const [confirmPass, setConfirmPass] = useState('');
  const navigation = useNavigation()

  const isValidOk = () => !!email.trim() && !!password.trim() && !!fullname.trim() && !!confirmPass.trim() && isValidUsername(fullname) == true && isValidEmail(email) == true;
  const [countDown, setCountDown] = useState(0)
  const [visible, setVisible] = useState(false)
  const [status, setSatus] = useState(false)
  const [loading, setLoading] = useState(false)


  const sendOTP = async () => {
    try {
      Keyboard.dismiss()
      setLoading(true)
      setCountDown(30)
      const response = await insertOtp(email, false)
      setLoading(false)
      if (response.code == 200) {
        setVisible(true)
      } else {
        Alert.alert('Thông báo', 'Đã xảy ra lỗi hãy thử lại sau')
      }
    } catch (error) {
      console.log('sendOTP ', error)
      setLoading(false)
      Alert.alert('Thông báo', 'Đã xảy ra lỗi hãy thử lại sau')
    }
  }


  const register = async () => {
    try {
      const response = await registerUser(fullname, email, password)
      setSatus(false)
      setLoading(false)
      if (response.code == 200) {
        Alert.alert('Thông báo', 'Tạo tài khoản thành công', [{
          text: 'Ở lại',
          style: 'cancel'
        }, {
          text: 'Đăng nhập ngay',
          onPress: () => {
            if (navigation.canGoBack()) {
              navigation.goBack()
            } else {
              navigation.navigate('Login')
            }
          }
        }])
      } else {
        Alert.alert('Thông báo', 'Đã xảy ra lỗi trong quá trinh đăng ký')
      }
    } catch (error) {
      console.log('register', error)
      Alert.alert('Thông báo', 'Đã xảy ra lỗi trong quá trinh đăng ký')
    } finally {
      setFullname('')
      setEmail('')
      setPassword('')
      setConfirmPass('')
      setCountDown(0)
    }
  }


  useEffect(() => {
    if (status) register()
  }, [status])

  useEffect(() => {
    if (countDown > 0) {
      setTimeout(() => {
        var time = countDown
        setCountDown(time - 1)
      }, 1000)
    }
  }, [countDown])



  const convertFullname = (text) => {
    const name = String(text)
    if (name.trim().length == 0) {
      setFullname('')
      return
    }
    var lowerCaseName = name.replaceAll('  ', ' ').toLowerCase();
    var words = lowerCaseName.split(' ');
    for (var i = 0; i < words.length; i++) {
      const fisrt = words[i].charAt(0).toUpperCase()
      var last = words[i].slice(1);
      if (last[0] && last[0].toUpperCase() === fisrt) last = last.slice(1);
      words[i] = fisrt + last
    }
    var capitalizedFullName = words.join(' ');

    setFullname(capitalizedFullName)
  }

  const removeSpace = (index) => {
    switch (String(index)) {
      case '0':
        setFullname(String(fullname).trim())
        break
      case '1':
        setEmail(String(email).trim())
        break
      case '2':
        setPassword(String(password).trim())
        break
      case '3':
        setConfirmPass(String(confirmPass).trim())
        break
      default: break
    }

  }
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.safeArea}>
        <View style={styles.view}>
          <StatusBar barStyle="light-content" backgroundColor="white" />
          <TouchableOpacity
            style={tailwind`bg-white w-10 h-10 justify-center shadow-md rounded-full mt-5`}
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate('Login')
              }
            }}
          >
            <Ionicons name="arrow-back" style={tailwind`self-center`} size={20} color="black" />
          </TouchableOpacity>

          <View style={{ marginVertical: 22 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                marginVertical: 12,
                color: 'black',
              }}>
              Đăng ký
            </Text>
            <Text style={{ color: 'grey' }}>
              Đăng ký tài khoản để bắt đầu
            </Text>
          </View>

          <View>
            <Text style={{ marginBottom: 5, fontWeight: 'bold', fontSize: 15 }}>Họ và tên</Text>
            <View style={styles.viewInput}>
              <Ionicons name='person-outline' size={15} />
              <TextInput
                placeholder="Họ và tên"
                onChangeText={(text) => {
                  setErrorFullname(isValidUsername(text) ? '' : 'Full name không đúng định dạng');
                  convertFullname(text)
                }}
                onEndEditing={() => {
                  removeSpace(0)
                }}
                value={fullname}
                style={{ width: '100%', marginLeft: 10, marginStart: 10 }}
              />
            </View>
            <Text style={{ color: 'red', margin: 10 }}>{errorFullname}</Text>
          </View>

          <View>
            <Text style={{ marginBottom: 5, fontWeight: 'bold', fontSize: 15 }}>Email hoặc số điện thoại</Text>
            <View style={styles.viewInput}>
              <Image source={require('../../img/mail.png')} style={{ height: 20, width: 20 }} />
              <TextInput
                placeholder="Email hoặc số điện thoại "
                onChangeText={(text) => {
                  setErrorEmail(isValidEmail(text) ? '' : 'Email hoặc số điện thoại không hợp lệ');
                  setEmail(String(text).replaceAll(' ', ''));
                }}
                value={email}
                onEndEditing={() => {
                  removeSpace(1)
                }}
                style={{ width: '100%', marginLeft: 10 }}
              />
            </View>
            <Text style={{ color: 'red', margin: 10 }}>{errorEmail}</Text>
          </View>

          <View>
            <Text style={{ marginBottom: 5, fontWeight: 'bold', fontSize: 15 }}>Mật khẩu</Text>
            <View style={styles.viewInput}>
              <Image source={require('../../img/password.png')} style={{ height: 20, width: 20 }} />
              <TextInput
                placeholder="Mật khẩu"
                value={password}
                onChangeText={(text) => {
                  setPassword(String(text).replaceAll(' ', ''));
                  setErrorPassword(isPassWord(text) ? '' : 'Mật khẩu lớn hơn 6 ký tự');
                  setErrorConfim(String(text).trim() === String(confirmPass).trim() ? '' : 'Mật khẩu không khớp')
                }}
                onEndEditing={() => {
                  removeSpace(2)
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

          <View>
            <Text style={{ marginBottom: 5, fontWeight: 'bold', fontSize: 15 }}>Xác nhận mật khẩu</Text>
            <View style={styles.viewInput}>
              <Image source={require('../../img/password.png')} style={{ height: 20, width: 20 }} />
              <TextInput
                placeholder="Xác nhận mật khẩu"
                value={confirmPass}
                onChangeText={(text) => {
                  setConfirmPass(String(text).replaceAll(' ', ''));
                  setErrorConfim(isConfirm(text) ? (String(password).trim() === String(text).trim()) ? '' : 'Mật khẩu không khớp' : 'Mật khẩu lớn hơn 6 ký tự');
                }}
                onEndEditing={() => {
                  removeSpace(3)
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
            onPress={sendOTP}
            style={[styles.button, { backgroundColor: isValidOk() == true ? '#336BFA' : 'grey' }]}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' }}>
              ĐĂNG KÝ
            </Text>
          </TouchableOpacity>

          <View style={styles.view3}></View>
          <View style={{ justifyContent: 'center', alignContent: 'center', flexDirection: 'row', marginTop: 10 }}>

            <Text>Bạn đã có tài khoản? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login')
              }}
            >
              <Text style={{ marginLeft: 2, color: '#336BFA', fontWeight: 'bold' }}>
                Đăng nhập
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <VerifyDialog email={email} countDown={countDown} setVisble={setVisible} visible={visible} setSatus={setSatus} sendOTP={sendOTP} setLoading={setLoading} />
      {loading && <LockLoading />}
    </View>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  view: {
    flex: 1,
    marginHorizontal: 22,

  },
  view3: {
    height: 2,
    width: '90%',
    backgroundColor: '#336BFA',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '5%',
  },
  viewInput: {
    width: '100%',
    height: 55,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    paddingLeft: 22,
    flexDirection: 'row'
  },
  button: {
    backgroundColor: '#336BFA',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
    width: '50%',
    marginTop: '5%',

  },
});

export default SignUp;
