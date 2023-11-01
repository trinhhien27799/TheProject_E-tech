import React, { useState, useEffect } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import { isValidEmail, isPassWord, isValidUsername, isConfirm } from '../../Component/validation';
import { Ionicons } from "@expo/vector-icons";
import { registerUser, insertOtp } from '../../CallApi/authenApi';
import Dialog from "react-native-dialog";
import VerifyDialog from './verifyOTP';


const SignUp = ({ navigation }) => {
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorFullname, setErrorFullname] = useState('');
  const [errorConfim, setErrorConfim] = useState('');
  const [isPasswordShow, setisPasswordShow] = useState(false);
  const [isRepasswordShow, setisRepasswordShow] = useState(false);
  const [showVerifyDialog, setShowVerifyDialog] = useState(false);
  const [remainingTime, setRemainingTime] = useState(120);
  const [confirmPass, setConfirmPass] = useState('');
  const [checkValue,setCheckValue] = useState(false);


  const isValidOk = () => !!email.trim() && !!password.trim() && !!fullname.trim() && !!confirmPass.trim() && isValidUsername(fullname) == true && isValidEmail(email) == true;

  const [isSignUpPressed, setIsSignUpPressed] = useState(false);

  useEffect(() => {
    if (isSignUpPressed) {
      const interval = setInterval(() => {
        if (remainingTime > 0) {
          setRemainingTime(remainingTime - 1);
        } else {
          clearInterval(interval);
          setCheckValue(!checkValue)
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  
  }, [remainingTime, isSignUpPressed]);
  const handleSignUp = async () => {
    try {
      if (password != confirmPass || confirmPass != password) {
        setErrorPassword('Password không khớp');
        setErrorConfim('Password không khớp');
      } else {
        setErrorPassword('');
        setErrorConfim('');
        // registerUser(username,email,password);
        if(email == ''||password == ''||fullname == ''||confirmPass == ''){
          alert("Vui lòng điền đầy đủ thông tin!!!");
        }else
        {
          const insert = await insertOtp(email,false);
          if(insert.code === 200){
            setShowVerifyDialog(true);
            setIsSignUpPressed(true);
          }else{
            alert(insert.message);
          }
          
        }

      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const handleDelete = () => {
    setShowVerifyDialog(false);
    setRemainingTime(120);
    setIsSignUpPressed(false);
  };
  return (
    <ScrollView style={styles.safeArea}>
      <View style={styles.view}>
        <View style={{ marginVertical: 22 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginVertical: 12,
              color: 'black',
              marginTop: 80,
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
                setFullname(text);
              }}
              placeholderTextColor={'black'}
              style={{ width: '100%', marginLeft: 10 }}
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
                setEmail(text);
              }}
              placeholderTextColor={'black'}
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
              onChangeText={(text) => {
                setPassword(text);
                setErrorPassword(isPassWord(text) ? '' : 'Mật khẩu lớn hơn 6 ký tự');
              }}
              placeholderTextColor={'black'}
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
              onChangeText={(text) => {
                setConfirmPass(text);
                setErrorConfim(isConfirm(text) ? '' : 'Mật khẩu lớn hơn 6 ký tự');
              }}
              placeholderTextColor={'black'}
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
          onPress={() => {
            handleSignUp()
          }}
          style={[styles.button]}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' }}>
            ĐĂNG KÝ
          </Text>
        </TouchableOpacity>
        <VerifyDialog checkValue={checkValue} setCheckValue={setCheckValue} setRemainingTime={setRemainingTime} remainingTime={remainingTime} check={showVerifyDialog} onCancle={handleDelete} email={email} fullname={fullname} password={password} navigation={navigation} />
        <View style={styles.view3}></View>
        <View style={{ justifyContent: 'center', alignContent: 'center', flexDirection: 'row', marginTop: -10 }}>
          <Text>Bạn đã có tài khoản? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login')
            }}
          >
            <Text style={{ marginLeft: 10, color: '#336BFA', fontWeight: 'bold' }}>
              Đăng nhập
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    marginTop: 40,
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
  viewContainerInput: {

  },
  button: {
    backgroundColor: '#336BFA',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
    width: '50%',
    marginTop: 50,
    
  },
});

export default SignUp;
