import React, { useState } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { isPassWord, isConfirm } from '../../Component/validation';
import { useNavigation } from '@react-navigation/native';
import { forgotPassword } from '../../CallApi/authenApi';
import tailwind from 'twrnc';
import { ScrollView } from 'react-native';


const Taomk = ({ route }) => {
  const navigation = useNavigation();
  const [isPasswordShow, setisPasswordShow] = useState(false);
  const [password, setPassword] = useState('');
  const [errorConfim, setErrorConfim] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [isRepasswordShow, setisRepasswordShow] = useState(false);


  const isValidOk = () => !!password.trim() && !!confirmPass.trim() && password.length >= 6 && confirmPass.length >= 6;

  const handleCheck = async () => {
    const email = route.params;
    try {
      if (password != confirmPass || confirmPass != password) {
        setErrorPassword('Password không khớp');
        setErrorConfim('Password không khớp');
      } else {
        setErrorPassword('');
        setErrorConfim('');
        forgotPassword(email, password, navigation);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <SafeAreaView style={tailwind`flex-1 justify-center`}>
      <View style={styles.view1}>
        <TouchableOpacity
          style={tailwind`bg-white w-10 h-10 justify-center shadow-md rounded-full m-5`}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" style={tailwind`self-center`} size={20} color="black" />
        </TouchableOpacity>

        <Text style={tailwind`text-lg font-bold mt-6`}>Tạo mật khẩu mới</Text>
      </View>

      <ScrollView>
        <View style={styles.view}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Xác nhận thành công
          </Text>
          <Text style={{ color: 'grey' }}>
            Vui lòng Nhập mật khẩu mới của bạn:
          </Text>
          <View style={{ marginBottom: 12, marginTop: 20 }}>
            <Text style={styles.textInput}>Password:</Text>
            <View style={styles.viewInput}>
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
          <View style={{ marginBottom: 12, marginTop: 10 }}>
            <Text style={styles.textInput}>Confirm Password:</Text>
            <View style={styles.viewInput}>
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
            disabled={!isValidOk()}
            onPress={handleCheck}
            style={[tailwind `w-40 p-4 rounded-lg shadow-md self-center`, { backgroundColor: isValidOk() == true ? '#336BFA' : 'grey' }]}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFFFF', alignSelf: 'center' }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
  },
  view1: {
    flexDirection: 'row',
    backgroundColor: 'white'
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
