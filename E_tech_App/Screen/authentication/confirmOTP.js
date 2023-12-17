import React, { useState, useRef, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View, Alert, Keyboard, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { insertOtp, verifyOTP } from '../../CallApi/authenApi';
import tailwind from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import { getCountDownSession, setCounDowntSession } from '../../session';
import LockLoading from './lockLoading';
const ConfirmOTP = () => {
  const route = useRoute()
  const email = route.params.email;
  const navigation = useNavigation();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const firtInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourInput = useRef();
  const fiveInput = useRef();
  const sixInput = useRef();
  const [countDown, setCounDownt] = useState(getCountDownSession());

  const [loading, setLoading] = useState(false)

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };



  const isValidOk = () => !!otp.join().trim();
  const handleCheck = async () => {
    try {
      Keyboard.dismiss()
      setLoading(true)
      const otpString = otp.join("");
      const verificationResult = await verifyOTP(email, otpString);
      setLoading(false)
      if (verificationResult.code == 200) {
        navigation.navigate('Taomk', email)
      } else {
        Alert.alert('Thông báo', verificationResult.message);
      }
    } catch (error) {
      setLoading(false)
      Alert.alert('Thông báo', 'Đã xảy ra lỗi trong quá trình xác minh otp');
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
      <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 10 }}>
          Xác thực email
        </Text>
        <Text style={{ color: 'grey' }}>Nhập mã xác minh gồm 6 chữ số gửi tới địa chỉ email của bạn.</Text>
        <View style={{ marginTop: 30 }}>
          <BoxVerity
            firtInput={firtInput}
            secondInput={secondInput}
            thirdInput={thirdInput}
            fourInput={fourInput}
            fiveInput={fiveInput}
            sixInput={sixInput}
            otp={otp}
            onOtpChange={handleOtpChange}
          />
        </View>
        <View style={{ justifyContent: 'center', marginBottom: '5%', flexDirection: 'row' }}>
          <TouchableOpacity
            disabled={countDown > 0}
            onPress={() => {
              setCounDownt(30)
              insertOtp(email, true);
            }}
          >
            <Text style={{ color: countDown == 0 ? 'black' : '#CED3D0' }}>Gửi lại mã xác nhận {countDown > 0 ? `(${countDown} giây)` : ''}</Text>
          </TouchableOpacity>

        </View>
        <TouchableOpacity
          disabled={!isValidOk()}
          onPress={handleCheck}
          style={tailwind`bg-blue-600 w-40 p-4 rounded-lg shadow-md self-center`}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFFFF', alignSelf: 'center' }}>
            TIẾP TỤC
          </Text>
        </TouchableOpacity>
      </View>

      {loading && <LockLoading />}
    </SafeAreaView>
  );
};
const BoxVerity = ({ firtInput, secondInput, thirdInput, fourInput, fiveInput, sixInput, onOtpChange }) => {
  return (
    <View style={styles.boxContainer}>
      <View style={styles.otpBox}>
        <TextInput
          style={styles.otpText}
          keyboardType="number-pad"
          maxLength={1}
          onChangeText={
            (text) => {
              text && secondInput.current.focus();
              onOtpChange(0, text);
            }
          }
          ref={firtInput}

        />
      </View>
      <View style={styles.otpBox}>
        <TextInput
          style={styles.otpText}
          keyboardType="number-pad"
          maxLength={1}
          ref={secondInput}
          onChangeText={(text) => {
            text.trim().length > 0 ? thirdInput.current.focus() : firtInput.current.focus()
            onOtpChange(1, text);
          }}
        />
      </View>
      <View style={styles.otpBox}>
        <TextInput
          style={styles.otpText}
          keyboardType="number-pad"
          maxLength={1}
          ref={thirdInput}
          onChangeText={(text) => {
            text.trim().length > 0 ? fourInput.current.focus() : secondInput.current.focus()
            onOtpChange(2, text);
          }}
        />
      </View>
      <View style={styles.otpBox}>
        <TextInput
          style={styles.otpText}
          keyboardType="number-pad"
          maxLength={1}
          ref={fourInput}
          onChangeText={(text) => {
            text.trim().length > 0 ? fiveInput.current.focus() : thirdInput.current.focus()
            onOtpChange(3, text);
          }}

        />
      </View>
      <View style={styles.otpBox}>
        <TextInput
          style={styles.otpText}
          keyboardType="number-pad"
          maxLength={1}
          ref={fiveInput}
          onChangeText={(text) => {
            text.trim().length > 0 ? sixInput.current.focus() : fourInput.current.focus()
            onOtpChange(4, text);
          }}
        />
      </View>
      <View style={styles.otpBox}>
        <TextInput
          style={styles.otpText}
          keyboardType="number-pad"
          maxLength={1}
          ref={sixInput}
          onChangeText={(text) => {
            text.trim().length == 0 && fiveInput.current.focus()
            onOtpChange(5, text);
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
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
  boxContainer: {
    marginBottom: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row'
  },
  otpBox: {
    borderRadius: 5,
    height: 60,
    width: 50,
    margin: 10,
    borderColor: 'black',
    borderWidth: 0.5
  },
  otpText: {
    fontSize: 25,
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10
  }
});

export default ConfirmOTP;
